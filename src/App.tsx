import { Libraries, useLoadScript } from "@react-google-maps/api"
import * as React from "react"
// import { Geojson, geojsons } from "./components/map/fake-data"
// import Control from "./components/controls"
import { ClickEventHandler } from "./hooks/google-maps-event-handler"
import GoogleMapComponent from "./components/map/gmap.component"
import GooglePlacesComponent from "./components/map/google-places"

const geojson1 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        coordinates: [-40.608573861347594, -11.434524014348696],
        type: "Point",
      },
    },
    {
      type: "Feature",
      geometry: {
        coordinates: [-38.48503205392288, -12.97279866639505],
        type: "Point",
      },
    },
  ],
}

const geojson2 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-46.654329682340176, -23.540711916050896],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-43.98508205337069, -19.894463191881314],
        type: "Point",
      },
    },
  ],
}

export type Geojson = typeof geojson1
const geojsons = [geojson1, geojson2]

const libraries: Libraries = ["places"]
const apiKey = "AIzaSyBQ1Y8mkKLNGjNadg30_ctfHWHIDVfkimc"
function App() {
  const [selectedPlace, setSelectedPlace] = React.useState<string>("")
  const { isLoaded, url } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  })

  const handleChangePlace = (placeId: string) => {
    setSelectedPlace(placeId)
  }

  React.useEffect(() => {
    const origin = {
      lat: geojsons[1].features[0].geometry.coordinates[1],
      lng: geojsons[1].features[0].geometry.coordinates[0],
    }
    if (isLoaded) {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 9,
          center: origin,
        }
      )

      const initMap = (): void => {
        new ClickEventHandler(map, origin, handleChangePlace)
      }

      initMap()
    }
  }, [isLoaded, url])

  return (
    <>
      <nav className="shadow-md h-16 w-full flex">
        <button className="border-1 px-4 py-2 flex justify-center items-center">
          Home
        </button>
        <button className="border-1 px-4 py-2 flex justify-center items-center">
          Map
        </button>
        <button className="border-1 px-4 py-2 flex justify-center items-center">
          Config
        </button>
        <button className="border-1 px-4 py-2 flex justify-center items-center">
          Logout
        </button>
      </nav>
      <GooglePlacesComponent apiKey={apiKey} placeId={selectedPlace} />
      <div className="mt-8" />

      <div className="container m-auto">
        <div id="infowindow-content">
          <img id="place-icon" src="" height="16" width="16" />
          <span id="place-name" className="text-xl"></span>
          <br />
          <span id="place-id"></span>
          <br />
          <span id="place-address"></span>
        </div>

        {!isLoaded ? <h1>Loading...</h1> : <GoogleMapComponent />}
      </div>
    </>
  )
}

export default App
