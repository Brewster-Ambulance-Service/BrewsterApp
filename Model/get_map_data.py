import folium
import json

# Create the base map
m = folium.Map(location=[41.94, -71.27], zoom_start=9)

# List of GeoJSON files to load
geojson_files = ['Division Map1.json', 'Division Map2.json']

# Load and render each GeoJSON file
for file_name in geojson_files:
    with open(file_name) as f:
        data = json.load(f)

    for feature in data['features']:
        geometry = feature.get('geometry', {})
        geom_type = geometry.get('type', '')
        coords = geometry.get('coordinates', [])
        props = feature.get('properties', {})
        name = props.get('name', 'Unknown')

        # Handle Point features with icons
        if geom_type == 'Point':
            lon, lat = coords[0], coords[1]
            icon_path = props.get('icon', 'images/icon-3.png')  # fallback

            icon = folium.CustomIcon(
                icon_image=icon_path,
                icon_size=(30, 30)
            )

            folium.Marker(
                location=[lat, lon],
                icon=icon,
                tooltip=name
            ).add_to(m)

        # Handle Polygon and MultiPolygon features (e.g., sectors or divisions)
        elif geom_type in ['Polygon', 'MultiPolygon']:
            folium.GeoJson(
                feature,
                tooltip=folium.GeoJsonTooltip(fields=['name'], aliases=['Division:']),
                style_function=lambda f: {
                    'fillColor': f['properties'].get('fill', '#3186cc'),
                    'color': f['properties'].get('stroke', 'black'),
                    'weight': 2,
                    'fillOpacity': f['properties'].get('fill-opacity', 0.5)
                }
            ).add_to(m)

# Add Layer Control
folium.LayerControl().add_to(m)

# Save the final map
m.save('map_with_icons.html')
print("✅ Map saved as map_with_icons.html")
