import {BrowserRouter, Route, Routes} from "react-router-dom"; 
import logo from './logo.svg';
import './App.css';
import About from './components/common/About'
import UserPage from './components/user'
// import EditInstances from "./components/user/Edit Instances/index";
import Login from "./components/common/Login"
import { useState } from "react";

function App() {
  const [loader,setLoader]= useState(false);
  // fetch("/api/fresh").then(response => response.text())
  // .then(data => console.log({data}));
  //research
  return (
    <BrowserRouter>
    {loader?"LOADING":
    <Routes>
      {/* <Route path="/" element={<Layout/>}> */}
        
        <Route index element={<About/>}/>
        {/* sign up/in-baloon OR link of dashboard-baloon */}

        <Route path="login" element={<Login/>}/>
        
        <Route path="user-page/*" element={<UserPage setLoader={setLoader}/>} />
        {/* navigation page + createFresh + edit username */}

      {/* </Route> */}
    </Routes>
}
    </BrowserRouter>
  );
};

export default App;
