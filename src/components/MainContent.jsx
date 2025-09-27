import search from "../assets/images/icon-search.svg"
import sun from "../assets/images/icon-sunny.webp"
import rain from "../assets/images/icon-rain.webp"
import snow from "../assets/images/icon-snow.webp"
import storm from "../assets/images/icon-storm.webp"
import cloudy from "../assets/images/icon-partly-cloudy.webp"
import overcast from "../assets/images/icon-overcast.webp"
import fog from "../assets/images/icon-fog.webp"
import drizzle from "../assets/images/icon-drizzle.webp"
import dropdown from "../assets/images/icon-dropdown.svg"
import loader from '../assets/images/icon-loading.svg'
import WeatherDetails, { Forecast, HourlyForeCast, Days, Cities } from "./WeatherDetails"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"


function LoadingMessage() {
    const { pending } = useFormStatus();
    return (
        pending ? (
            <div className="absolute left-0 right-0 mt-2.5 bg-Neutal-800 p-2 rounded-xl flex items-center gap-2.5">
                <img src={loader} alt="" className="w-4 animate-spin" />
                <p className="text-prest-7 text-Neutral-0">Search in progress</p>
            </div>
        ) : null
    )
}

export default function MainContent() {
    const [results, setResults] = useState([]);
    const [weatherDeets, setWeatherDeets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chosen, setChosen] = useState(null);
    const [openHourly, setOpenHourly] = useState(false);

    const handleToggleHourly = () => {
        setOpenHourly(prev => !prev);
    }

    const searchCity = async (formData) => {
        const input = Object.fromEntries(formData);
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${input.city}&count=10&language=en&format=json`;
        console.log(url)

        try {
            const response = await fetch(url);

            if (!response) {
                throw new Error(`Resonse Status: ${response.status}. Not found or what?`)
            }

            const data = await response.json()
            console.log(data)

            if (data.results) {
                setResults(data.results);
            } else {
                setResults([]);
            }

        } catch (error) {
            console.error(error.message, "Network??")
        }
    }


    const getWeatherDetails = async (lat, lon, name, country) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`

        console.log(url)

        try {
            setResults([]);
            setLoading(true)


            const response = await fetch(url);

            if (!response) {
                throw new Error(`Resonse Status: ${response.status}. Not found or what?`)
            }

            const data = await response.json();
            console.log(data)

            setWeatherDeets(data)
            setChosen({
                name,
                country,
            })
        } catch (error) {
            console.error(error.message, "Network??")
        } finally {
            setLoading(false)
        }
    }

    const cityDropdown = results.map(city => {
        return (
            <Cities
                key={city.id}
                name={city.name}
                lga={city.admin2}
                state={city.admin1}
                country={city.country}
                longitude={city.longitude}
                latitude={city.latitude}
                getWeatherDetails={getWeatherDetails}
            />
        )
    })

    const weatherDetails = [
        {
            title: "Feels Like",
            value: weatherDeets?.current?.apparent_temperature,
            unit: "\u00B0"
        },
        {
            title: "Humidity",
            value: weatherDeets?.current?.relative_humidity_2m,
            unit: "%"
        },
        {
            title: "Wind",
            value: weatherDeets?.current?.wind_speed_10m,
            unit: weatherDeets?.current_units?.wind_speed_10m
        },
        {
            title: "Precipitation",
            value: weatherDeets?.current?.precipitation,
            unit: weatherDeets?.current_units?.precipitation
        }
    ]

    const details = weatherDetails.map(detail => {
        return <WeatherDetails
            key={detail.title}
            title={detail.title}
            unit={detail.unit}
            value={detail.value}
        />
    })

    const images = {
        0: sun,
        1: cloudy,
        2: cloudy,
        3: overcast,
        45: fog,
        46: fog,
        51: drizzle,
        53: drizzle,
        55: drizzle,
        56: drizzle,
        57: drizzle,
        61: rain,
        63: rain,
        65: rain,
        66: rain,
        67: rain,
        71: snow,
        73: snow,
        75: snow,
        77: snow,
        80: rain,
        81: rain,
        82: rain,
        85: snow,
        86: snow,
        95: storm,
        96: storm,
        99: storm
    };

    let curentDate;
    let currentWeather;
    if (weatherDeets?.current) {
        currentWeather = images[weatherDeets.current.weather_code]
        let weekday = new Date(weatherDeets.current.time)
        curentDate = weekday.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }


    const forecasts = []

    if (weatherDeets?.daily) {
        for (let i = 0; i < weatherDeets.daily.time.length; i++) {

            const date = new Date(weatherDeets.daily.time[i]);
            const day = date.toLocaleDateString('en-US', { weekday: "short" });

            const imagesKeyCode = weatherDeets.daily.weather_code[i];
            const weatherIcon = images[imagesKeyCode];

            forecasts.push({
                day,
                weatherIcon,
                high: weatherDeets.daily.temperature_2m_max[i].toFixed(0),
                low: weatherDeets.daily.temperature_2m_min[i].toFixed(0),
            })
        }
    }


    const dailyForecasts = forecasts.map((forecast, index) => {
        let value = index + 1
        return (
            <Forecast
                key={value}
                day={forecast.day}
                weatherIcon={forecast.weatherIcon}
                high={forecast.high}
                low={forecast.low}
            />
        )
    })

    const hourly = []

    if (weatherDeets?.hourly) {
        for (let i = 0; i < weatherDeets.hourly.time.length; i++) {

            const day = new Date(weatherDeets.hourly.time[i]);
            const hour = day.toLocaleTimeString("en-Us", {
                hour: "numeric",
                hour12: true
            });

            const weekday = day.toLocaleDateString("en-US", { weekday: "long" })

            const code = weatherDeets.hourly.weather_code[i];
            const weatherIcon = images[code];

            hourly.push({
                weatherIcon,
                weekday,
                time: hour,
                temp: weatherDeets.hourly.temperature_2m[i].toFixed(0)
            })
        }
    }

    const allWeekdays = hourly.map(item => {
        return item.weekday;
    })

    console.log(allWeekdays);

    const uniqueWeekdays = [...new Set(allWeekdays)];

    console.log(uniqueWeekdays);

    const [selectedDay, setSelectedDay] = useState(null)

    const handleSelectedDay = (day) => {
        setSelectedDay(day);
        setOpenHourly(false);
    }

    const daysDropdown = uniqueWeekdays.map(d => {
        return (
            <Days
                key={d}
                day={d}
                handleSelectedDay={handleSelectedDay}
            />
        )
    })

    useEffect(() => {
        if (uniqueWeekdays.length > 0 && selectedDay === null) {
            setSelectedDay(uniqueWeekdays[0]);
        }
    }, [uniqueWeekdays, selectedDay])

    let filteredHours = [];

    if (selectedDay) {
        filteredHours = hourly.filter(item => {
            return item.weekday === selectedDay
        });
    }

    console.log(filteredHours)

    const hourlyForeCast = filteredHours.map((hour, index) => {
        let keyValue = index + 1
        return (
            <HourlyForeCast
                key={keyValue}
                weatherIcon={hour.weatherIcon}
                time={hour.time}
                temp={hour.temp}
            />
        )
    })
    return (
        <main className="px-4 mb-8 sm:px-6 lg:px-28">
            <h1 className="my-12 text-center text-preset-2 text-Neutral-0 sm:px-[119px]">How is the sky looking today?</h1>

            <form action={searchCity} role="search" className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:px-[280px]">
                <div className="relative sm:grow">
                    <div className="flex py-4 px-6 gap-4 items-center bg-Neutral-700 rounded-xl hover:bg-Neutral-800 focus-within:outline-1 focus-within::outline-Neutral-0 focus-within:outline-offset-2 ">
                        <img src={search} alt="" className="w-5 h-5" />
                        <input type="search" name="city" id="" placeholder="Search for a place..." className="outline-0 text-preset-5-medium text-Neutral-200 w-full" aria-label="Search for a place" />
                    </div>

                    <LoadingMessage />

                    {loading && (
                        <div className="absolute left-0 right-0 mt-2.5 bg-Neutal-800 p-2 rounded-xl flex items-center gap-2.5">
                            <img src={loader} alt="" className="w-4 animate-spin" />
                            <p className="text-prest-7 text-Neutral-0">Search in progress</p>
                        </div>)}

                    {results.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2.5 max-h-[184px] overflow-y-auto bg-Neutal-800 grid gap-1 p-2 rounded-xl">
                            {cityDropdown}
                        </div>
                    )}
                </div>
                <button className="cursor-pointer bg-Blue-500 text-Neutral-0 rounded-xl py-4 px-6 text-preset-5-medium hover:bg-Blue-700 focus:outline-1 focus:outline-Blue-700 focus:outline-offset-2">Search</button>
            </form>
            <div className="flex flex-col gap-8 lg:flex-row">
                <section className="flex flex-col gap-8 lg:justify-between">
                    <div className="flex flex-col gap-5 lg:gap-8">
                        <div className="bg-small  rounded-[20px] flex flex-col gap-4 px-6 py-10 sm:bg-large sm:px-6 sm:py-20 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-col gap-3 items-center">
                                <h3 className="text-preset-4 text-Neutral-0">{chosen ? `${chosen?.name}, ${chosen?.country}` : `Berlin, Germany`}  </h3>
                                <p className="text-preset-6 text-Neutral-0">{curentDate ? curentDate : `Tuesday, Aug 5, 2025`}</p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <div className="w-28">
                                    <img src={currentWeather} alt="" />
                                </div>
                                <h2 className="text-preset-1 text-Neutral-0">{weatherDeets ? `${weatherDeets?.current?.temperature_2m.toFixed(0)}\u00B0` : `0\u00B0`}</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:gap-6">
                            {details}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h4 className="text-preset-5 text-Neutral-0">Daily forecast</h4>
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-7">
                            {dailyForecasts}
                        </div>
                    </div>
                </section>
                <section className="bg-Neutal-800 rounded-[20px] px-4 py-5 flex flex-col gap-4 sm:p-6 lg:w-[384px] lg:grow">
                    <div className="flex items-center justify-between">
                        <h4 className="text-preset-5 text-Neutral-0">Hourly forecast</h4>
                        <div className="relative z-0">
                            <button
                                className="cursor-pointer bg-Neutral-600 rounded-lg flex px-4 py-2 gap-3 hover:bg-Neutral-700 focus:outline-1 focus:outline-Neutral-0 focus:outline-offset-2"
                                onClick={handleToggleHourly}
                            >
                                <span className="text-preset-7 text-Neutral-0">{selectedDay}</span>
                                <img src={dropdown} alt="" />
                            </button>
                            <div className={`absolute right-0 mt-2.5 bg-Neutal-800 rounded-xl p-2 w-[214px] ${openHourly ? "grid" : "hidden"} gap-1`}>
                                {daysDropdown}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 max-h-[608px] overflow-y-auto">
                        {hourlyForeCast}
                    </div>
                </section>
            </div>
        </main>
    )
}