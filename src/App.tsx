import './App.css';
import Body from './components/Body';
import Header from './components/Header';


export interface AppData {
  "userName": string,
  "companyName": string
}



function App() {



  
  return (
    <div className="App">
        <Header  companyName="My Company" members={20} />

        <Body />
       
   
      {/* <Hooks /> */}
    </div>
  );
}

export default App;
