import { createContext, useEffect, useState } from "react";

export const UnitContext = createContext(null);

export default function UnitContextProvider(props){
    const [unit, setUnit] = useState(() => {
        const savedUnit = localStorage.getItem('unit');
        return savedUnit || 'metric' 
    });

    useEffect(() => {
        localStorage.setItem('unit', unit);
    }, [unit])

    return(
        <UnitContext value={{unit, setUnit}}>
            {props.children}
        </UnitContext>
    )
}