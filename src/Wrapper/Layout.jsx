
import logo from '../assets/images/logo.svg'
import gear from '../assets/images/icon-units.svg'
import dropdown from '../assets/images/icon-dropdown.svg'

export default function Layout(props){
    return(
        <>
        <header className='p-4 pb-0 flex justify-between items-center'>
            <div className='w-32'>
                <img src={logo} alt="" className='w-full h-auto object-contain'/>
            </div>
            <button aria-label='Change units settings' className='bg-Neutal-800 rounded-md flex items-center gap-1.5 px-2.5 py-2'>
                <img src={gear} alt="" className='w-3.5 h-3.5'/>
                <span className='text-preset-8'>Units</span>
                <img src={dropdown} alt="" className='w-3.5 h-3.5'/>
            </button>
        </header>

        {props.children}

        <footer className='border-Orange-500 border-t-[0.1px] py-4 mx-4 text-preset-8 text-center text-Neutral-200'>
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