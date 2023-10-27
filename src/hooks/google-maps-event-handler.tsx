/* eslint-disable @typescript-eslint/no-explicit-any */
interface GoogleMapsEvent extends Event {
  latLng: google.maps.LatLng
  placeId: string
  stop(): void
}

const isIconMouseEvent = (
  e: GoogleMapsEvent | google.maps.IconMouseEvent
): e is google.maps.IconMouseEvent => {
  return "placeId" in e
}

export class ClickEventHandler {
  origin: google.maps.LatLngLiteral
  map: google.maps.Map
  placesService: google.maps.places.PlacesService
  infowindow: google.maps.InfoWindow
  infowindowContent: HTMLElement
  onChangePlace: (placeId: string) => void
  constructor(
    map: google.maps.Map,
    origin: google.maps.LatLngLiteral,
    onChangePlace: (placeId: string) => void
  ) {
    this.origin = origin
    this.map = map
    this.placesService = new google.maps.places.PlacesService(map)
    this.infowindow = new google.maps.InfoWindow()
    this.infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement
    console.log("info window content: ", this.infowindowContent)

    this.infowindow.setContent(this.infowindowContent)
    this.map.addListener("click", this.handleClick.bind(this))
    this.onChangePlace = onChangePlace
  }
  handleClick(event: GoogleMapsEvent) {
    // Stops default behavior
    event.stop()

    if (isIconMouseEvent(event)) {
      if (event.placeId) {
        this.onChangePlace(event.placeId)
        this.getPlaceInformation(event.placeId)
      }
    }
  }

  getPlaceInformation(placeId: string) {
    this.placesService.getDetails(
      { placeId: placeId },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          status === "OK" &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          this.infowindow.close()
          this.infowindow.setPosition(place.geometry.location)
          ;(
            this.infowindowContent.children[
              "place-icon" as any
            ] as HTMLImageElement
          ).src = place.icon as string
          ;(
            this.infowindowContent.children["place-name" as any] as HTMLElement
          ).textContent = place.name!
          ;(
            this.infowindowContent.children["place-id" as any] as HTMLElement
          ).textContent = place.place_id as string
          ;(
            this.infowindowContent.children[
              "place-address" as any
            ] as HTMLElement
          ).textContent = place.formatted_address as string
          this.infowindow.open(this.map)
        }
      }
    )
  }
}
