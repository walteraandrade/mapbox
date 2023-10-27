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
export const geojsons = [geojson1, geojson2]
