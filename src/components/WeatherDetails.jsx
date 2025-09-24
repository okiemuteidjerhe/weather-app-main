import snow from "../assets/images/icon-snow.webp"

export default function WeatherDetails(props){
    return(
        <div className="flex flex-col gap-6 p-5 bg-Neutral-700 rounded-xl">
            <p className="text-preset-6 text-Neutral-200">{props.title}</p>
            <h3 className="text-preset-3 text-Neutral-0">{props.value}{props.unit}</h3>
        </div>
    )
}

export function Forecast(props){
    return(
        <div className="px-2.5 py-4 flex flex-col gap-4 items-center rounded-xl bg-Neutral-600">
            <p className="text-preset-6 text-Neutral-0">{props.day}</p>
            <div className="w-14">
                <img src={props.weatherIcon} alt="" />
            </div>
            <div className="flex items-center gap-8">
                <p className="text-preset-7 text-Neutral-0">{props.high}&deg;</p>
                <p className="text-preset-7 text-Neutral-0">{props.low}&deg;</p>
            </div>
        </div>
    )
}

export function HourlyForeCast(props){
    return(
        <div className="bg-Neutral-700 rounded-lg px-3 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-10">
                    <img src={props.weatherIcon} alt="" />
                </div>
                <p className="text-preset-5-medium text-Neutral-0">{props.time}</p>
            </div>
            <p className="text-preset-7 text-Neutral-0">{props.temp}&deg;</p>
        </div>
    )
}