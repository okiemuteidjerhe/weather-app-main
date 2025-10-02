import { createContext, useEffect, useState } from "react";

/*Creating unit context*/
export const UnitContext = createContext(null);

/*Creating the provider component*/
export default function UnitContextProvider(props){

    /*Setting initial value of unit state based on if there is a saved unit. For first time users, it is set to metric */
    const [unit, setUnit] = useState(() => {
        const savedUnit = localStorage.getItem('unit');
        return savedUnit || 'metric' 
    });

    /*For every time unit changes, save in localStorage. */
    useEffect(() => {
        localStorage.setItem('unit', unit);
    }, [unit])

    return(
        <UnitContext value={{unit, setUnit}}>
            {props.children}
        </UnitContext>
    )
}