import { createContext, useState } from "react";

export const WeatherContext = createContext(null);

export default function WeatherContextProvider(props){
    const [unit, setUnit] = useState("metric");

    return(
        <WeatherContext value={{unit, setUnit}}>
            {props.children}
        </WeatherContext>
    )
}