import ReactSlider from "react-slider"

export const MixerSlider = (props) => {
    const mixerLevel = props.mixerLevel
    const setMixerLevel = props.setMixerLevel
    return (
        <>
            <div className={"basis-2/3 flex p-2"}>
                <ReactSlider
                    orientation={"vertical"}
                    className="mixer-slider"
                    thumbClassName="bg-gray-200 rounded-md w-5 h-2"
                    value={mixerLevel}
                    onChange={(value) => setMixerLevel(value)}
                    renderThumb={(props, state) => <div {...props}></div>}
                    invert
                />
            </div>
            <div className={"basis-1/3 flex flex-col justify-between"}>
                <p className={"text-gray-200"}>--</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>--</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>-</p>
                <p className={"text-gray-200"}>--</p>
            </div>
        </>
    )
}
