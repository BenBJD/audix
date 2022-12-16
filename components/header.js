import {Transport} from "../components/transport";

export const Header = () => {
  return (
    <div className="h-12 flex w-screen bg-slate-700 rounded-lg">
      <div className="m-auto flex flex-row w-screen">
        <div className="basis-1/3">
          <div className="w-fit mx-auto">
            <p className="text-gray-300 text-3xl">Audix</p>
          </div>
        </div>
        <Transport />
        <div className="basis-1/3">
          <div>
            <p>settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}