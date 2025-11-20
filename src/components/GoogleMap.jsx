import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function BrandedMap() {
  const position = { lat: 10.3115, lng: 11.1325 }; // Tumfure, Gombe

  const tealMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#e0f7f6' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#006d6b' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
    {
      featureType: 'water',
      stylers: [{ color: '#a7f0ea' }], // Teal water
    },
    {
      featureType: 'road',
      stylers: [{ color: '#c3ecea' }],
    },
    {
      featureType: 'poi',
      stylers: [{ color: '#d8f7f5' }],
    },
  ];

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <div className="w-full h-80 rounded-xl overflow-hidden shadow-md">
        <Map
          defaultZoom={14}
          defaultCenter={position}
          mapId="homelink-teal-map"
          styles={tealMapStyle}
          gestureHandling="greedy">
          <Marker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
}
