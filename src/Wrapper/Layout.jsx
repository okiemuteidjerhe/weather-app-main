import logo from '../assets/images/logo.svg'
import gear from '../assets/images/icon-units.svg'
import dropdown from '../assets/images/icon-dropdown.svg'
import { Units } from '../components/WeatherDetails'

const units = [
    {
        measurement: "Temperature",
        metricUnit: "Celcius (\u00B0C)",
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
            key = {unit.measurement}
            measurement = {unit.measurement}
            metricUnit = {unit.metricUnit}
            imperialUnit = {unit.imperialUnit}
        />
    )
})

export default function Layout(props){
    return(
        <>
        <header className='p-4 pb-0 flex justify-between items-center sm:p-6 sm:pb-0 lg:px-28 lg:pt-12'>
            <div className='w-32 sm:w-48 lg:w-52'>
                <img src={logo} alt="" className='w-full h-auto object-contain'/>
            </div>

        <div className='relative'>
                <button 
                aria-expanded = 'false'
                aria-label='Change units settings' 
                className='cursor-pointer bg-Neutal-800 hover:bg-Neutral-700 focus:outline-1 focus:outline-Neutral-0 focus:outline-offset-2 rounded-sm flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-3'
            >
                <img src={gear} alt="" className='w-3.5 h-3.5 sm:w-4 sm:h-4'/>
                <span className='text-preset-8 text-Neutral-0 sm:text-preset-7'>Units</span>
                <img src={dropdown} alt="" className='w-3.5 h-3.5 sm:w-4 sm:h-4'/>
            </button>

            <div className='hidden absolute z-[1] right-0 mt-2.5 grid gap-2 px-2 py-1.5 rounded-xl bg-Neutal-800 w-[214px]'>
                <button 
                    className='px-2 py-2.5 text-preset-7 hover:bg-Neutral-700 focus:outline-1 focus:outline-Neutral-0 focus:outline-offset-2 rounded-xl text-left'
                >
                    Switch to Imperial
                </button>
                {unitOptions}
                {/* <div className='grid gap-2 border-b border-b-Neutral-600'>
                    <p className='text-preset-8 px-2 pt-1.5'>Temperature</p>
                    <div className='grid gap-1'>
                        <p className='px-2 py-1.5 flex justify-between items-center bg-Neutral-700 rounded-lg'>
                            <span className='text-preset-7 text-Neutral-0'>Celcius (&deg;C)</span>
                            <span><img src={check} alt="" /></span>
                        </p>
                        <p className='px-2 py-1.5 flex justify-between items-center'>
                            <span className='text-preset-7 text-Neutral-0'>Fahrenheit (&deg;F)</span>
                        </p>
                    </div>
                </div>
                <div className='grid gap-2 border-b border-b-Neutral-600'>
                    <p className='text-preset-8 px-2 pt-1.5'>Wind Speed</p>
                    <div className='grid gap-1'>
                        <p className='px-2 py-1.5 flex justify-between items-center bg-Neutral-700 rounded-xl'>
                            <span className='text-preset-7 text-Neutral-0'>km/h</span>
                            <span><img src={check} alt="" /></span>
                        </p>
                        <p className='px-2 py-1.5 flex justify-between items-center'>
                            <span className='text-preset-7 text-Neutral-0'>mph</span>
                        </p>
                    </div>
                </div>
                <div className='grid gap-2'>
                    <p className='text-preset-8 px-2 pt-1.5'>Precipitation</p>
                    <div>
                        <p className='px-2 py-1.5 flex justify-between items-center bg-Neutral-700 rounded-xl'>
                            <span className='text-preset-7 text-Neutral-0'>Millimeters (mm)</span>
                            <span><img src={check} alt="" /></span>
                        </p>
                        <p className='px-2 py-1.5 flex justify-between items-center'>
                            <span className='text-preset-7 text-Neutral-0'>Inches (in)</span>
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
        </header>

        {props.children}

        <footer className='border-Orange-500 border-t-[0.1px] py-4 mx-4 text-preset-8 text-center text-Neutral-200 sm:mx-6 sm:text-preset-7 lg:mx-28'>
            Challenge by <a 
            href="https://www.frontendmentor.io?ref=challenge"
            target='blank'
            className='text-Blue-500 hover:text-Blue-700'
            >Frontend Mentor</a>. 
            Coded by Okiemute.
        </footer>
        </>
    )
}