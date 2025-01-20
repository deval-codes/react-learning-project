import { createContext, ReactNode, useContext } from "react";
import { AppData } from "../App";

export interface AppContextProviderProps {
    value: AppData,
    children: ReactNode
  }
  
  
  export const AppContext = createContext<AppData | undefined>(undefined);
  
  
  export const useAppContext = () => {
    const appContext = useContext(AppContext);
    if (appContext === undefined) {
      throw new Error("It expects App data")
    };
    return appContext;
  }
  
  export const AppContextProvider = ({ value, children }: AppContextProviderProps) => {
    return <AppContext.Provider value={value}>
                  {children}
            </AppContext.Provider>
  }
  