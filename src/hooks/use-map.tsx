import React, { ChangeEvent } from "react"
import mapboxgl, { Map, Marker } from "mapbox-gl"
import { Geojson } from "../components/map/fake-data"
import { generateHtmlMarker } from "./generate-html-marker"

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2FsdGVyYW5kcmFkZSIsImEiOiJjbG54Mm9qa2MwOHAzMmxxcHoyZ3RwMDBsIn0.Gym27-P1WFL0CWyxpAEiRQ"

type GeoJsonCoordinates = [latitude: number, longitude: number]

interface SavedData {
  0?: GeoJsonCoordinates
  1?: GeoJsonCoordinates
}

type Markers = Record<number, Marker>

const spLatLon = [-23.533773, -46.62529]

//TODO: once integration is done, this hook should receive the goejson as an array of geojsons
export const useMapHook = (geojsons: Geojson[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapContainer = React.useRef<any | HTMLElement>("")
  const map = React.useRef<Map | null>(null)
  const mapMarker = React.useRef<Markers>({})
  const [markers, setMarkers] = React.useState<Geojson>()
  const [savedData, setSavedData] = React.useState<SavedData>()

  React.useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [spLatLon[1], spLatLon[0]],
      zoom: 6,
    })

    map.current?.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    )
  }, [])

  React.useEffect(() => {
    if (map.current && markers) {
      markers?.features.map((feature, index) => {
        if (map.current) {
          generateHtmlMarker()
          mapMarker.current[index] = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat(feature.geometry.coordinates as GeoJsonCoordinates)
            .addTo(map.current)

          const selectedMarker = mapMarker.current[index]
          const onDragEnd = () => {
            const coor = selectedMarker.getLngLat()
            if (coor) {
              setSavedData((prev) => ({
                ...prev,
                [index]: [coor.lng, coor.lat],
              }))
            }
          }
          selectedMarker.on("dragend", onDragEnd)
        }
      })
    }
  }, [markers])

  function addMarker(event: ChangeEvent<HTMLSelectElement>) {
    Object.values(mapMarker.current).map((marker) => marker.remove())
    const value = Number(event.target.value)
    setMarkers(geojsons[value])
  }

  const saveData = () => {
    const features = [
      {
        type: "Feature",
        geometry: {
          coordinates: [savedData?.[0]?.[0], savedData?.[0]?.[1]],
          type: "Point",
        },
      },
      {
        type: "Feature",
        geometry: {
          coordinates: [savedData?.[1]?.[0], savedData?.[1]?.[1]],
          type: "Point",
        },
      },
    ]
    const updatedGeoJson = Object.defineProperty(markers, "features", {
      value: features,
      writable: false,
    })
    console.log(updatedGeoJson)
  }
  return {
    saveData,
    addMarker,
    mapContainer,
  }
}
