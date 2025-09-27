import check from "../assets/images/icon-checkmark.svg"

export default function WeatherDetails(props){
    return(
        <div className="flex flex-col gap-6 p-5 bg-Neutral-700 rounded-xl">
            <p className="text-preset-6 text-Neutral-200">{props.title}</p>
            <h3 className="text-preset-3 text-Neutral-0">{props.value !== null ? props.value : ""}{props.unit ? (props.title === 'Precipitation' || props.title === 'Wind'? ` ${props.unit}` : props.unit) : ''}</h3>
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

export function Units(props){
    return(
        <div className='grid gap-2 border-b border-b-Neutral-600 last:border-b-0'>
            <p className='text-preset-8 px-2 pt-1.5'>{props.measurement}</p>
            <div className='grid gap-1'>
                <p className='px-2 py-1.5 flex justify-between items-center bg-Neutral-700 rounded-lg'>
                    <span className='text-preset-7 text-Neutral-0'>{props.metricUnit}</span>
                    <span><img src={check} alt="" /></span>
                </p>
                <p className='px-2 py-1.5 flex justify-between items-center'>
                    <span className='text-preset-7 text-Neutral-0'>{props.imperialUnit}</span>
                </p>
            </div>
        </div>
    )
}

export function Days(props){
    return(
        <button 
            className="cursor-pointer text-left px-2 py-2.5 text-preset-7 text-Neutral-0 bg-Neutral-700 rounded-lg"
            onClick={()=>{props.handleSelectedDay(props.day)}}
        >{props.day}</button>
    )
}

export function Cities(props){
    return(
        <button 
            className="cursor-pointer  px-2 py-2.5 text-preset-7 text-Neutral-0 text-left bg-Neutral-700 rounded-lg"
            onClick={()=>props.getWeatherDetails(props.latitude, props.longitude, props.name, props.country)}
        >{props.name}, {props.lga}, {props.state}, {props.country}</button>
    )
}