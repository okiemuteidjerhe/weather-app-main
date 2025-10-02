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
import { useEffect, useState, useContext } from "react"
/* import { useFormStatus } from "react-dom" */
import { UnitContext } from "../context/UnitContext"
import ShimmerUI from "./ShimmerUI"
import ApiError from "./ApiError"


/* 
//For the search city form

function LoadingMessage() {
    const { pending } = useFormStatus(); //Check if form is still getting data;
    return (
        pending ? (
            <div className="absolute left-0 right-0 mt-2.5 bg-Neutral-800 p-2 rounded-xl flex items-center gap-2.5">
                <img src={loader} alt="" className="w-4 animate-spin" />
                <p className="text-prest-7 text-Neutral-0">Search in progress</p>
            </div>
        ) : null
    )
} */

export default function MainContent() {

    /*States*/

    const [location, setLocation] = useState(null); //For setting the last location (an object{name, country, latitude, longitude}) the user searches for.
    const [newUser, setNewUser] = useState(true); //Checks if a user is new or returning.
    const [results, setResults] = useState([]); //Stores data.results from searchCity for city dropdown.
    const [weatherDeets, setWeatherDeets] = useState(null); //Stores data from getWeatherDetails.
    const [loading, setLoading] = useState(false); //Checkes if the API calls are still in progress.
    const [chosen, setChosen] = useState(null); //An object that stores the chosen location details{name, country, latitude, longitude} to be used to populate the UI.
    const [openHourly, setOpenHourly] = useState(false); //Toggle weekday dropdown in hourly forecast container.
    const [selectedDay, setSelectedDay] = useState(null); //Sets selected day in the weekday dropdown.
    const [notFound, setNotFound] = useState(false); //For when a search location isn't found. 
    const [networkError, setNetworkError] = useState(false); //For when there's an issue connecting with the API.
    const [failedApi, setFailedApi] = useState(null); //To record whic API failed for the handleRetry().
    const [query, setQuery] = useState(''); //To record the searchCity query incase it fails.
    const [appLoading, setAppLoading] = useState(false); //For the shimmer UI


    /*On mount, checks if there is a lastWeatherLocation key in localStorage, sets NewUser to a boolean depending on if there is, sets Location to that value and calls getWeatherDetails with the value.*/
    useEffect(() => {
        let lastWeatherLocation = localStorage.getItem('lastWeatherLocation');
        if (lastWeatherLocation) {
            const parsed = JSON.parse(lastWeatherLocation);
            console.log(parsed)
            setLocation(parsed);
            setNewUser(false);
            getWeatherDetails(parsed.latitude, parsed.longitude, parsed.name, parsed.country);
        } else {
            setNewUser(true);
        }
    }, [])


    /*Selecting the searchUnitKey based on the user's choice*/
    const { unit } = useContext(UnitContext);

    const searchUnit = {
        metric: {
            wind: 'kmh',
            temperature: "celsius",
            precipitation: "mm"
        },
        imperial: {
            wind: 'mph',
            temperature: "fahrenheit",
            precipitation: "inch"
        }
    }

    const searchUnitKey = searchUnit[unit]


    /*Geocoding location API*/
    const searchCity = async (city) => {
        setQuery(city);

        const encodedSearchQuery = encodeURIComponent(city); //Incase there's a space in the search query
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedSearchQuery}&count=10&language=en&format=json`;
        console.log(url)

        if (notFound) {
            setWeatherDeets(null);
            setChosen(null);
            setAppLoading(true);
        }

        setNotFound(false);
        setNetworkError(false);

        try {
            if (weatherDeets !== null) {
                setLoading(true);
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Resonse Status: ${response.status}. Wrong spelling? Bad endpoint?`)
            }

            const data = await response.json()

            if (data.results) {
                setResults(data.results);
            } else {
                setResults([]);
                setWeatherDeets(null);
                setNotFound(true);
            }

        } catch (error) {
            console.error(error.message, "Network??");
            setNetworkError(true);
            setFailedApi("city");
        } finally {
            setLoading(false);
        }
    }


    /*Weather Details API*/
    const getWeatherDetails = async (lat, lon, name, country) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&wind_speed_unit=${searchUnitKey.wind}&temperature_unit=${searchUnitKey.temperature}&precipitation_unit=${searchUnitKey.precipitation}`


        setNetworkError(false);
        setFailedApi(null);

        try {
            setResults([]);

            if (weatherDeets === null) {
                setAppLoading(true);
            } else {
                setLoading(true);
            }


            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Resonse Status: ${response.status}. Not found or what?`)
            }

            const data = await response.json();
            console.log(data)

            setWeatherDeets(data);
            setChosen({
                name,
                country,
                lat,
                lon
            });
            setLocation({
                name,
                country,
                lat,
                lon
            });
            setNewUser(false);
        } catch (error) {
            console.error(error.message, "Network??")
            setNetworkError(true);
            setFailedApi("weather");
        } finally {
            setLoading(false);
            setAppLoading(false);
        }
    }

    /*Search city form action*/
    const callSearchCity = (formData) => {
        const input = formData.get("city");
        searchCity(input);
    }

    /*For when there's an error accessing any of the APIs*/
    const handleRetry = () => {
        if (failedApi === 'city') {
            searchCity(query);
        } else {
            if (location) {
                getWeatherDetails(location.latitude, location.longitude, location.name, location.country);
            }
        }
    }

    /*If the unit changes, call get weather with chosen details*/
    useEffect(() => {
        if (chosen) { getWeatherDetails(chosen.lat, chosen.lon, chosen.name, chosen.country); }
    }, [unit])

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

    /*Arrau for WeatherDetails component to draw from*/
    const weatherDetails = [
        {
            title: "Feels Like",
            value: weatherDeets?.current?.apparent_temperature.toFixed(0),
            unit: "\u00B0"
        },
        {
            title: "Humidity",
            value: weatherDeets?.current?.relative_humidity_2m.toFixed(0),
            unit: "%"
        },
        {
            title: "Wind",
            value: weatherDeets?.current?.wind_speed_10m.toFixed(0),
            unit: weatherDeets?.current_units?.wind_speed_10m
        },
        {
            title: "Precipitation",
            value: weatherDeets?.current?.precipitation.toFixed(0),
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

    /*Weather codes and corresponding images*/
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

    /*Current date and weather*/
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


    /*Daily forecast array populated from weatherDeets.daily */
    const forecasts = [];

    if (weatherDeets?.daily) {
        for (let i = 0; i < weatherDeets.daily.time.length; i++) {

            const date = new Date(weatherDeets.daily.time[i]);
            const day = date.toLocaleDateString('en-US', { weekday: "short" });

            const imagesKeyCode = weatherDeets.daily.weather_code[i];
            const weatherIcon = images[imagesKeyCode];

            /*Filled with objects*/
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

    /*Hourly forecast array populated from weatherDeets.hourly */
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

            /*Filled with objects*/
            hourly.push({
                weatherIcon,
                weekday,
                time: hour,
                temp: weatherDeets.hourly.temperature_2m[i].toFixed(0)
            })
        }
    }

    /*Gather all the weekdays in hourly*/
    const allWeekdays = hourly.map(item => {
        return item.weekday;
    })

    /*Find the unique weekdays in all weekdays array*/
    const uniqueWeekdays = [...new Set(allWeekdays)];


    /* Handle opening and closing of the weekday dropdown */
    const handleToggleHourly = () => {
        setOpenHourly(prev => !prev);
    }

    /*Handle selecting weekday, close weekday dropdown afterwards*/
    const handleSelectedDay = (day) => {
        setSelectedDay(day);
        setOpenHourly(false);
    }


    const daysDropdown = uniqueWeekdays.map(d => {
        return (
            <Days
                key={d}
                day={d}
                current={selectedDay}
                handleSelectedDay={handleSelectedDay}
            />
        )
    })

    /*When unique weekdays becomes available, before the user selects a day, pick the first day on the list.*/
    useEffect(() => {
        if (uniqueWeekdays.length > 0 && selectedDay === null) {
            setSelectedDay(uniqueWeekdays[0]);
        }
    }, [uniqueWeekdays, selectedDay])

    /*Based on the selected day, populate filteredHours*/
    let filteredHours = [];

    if (selectedDay) {
        filteredHours = hourly.filter(item => {
            return item.weekday === selectedDay
        });
    }

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
        <main className="px-4 mb-8 sm:px-6 lg:px-28 grow">

            {networkError ? (
                <ApiError
                    handleRetry={handleRetry}
                />
            ) : (
                <>

                {/*Hero Text*/}
                    <h1 className="my-12 text-center text-preset-2 text-Neutral-0 sm:px-[119px]">How is the sky looking today?</h1>

                {/*Search city form*/}
                    <form action={callSearchCity} role="search" className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:px-[280px]">

                        <div className="relative sm:grow">
                            <div className="flex py-4 px-6 gap-4 items-center bg-Neutral-700 rounded-xl hover:bg-Neutral-800 focus-within:outline-1 focus-within::outline-Neutral-0 focus-within:outline-offset-2 ">
                                <img src={search} alt="" className="w-5 h-5" />
                                <input 
                                    type="search" 
                                    name="city" 
                                    placeholder="Search for a place..." 
                                    className="outline-0 text-preset-5-medium text-Neutral-200 w-full" 
                                    aria-label="Search for a place" 
                                />
                            </div>

                            {/* <LoadingMessage /> */}

                            {/*Loading message*/}
                            {loading && (
                                <div className="absolute left-0 right-0 mt-2.5 bg-Neutral-800 p-2 rounded-xl flex items-center gap-2.5">
                                    <img src={loader} alt="" className="w-4 animate-spin" />
                                    <p className="text-prest-7 text-Neutral-0">Search in progress</p>
                                </div>)}

                            {/*Search results display*/}
                            {results.length > 0 && (
                                <div 
                                    className="absolute left-0 right-0 mt-2.5 max-h-[184px] overflow-y-auto bg-Neutral-800 grid gap-1 p-2 rounded-xl z-[1]">
                                    {cityDropdown}
                                </div>
                            )}
                        </div>

                        <button className="cursor-pointer bg-Blue-500 text-Neutral-0 rounded-xl py-4 px-6 text-preset-5-medium hover:bg-Blue-700 focus:outline-1 focus:outline-Blue-700 focus:outline-offset-2">Search</button>
                    </form>

                    {newUser ? null :
                        (appLoading ? <ShimmerUI /> :
                            (notFound ? (
                                <h3 className="mt-12 text-preset-4 text-Neutral-0 text-center">No search result found!</h3>
                            ) : ( 
                                <div className="flex flex-col gap-8 lg:flex-row">
                                    
                                    {/*Right side*/}

                                    <section className="flex flex-col gap-8 lg:justify-between">

                                        {/*Top Right*/}

                                        <div className="flex flex-col gap-5 lg:gap-8">
                                            <div className="bg-small  rounded-[20px] flex flex-col gap-4 px-6 py-10 sm:bg-large sm:px-6 sm:py-20 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex flex-col gap-3 items-center">
                                                    <h3 className="text-preset-4 text-Neutral-0 text-center sm:text-left">{chosen && `${chosen?.name}, ${chosen?.country}`}  </h3>
                                                    <p className="text-preset-6 text-Neutral-0 text-center sm:text-left">{curentDate}</p>
                                                </div>
                                                <div className="flex gap-5 items-center">
                                                    <div className="w-28">
                                                        <img src={currentWeather} alt="" />
                                                    </div>
                                                    <h2 className="text-preset-1 text-Neutral-0">{weatherDeets && `${weatherDeets?.current?.temperature_2m.toFixed(0)}\u00B0`}</h2>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:gap-6">
                                                {details}
                                            </div>
                                        </div>

                                        {/*Bottom right*/}

                                        <div className="flex flex-col gap-5">
                                            <h4 className="text-preset-5 text-Neutral-0">Daily forecast</h4>
                                            <div className="grid grid-cols-3 gap-4 sm:grid-cols-7">
                                                {dailyForecasts}
                                            </div>
                                        </div>
                                    </section>

                                    {/*Left Side*/}

                                    <section className="bg-Neutral-800 rounded-[20px] px-4 py-5 flex flex-col gap-4 sm:p-6 lg:w-[384px] lg:grow">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-preset-5 text-Neutral-0">Hourly forecast</h4>
                                            <div className="relative z-0">
                                                <button
                                                    className="cursor-pointer bg-Neutral-600 rounded-lg flex px-4 py-2 gap-3 hover:bg-Neutral-700 focus:outline-1 focus:outline-Neutral-0 focus:outline-offset-2"
                                                    onClick={handleToggleHourly}
                                                    aria-expanded = {openHourly}
                                                    aria-haspopup = 'true'
                                                    aria-controls = 'select-day-menu'
                                                    id="select-day-button"
                                                >
                                                    <span className="text-preset-7 text-Neutral-0">{selectedDay}</span>
                                                    <img src={dropdown} alt="" />
                                                </button>
                                                <div 
                                                    role="menu"
                                                    id="select-day-menu"
                                                    aria-labelledby="select-day-button"
                                                    className={`absolute right-0 mt-2.5 bg-Neutral-800 rounded-xl p-2 w-[214px] ${openHourly ? "grid" : "hidden"} gap-1`}
                                                >
                                                    {daysDropdown}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 max-h-[608px] overflow-y-auto">
                                            {hourlyForeCast}
                                        </div>
                                    </section>
                                </div>
                            )
                            )
                        )
                    }
                </>
            )}
        </main>
    )
}