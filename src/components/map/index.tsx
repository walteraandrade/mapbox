import React from "react"
import mapboxgl, { Map } from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
mapboxgl.accessToken =
  "pk.eyJ1Ijoid2FsdGVyYW5kcmFkZSIsImEiOiJjbG54Mm9qa2MwOHAzMmxxcHoyZ3RwMDBsIn0.Gym27-P1WFL0CWyxpAEiRQ"

const MapContainer: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapContainer = React.useRef<any | HTMLElement>("")
  const map = React.useRef<Map | null>(null)
  const [lng, setLng] = React.useState<number | undefined>(0)
  const [lat, setLat] = React.useState<number | undefined>(0)
  const [zoom, setZoom] = React.useState<number | undefined>(9)

  React.useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng ?? 0, lat ?? 0],
      zoom: zoom,
    })

    map.current.on("move", () => {
      setLng(map.current?.getCenter().lng)
      setLat(map.current?.getCenter().lat)
      setZoom(map.current?.getZoom())
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

    map.current?.on("load", async () => {
      // Add an image to use as a custom marker
      map.current?.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map.current?.addImage("custom-marker", image as any)
        }
      )
    })
  }, [lat, lng, zoom])

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [-40.608573861347594, -11.434524014348696],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [-38.48503205392288, -12.97279866639505],
          type: "Point",
        },
      },
    ],
  }

  const addMarker = () => {
    if (map.current) {
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement("div")
        el.className = "marker"
        el.style.backgroundImage = `url(src/assets/mapbox-marker-icon-blue.svg)`
        el.style.width = `20px`
        el.style.height = `30px`
        // make a marker for each feature and add to the map
        const marker = new mapboxgl.Marker({
          draggable: true,
        })
          .setLngLat(feature.geometry.coordinates as [number, number])
          .addTo(map.current)

        const onDragEnd = () => {
          const coor = marker.getLngLat()
          setLat(coor.lat)
          setLng(coor.lng)
          marker.setLngLat([coor.lng, coor.lat])
        }
        marker.on("dragend", onDragEnd)
      }
    }
  }

  return (
    <>
      <div ref={mapContainer} className="h-[800px] relative" />
      <div className="mt-40" />

      <div>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="mt-8" />
      <button onClick={addMarker} className="block">
        add marker
      </button>
    </>
  )
}

export default MapContainer
