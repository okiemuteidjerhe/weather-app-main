import cancel from '../assets/images/icon-cancel.svg'
import retry from '../assets/images/icon-retry.svg'

export default function ApiError(props) {
    return (
        <div className="flex flex-col items-center gap-6 mt-[64px] pt-10">
            <div className="w-[42px] h-[50px]">
                <img src={cancel} alt="" />
            </div>
            <h2 className="text-preset-2 text-Neutral-0 text-center">Something went wrong</h2>
            <p className="text-preset-5-medium text-Neutral-0 text-center">We couldn’t connect to the server (API error). Please try <br className="hidden sm:block"></br>again in a few moments.</p>
            <button
                className="bg-Neutral-800 px-4 py-3 flex gap-2.5 rounded-lg"
                onClick={props.handleRetry}
            >
                <img src={retry} alt="" />
                <span className="text-preset-7 text-Neutral-0">Retry</span>
            </button>
        </div>
    )
}