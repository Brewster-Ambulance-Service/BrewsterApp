// src/components/MapWidget.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DIVISIONS_GEOJSON_URL = "/maps/geo/division-map2.geojson";
const MARKERS_GEOJSON_URL   = "/maps/geo/facilities.geojson";

// ---------- helpers ----------
function getMarkersBaseDir() {
  const abs = new URL(MARKERS_GEOJSON_URL, window.location.origin).toString();
  // strip filename → leave /maps/geo/
  return abs.replace(/[^/]+$/, "");
}

function normalizeIconName(val) {
  if (!val) return "icon-1.png";
  const s = String(val).trim();
  if (/^https?:\/\//i.test(s) || s.startsWith("/")) return s;     // absolute URL or site-absolute path
  if (!/\.(png|webp|jpg|jpeg|svg)$/i.test(s)) return `${s}.png`;   // add .png if missing
  return s;
}

// Build candidate absolute URLs for an icon string.
// 1) If the icon in GeoJSON is relative (e.g. "images/icon-1.png"), resolve against the markers file dir (/maps/geo/)
// 2) Fallbacks: /maps/images/, /map/images/
function buildIconCandidates(iconProp) {
  const clean = normalizeIconName(iconProp);
  const origin = window.location.origin;
  const candidates = [];

  if (/^https?:\/\//i.test(clean)) {
    candidates.push(clean);
  } else if (clean.startsWith("/")) {
    candidates.push(new URL(clean, origin).toString());
  } else {
    // relative to the markers file directory (MOST IMPORTANT for your case)
    const baseDir = getMarkersBaseDir(); // → http://.../maps/geo/
    candidates.push(new URL(clean, baseDir).toString()); // e.g. http://.../maps/geo/images/icon-1.png

    // fallbacks if your icons live elsewhere
    candidates.push(new URL(`/maps/images/${clean.replace(/^images\//, "")}`, origin).toString());
    candidates.push(new URL(`/map/images/${clean.replace(/^images\//, "")}`,  origin).toString());
  }
  return candidates;
}

function preloadImageSequential(urls) {
  return new Promise((resolve, reject) => {
    const next = (i) => {
      if (i >= urls.length) return reject(new Error("All icon candidates failed"));
      const url = urls[i];
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => {
        console.warn("[Icon] failed:", url);
        next(i + 1);
      };
      img.src = url;
    };
    next(0);
  });
}

function FitToAll({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points?.length) return;
    const b = L.latLngBounds(points.map(p => [p.lat, p.lng]));
    if (!b.isValid()) return;
    requestAnimationFrame(() => {
      map.invalidateSize();
      map.fitBounds(b, { padding: [40, 40] });
    });
  }, [map, points]);
  return null;
}

