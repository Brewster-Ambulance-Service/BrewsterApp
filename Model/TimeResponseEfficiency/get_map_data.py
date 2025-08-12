import folium
import json
import os

# Get the directory where this script is located (TimeResponseEfficiency folder)
base_dir = os.path.dirname(__file__)

# Create the base map
m = folium.Map(location=[41.94, -71.27], zoom_start=9)

# List of GeoJSON files to load (absolute paths)
geojson_files = [
    os.path.join(base_dir, 'Division Map1.json'),
    os.path.join(base_dir, 'Division Map2.json')
]

# Load and render each GeoJSON file
for file_path in geojson_files:
    if not os.path.exists(file_path):
        print(f"⚠️ Missing GeoJSON file: {file_path}")
        continue

    with open(file_path) as f:
        data = json.load(f)

    for feature in data.get('features', []):
        geometry = feature.get('geometry', {})
        geom_type = geometry.get('type', '')
        coords = geometry.get('coordinates', [])
        props = feature.get('properties', {})
        name = props.get('name', 'Unknown')

        # Handle Point features with icons
        if geom_type == 'Point':
            if len(coords) >= 2:
                lon, lat = coords[0], coords[1]

                # Default to icon-3.png if not specified
                icon_filename = os.path.basename(props.get('icon', 'icon-3.png'))
                icon_path = os.path.join(base_dir, 'images', icon_filename)

                # Fallback if the specified icon doesn't exist
                if not os.path.exists(icon_path):
                    print(f"⚠️ Missing icon: {icon_filename}, using icon-3.png")
                    icon_path = os.path.join(base_dir, 'images', 'icon-3.png')

                icon = folium.CustomIcon(
                    icon_image=icon_path,
                    icon_size=(30, 30)
                )

                folium.Marker(
                    location=[lat, lon],
                    icon=icon,
                    tooltip=name
                ).add_to(m)

        # Handle Polygon and MultiPolygon features
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

# Save the final map in the same directory as the script
output_path = os.path.join(base_dir, 'map_with_icons.html')
m.save(output_path)
print(f"✅ Map saved as {output_path}")
