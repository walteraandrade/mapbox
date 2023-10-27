/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react"

interface ControlProps {
  addMarker: (event: ChangeEvent<HTMLSelectElement>) => void
  saveData?: (data: any) => void
}

const Control: React.FC<ControlProps> = ({
  addMarker,
  saveData,
}: {
  addMarker: (event: ChangeEvent<HTMLSelectElement>) => void
  saveData?: (data: any) => void
}) => {
  return (
    <>
      <div className="flex justify-center w-full">
        <select onChange={addMarker}>
          <option>Select</option>
          <option value={0}>Geojson 1</option>
          <option value={1}>Geojson 2</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button className="block border-2 rounded px-4 py-2 shadow-sm">
          add marker
        </button>
        <button
          onClick={saveData}
          className="block border-2 rounded px-4 py-2 shadow-sm"
        >
          save
        </button>
      </div>
    </>
  )
}

export default Control
