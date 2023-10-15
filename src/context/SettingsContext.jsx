import { createContext } from "react";

const SettingsContext = createContext();


export const SettingsContextProvider = ({children}) => {

    return ( 

        <SettingsContext.Provider>
            { children }
        </SettingsContext.Provider>

     );
}
 
