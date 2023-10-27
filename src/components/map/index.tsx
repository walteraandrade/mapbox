import React from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import { useMapHook } from "../../hooks/use-map"
import { geojsons } from "./fake-data"
import Control from "../controls"

const MapContainer: React.FC = () => {
  const { addMarker, saveData, mapContainer } = useMapHook(geojsons)

  return (
    <>
      <Control addMarker={addMarker} saveData={saveData} />
      <div className="w-full relative flex justify-center py-8">
        <div ref={mapContainer} className="h-[600px] w-full m-auto" />
      </div>
      <div className="mt-12" />
    </>
  )
}

export default MapContainer