// ---------- divisions (filled + hover; under markers) ----------
function DivisionsLayer({ setDebug }) {
  const map = useMap();
  useEffect(() => {
    let layer;
    (async () => {
      try {
        const r = await fetch(new URL(DIVISIONS_GEOJSON_URL, window.location.origin).toString(), { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const geo = await r.json();
        if (geo?.type !== "FeatureCollection" || !Array.isArray(geo.features)) {
          throw new Error("Not a GeoJSON FeatureCollection");
        }

        const baseStyle = (feature) => {
          const stroke      = feature?.properties?.stroke || "#4a5568";
          const weight      = Number(feature?.properties?.["stroke-width"]) || 1.5;
          const opacity     = Number(feature?.properties?.["stroke-opacity"] ?? 0.7);
          const fillColor   = feature?.properties?.fill || stroke;
          const fillOpacity = Number(feature?.properties?.["fill-opacity"] ?? 0.15);
          return { color: stroke, weight, opacity, fill: true, fillColor, fillOpacity };
        };

        layer = L.geoJSON(geo, {
          pane: "overlayPane",
          style: baseStyle,
          onEachFeature: (feature, lyr) => {
            const name =
              feature?.properties?.NAME ??
              feature?.properties?.Name ??
              feature?.properties?.name ??
              feature?.properties?.TOWN ?? "Division";
            lyr.bindTooltip(name, { sticky: true });
            lyr.on("mouseover", () => {
              const s = baseStyle(feature);
              lyr.setStyle({ weight: s.weight + 1, fillOpacity: Math.min((s.fillOpacity ?? 0.15) + 0.15, 0.45) });
              lyr.bringToFront();
            });
            lyr.on("mouseout", () => lyr.setStyle(baseStyle(feature)));
          },
        }).addTo(map);

        setDebug(d => ({ ...d, divisions: geo.features.length, divisionsError: null }));
      } catch (e) {
        console.error("[Divisions] load error:", e);
        setDebug(d => ({ ...d, divisions: 0, divisionsError: String(e) }));
      }
    })();
    return () => { if (layer) map.removeLayer(layer); };
  }, [map, setDebug]);
  return null;
}

// ---------- facilities (icons resolved relative to GeoJSON dir; markers on top) ----------
function FacilityLayer({ setDebug, onPoints }) {
  const map = useMap();
  useEffect(() => {
    let group;
    (async () => {
      try {
        const r = await fetch(new URL(MARKERS_GEOJSON_URL, window.location.origin).toString(), { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (data?.type !== "FeatureCollection" || !Array.isArray(data.features)) {
          throw new Error("Markers file is not a GeoJSON FeatureCollection");
        }

        group = L.layerGroup([], { pane: "markerPane" }).addTo(map);
        const collected = [];
        let missed = 0;

        for (const f of data.features) {
          if (f?.geometry?.type !== "Point") continue;
          const [lng, lat] = (f.geometry.coordinates || []).map(Number);
          if (!isFinite(lat) || !isFinite(lng)) continue;

          const props = f.properties || {};
          const name  = props.name || props.title || "Facility";

          const candidates = buildIconCandidates(props.icon); // <— key change
          try {
            const okUrl = await preloadImageSequential(candidates);
            L.marker([lat, lng], {
              icon: L.icon({
                iconUrl: okUrl,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
              }),
              pane: "markerPane",
              riseOnHover: true,
              zIndexOffset: 2000,
            })
              .addTo(group)
              .bindPopup(
                `<div style="min-width:200px">
                   <h4 style="margin:0 0 6px 0">🏥 ${name}</h4>
                   <div><b>Lat/Lng:</b> ${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
                 </div>`
              );
          } catch {
            missed += 1;
            L.circleMarker([lat, lng], {
              pane: "markerPane",
              radius: 8, weight: 2, opacity: 1, fillOpacity: 0.9,
            })
              .addTo(group)
              .bindPopup(`<b>🏥 ${name}</b><br/>(${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          }

          collected.push({ id: props.id || name, name, lat, lng });
        }

        onPoints(collected);
        setDebug(d => ({
          ...d,
          markers: collected.length,
          markersError: missed ? `Icons missing for ${missed} marker(s)` : null,
        }));
      } catch (e) {
        console.error("[Facilities] load error:", e);
        onPoints([]);
        setDebug(d => ({ ...d, markers: 0, markersError: String(e) }));
      }
    })();
    return () => { if (group) map.removeLayer(group); };
  }, [map, setDebug, onPoints]);
  return null;
}

function DebugBadge({ debug }) {
  return (
    <div style={{
      position: "absolute", right: 8, top: 8, zIndex: 10000,
      background: "rgba(0,0,0,0.55)", color: "white",
      fontSize: 12, padding: "6px 8px", borderRadius: 6
    }}>
      <div><b>Markers:</b> {debug.markers}</div>
      <div><b>Divisions:</b> {debug.divisions}</div>
      {debug.divisionsError && <div style={{ color:"#ffd7d7" }}>{debug.divisionsError}</div>}
      {debug.markersError   && <div style={{ color:"#ffd7d7" }}>{debug.markersError}</div>}
    </div>
  );
}

export default function MapWidget() {
  const [debug, setDebug] = useState({ markers: 0, divisions: 0, markersError: null, divisionsError: null });
  const [points, setPoints] = useState([]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer
        center={[42.36, -71.06]}
        zoom={8}
        style={{ width: "100%", height: "100%" }}
        preferCanvas
        whenReady={(m) => m.target.invalidateSize()}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <DivisionsLayer setDebug={setDebug} />
        <FacilityLayer setDebug={setDebug} onPoints={setPoints} />
        <FitToAll points={points} />
      </MapContainer>
      <DebugBadge debug={debug} />
    </div>
  );
}
