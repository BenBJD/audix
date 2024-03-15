// non-functional
import { XMarkIcon } from "@heroicons/react/24/outline"

export const DeviceEffect = (props) => {
    return (
        <li className={"h-1/6 pb-2"}>
            <div
                className={
                    "h-full flex flex-row p-1 gap-1 rounded-xl bg-gray-600"
                }
            >
                <div className={"w-1/5 m-auto flex justify-center"}>
                    <button className={"bg-red-700 w-5 h-5 rounded-full"} />
                </div>
                <div className={"w-3/5 m-auto"}>
                    <p className={"text-gray-200 text-center"}>LP Filter</p>
                </div>
                <button className={"w-1/5 m-auto"}>
                    <XMarkIcon className={"h-7 h-7 hover:text-red-700"} />
                </button>
            </div>
        </li>
    )
}