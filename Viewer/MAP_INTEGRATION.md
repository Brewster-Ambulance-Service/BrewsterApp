# Map Integration Documentation

## Overview
This document describes the integration of the `map_with_icons.html` file as a React component in the VehicleManagement page.

## Components Created

### MapWidget Component
- **Location**: `src/components/MapWidget.jsx`
- **Purpose**: Displays healthcare facility locations with custom markers
- **Features**:
  - Interactive markers with tooltips
  - Click handlers for detailed popups
  - Custom styling for tooltips and popups
  - Loading and error states
  - Responsive design

### Styling
- **Location**: `src/components/MapWidget.css`
- **Features**:
  - Custom tooltip styling
  - Enhanced popup appearance
  - Loading state styling
  - Responsive container design

## Integration Details

### Marker Data
The MapWidget includes 8 healthcare facilities with their coordinates:
1. AdviniaCare Baypointe
2. AdviniaCare Wellesley Alzheimer's Center
3. Bear Mountain of Sudbury
4. Affinity Healthcare
5. Cape Cod Healthcare
6. MetroWest Medical Center
7. Milford Regional Medical Center
8. Norwood Hospital

### Icons
- Uses existing icon files from `/public/maps/images/`
- Icons 1-8 are mapped to different facilities
- Custom icon sizing and positioning

### Features
- **Tooltips**: Show facility names on hover
- **Popups**: Detailed information on click including:
  - Facility name
  - Coordinates
  - Status
  - Contact button
- **Responsive**: Adapts to container size
- **Error Handling**: Graceful fallback for loading issues

## Usage
The MapWidget is integrated into the VehicleManagement page as a separate section titled "Facility Locations", providing a comprehensive view of healthcare facilities alongside the vehicle tracking map.

## Dependencies
- React
- Leaflet.js
- Leaflet CSS
- Custom CSS for styling
