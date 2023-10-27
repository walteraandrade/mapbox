import React from "react"
import { GoogleMap } from "@react-google-maps/api"

// To avoid confusions let's always use [lon, lat]
type MarkPositionTuple = [number, number]
const spLatLon: MarkPositionTuple = [-23.533773, -46.62529]
const center = { lat: spLatLon[0], lng: spLatLon[1] }
const GoogleMapComponent: React.FC = () => {
  return (
    <>
      <GoogleMap
        mapContainerClassName="h-[600px] w-full"
        center={center}
        zoom={10}
        id="map"
      />
    </>
  )
}

export default GoogleMapComponent
