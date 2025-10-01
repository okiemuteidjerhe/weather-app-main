import loadingDots from '../assets/images/loading-dots.svg'
import dropdown from "../assets/images/icon-dropdown.svg"
import WeatherDetails from './WeatherDetails'

const weatherDetails = [
        {
            title: "Feels Like",
            value: "\u2014"
        },
        {
            title: "Humidity",
            value: "\u2014"
        },
        {
            title: "Wind",
            value: "\u2014"
        },
        {
            title: "Precipitation",
            value: "\u2014"
        }
    ]
 
const details = weatherDetails.map(detail => {
    return <WeatherDetails
        key = {detail.title}
        title = {detail.title}
        value = {detail.value}
        unit = {detail.unit}
    />
})    

export default function ShimmerUI(){
    return(
        <div className="flex flex-col gap-8 lg:flex-row">
            <section className="flex flex-col gap-8 lg:justify-between">
                <div className="flex flex-col gap-5 lg:gap-8">
                    <div className="w-full h-[286px] grid place-content-center bg-Neutral-700 rounded-[20px]">
                        <div className='flex flex-col items-center'>
                            <div className='w-[56px] h-[16px] mb-4 animate-bounce z-0'>
                                <img src={loadingDots} alt="" />
                            </div>
                            <p className='text-preset-6 text-Neutral-200'>Loading...</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:gap-6">
                        {details}
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h4 className="text-preset-5 text-Neutral-0">Daily forecast</h4>
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-7">
                        <div className="w-[100px] h-[165px] rounded-xl bg-Neutral-700 animate-pulse"></div>                     
                        <div className="w-[100px] h-[165px] rounded-xl bg-Neutral-700 animate-pulse"></div>                     
                        <div className="w-[100px] h-[165px] rounded-xl bg-Neutral-700 animate-pulse"></div>                     
                        <div className="w-[100px] h-[165px] rounded-xl bg-Neutral-700 animate-pulse"></div>                     
                        <div className="w-[100px] h-[165px] rounded-xl bg-Neutral-700 animate-pulse"></div>                     
                        <div className="w-[100px] h-[165px] rounded-xl bg-Neutral-700 animate-pulse"></div>                     
                        <div className="w-[100px] h-[165px] rounded-xl bg-Neutral-700 animate-pulse"></div>                     
                    </div>
                </div>
            </section>
            <section className="bg-Neutral-800 rounded-[20px] px-4 py-5 flex flex-col gap-4 sm:p-6 lg:w-[384px] lg:grow">
                <div className="flex items-center justify-between">
                    <h4 className="text-preset-5 text-Neutral-0">Hourly forecast</h4>
                    <button className="bg-Neutral-600 rounded-lg flex items-center px-4 py-2 gap-3">
                        <span>&mdash;</span>    
                        <img src={dropdown} alt="" />
                    </button>    
                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                    <div className="bg-Neutral-700 rounded-lg w-full h-[60px] animate-pulse"></div>
                </div>                        
            </section>
        </div>
    )
}