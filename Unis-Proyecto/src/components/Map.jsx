// src/components/Map.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Arreglo del icono de marker (sino no se ve)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
})

export default function Map({ lat, lng, name }) {
  if (!lat || !lng) {
    return <p>No hay ubicación disponible</p>
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
