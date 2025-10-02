import logo from '../assets/images/logo.svg'
import gear from '../assets/images/icon-units.svg'
import dropdown from '../assets/images/icon-dropdown.svg'
import { Units } from '../components/WeatherDetails'
import { useState } from 'react'
import { useContext } from 'react'
import { UnitContext } from '../context/UnitContext'


/*Array for Units component to draw from. */
const units = [
    {
        measurement: "Temperature",
        metricUnit: "Celsius (\u00B0C)",
        imperialUnit: "Fahrenheit (\u00B0F)"
    },
    {
        measurement: "Wind Speed",
        metricUnit: "km/h",
        imperialUnit: "mph"
    },
    {
        measurement: "Precipitation",
        metricUnit: "Millimeters (mm)",
        imperialUnit: "Inches (in)"
    },
]

const unitOptions = units.map(unit => {
    return (
        <Units
            key={unit.measurement}
            measurement={unit.measurement}
            metricUnit={unit.metricUnit}
            imperialUnit={unit.imperialUnit}
        />
    )
})

export default function Layout(props) {
    const [isOpen, setIsOpen] = useState(false); //units dropdown toggle
    const { unit, setUnit } = useContext(UnitContext);

    /* Handle opening and closing of the units dropdown */
    const handleToggle = () => {
        setIsOpen(prev => !prev);
    }

    /*Handle updating unit state based on user's choice*/
    const handleUnitToggle = () => {
        setUnit(prev => {
            if (prev === 'metric') {
                return 'imperial';
            } else {
                return 'metric';
            }
        })
    }


    return (
        /*Flex container so main can grow. */
        <div className='flex flex-col min-h-screen'>

            {/*Header*/}
            <header className='p-4 pb-0 flex justify-between items-center sm:p-6 sm:pb-0 lg:px-28 lg:pt-12'>
                <div className='w-32 sm:w-48 lg:w-52'>
                    <img src={logo} alt="" className='w-full h-auto object-contain' />
                </div>

                {/* Div for unit dropdown button and dropdown content*/}
                <div className='relative'>
                    <button
                        onClick={handleToggle}
                        id='unit-button'
                        aria-expanded={isOpen}
                        aria-haspopup = 'listbox'
                        aria-label='Change units settings'
                        aria-controls='unit-list'
                        className='cursor-pointer bg-Neutral-800 hover:bg-Neutral-700 focus:outline-1 focus:outline-Neutral-0 focus:outline-offset-2 rounded-sm flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-3'
                    >
                        <img src={gear} alt="" className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                        <span className='text-preset-8 text-Neutral-0 sm:text-preset-7'>Units</span>
                        <img src={dropdown} alt="" className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                    </button>

                    {/*Dropdown content*/}
                    <div 
                        id='unit-list'
                        role='listbox'
                        aria-labelledby='unit-button'
                        className={`absolute z-[1] right-0 mt-2.5 bg-Neutral-800 ${isOpen ? "grid" : "hidden"} gap-2 px-2 py-1.5 rounded-xl w-[214px]`}
                    >
                        <button
                            onClick={handleUnitToggle}
                            className='px-2 py-2.5 text-preset-7 hover:bg-Neutral-700 focus:outline-1 focus:outline-Neutral-0 focus:outline-offset-2 rounded-xl text-left'
                        >
                            Switch to {unit === "metric" ? 'Imperial' : 'Metric'}
                        </button>
                        {unitOptions}
                    </div>
                </div>
            </header>

            {props.children}

            {/*Footer*/}
            <footer className='border-Orange-500 border-t-[0.1px] py-4 mx-4 text-preset-8 text-center text-Neutral-200 sm:mx-6 sm:text-preset-7 lg:mx-28'>
                Challenge by <a
                    href="https://www.frontendmentor.io?ref=challenge"
                    target='blank'
                    className='text-Blue-500 hover:text-Blue-700'
                >Frontend Mentor</a>.
                Coded by Okiemute.
            </footer>
        </div>
    )
}