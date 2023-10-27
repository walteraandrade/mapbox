import {
  APILoader,
  PlaceDirectionsButton,
  PlaceOverview,
} from "@googlemaps/extended-component-library/react"

interface GooglePlacesComponent {
  placeId: string
  apiKey: string
}

const GooglePlacesComponent: React.FC<GooglePlacesComponent> = ({
  placeId,
  apiKey,
}) => {
  return (
    <>
      <APILoader apiKey={apiKey} />
      <PlaceOverview size="large" place={placeId} googleLogoAlreadyDisplayed>
        <PlaceDirectionsButton slot="action">Directions</PlaceDirectionsButton>
      </PlaceOverview>
    </>
  )
}

export default GooglePlacesComponent
