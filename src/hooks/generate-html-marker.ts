export const generateHtmlMarker = () => {
  const el = document.createElement("div")
  el.className = "marker"
  el.style.backgroundImage = `url(src/assets/mapbox-marker-icon-blue.svg)`
  el.style.width = `20px`
  el.style.height = `30px`
}
