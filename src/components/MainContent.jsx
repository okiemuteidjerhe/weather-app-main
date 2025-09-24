import search from "../assets/images/icon-search.svg"
import sun from "../assets/images/icon-sunny.webp"
import dropdown from "../assets/images/icon-dropdown.svg"
import WeatherDetails, {Forecast, HourlyForeCast} from "./WeatherDetails"


const weatherDetails = [
    {
        title: "Feels Like",
        value: 18, 
        unit: "\u00B0"
    },
    {
        title: "Humidity",
        value: 46, 
        unit: "%"
    },
    {
        title: "Wind",
        value: 14,
        unit: " km/h"
    },
    {
        title: "Precipitation",
        value: 0,
        unit: " mm"
    }
]

const details = weatherDetails.map(detail => {
    return <WeatherDetails
        key = {detail.title}
        title = {detail.title}
        unit = {detail.unit}
        value = {detail.value}
    />
})


const forecasts = [
    {
        day: "Tue",
        weatherIcon: sun,
        high: 20,
        low: 14 
    },
    {
        day: "Wed",
        weatherIcon: sun,
        high: 20,
        low: 14 
    },
    {
        day: "Thu",
        weatherIcon: sun,
        high: 20,
        low: 14 
    },
    {
        day: "Fri",
        weatherIcon: sun,
        high: 20,
        low: 14 
    },
    {
        day: "Sat",
        weatherIcon: sun,
        high: 20,
        low: 14 
    },
    {
        day: "Sun",
        weatherIcon: sun,
        high: 20,
        low: 14 
    },
    {
        day: "Mon",
        weatherIcon: sun,
        high: 20,
        low: 14 
    },
]

const dailyForecasts = forecasts.map((forecast, index) => {
    let value = index + 1
    return(
        <Forecast
        key = {value}
        day = {forecast.day}
        weatherIcon = {forecast.weatherIcon}
        high = {forecast.high}
        low = {forecast.low}
        />
    )
})


const hourly = [
    {
        weatherIcon: sun,
        time: "4PM",
        temp: 29
    },
    {
        weatherIcon: sun,
        time: "5PM",
        temp: 29
    },
    {
        weatherIcon: sun,
        time: "6PM",
        temp: 29
    },
    {
        weatherIcon: sun,
        time: "7PM",
        temp: 29
    },
    {
        weatherIcon: sun,
        time: "8PM",
        temp: 29
    },
    {
        weatherIcon: sun,
        time: "9PM",
        temp: 29
    },
    {
        weatherIcon: sun,
        time: "10PM",
        temp: 29
    },
    {
        weatherIcon: sun,
        time: "11PM",
        temp: 29
    },
]

const hourlyForeCast = hourly.map((hour, index) => {
    let keyValue = index + 1
    return (
        <HourlyForeCast
        key = {keyValue}
        weatherIcon = {hour.weatherIcon}
        time = {hour.time}
        temp = {hour.temp}
        />
    )
})

export default function MainContent(){
    return(
        <main className="px-4 mb-8">
            <h1 className="my-12 text-center text-preset-2 text-Neutral-0">How is the sky looking today?</h1>
            <form role="search" className="mb-8 flex flex-col gap-3">
                <div className="flex py-4 px-6 gap-4 items-center bg-Neutral-700 rounded-xl">
                    <img src={search} alt="" className="w-5 h-5"/>
                    <input type="search" name="city" id="" placeholder="Search for a place..." className="text-preset-5-medium text-Neutral-200" aria-label="Search for a place"/>
                </div>
                <button className="bg-Blue-500 text-Neutral-0 rounded-xl py-4 px-6 text-preset-5-medium">Search</button>
            </form>
            <div className="flex flex-col gap-8">
                <section className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5">
                        <div className="bg-small flex flex-col gap-4 px-6 py-10">
                            <div className="flex flex-col gap-3 items-center">
                                <h3 className="text-preset-4 text-Neutral-0">Berlin, Germany</h3>
                                <p className="text-preset-6 text-Neutral-0">Tuesday, Aug 5, 2025</p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <div className="">
                                    <img src={sun} alt="Suuny" />
                                </div>
                                <h2 className="text-preset-1 text-Neutral-0">20&deg;</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {details}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h4 className="text-preset-5 text-Neutral-0 ">Daily forecast</h4>
                        <div className="grid grid-cols-3 gap-4">
                            {dailyForecasts}
                        </div>
                    </div>
                </section>
                <section className="bg-Neutal-800 rounded-[20px] px-4 py-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-preset-5 text-Neutral-0">Hourly forecasts</h4>
                        <button className="bg-Neutral-600 rounded-lg flex px-4 py-2 gap-3">
                            <span className="text-preset-7 text-Neutral-0">Tuesday</span>
                            <img src={dropdown} alt="" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {hourlyForeCast}
                    </div>
                </section>
            </div>
        </main>
    )
}