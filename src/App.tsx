import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hooks from './components/Hooks';
import { AppContextProvider } from './context/context';



export interface AppData {
  "userName": string,
  "companyName": string
}



function App() {

  const [AppData] = useState<AppData>({
    userName: "Devl",
    companyName: "Enate"
  })

  
  return (
    <div className="App">
      <AppContextProvider value={AppData}>
        <Header companyName="My Company" members={20} />
      </AppContextProvider>
      <Hooks />
    </div>
  );
}

export default App;
