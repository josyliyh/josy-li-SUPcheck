import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Locations from './pages/Locations/Locations'
import SingleLocation from "./pages/SingleLocation/SingleLocation"
import Nav from "./components/Nav/Nav"
import "./styles/global.scss"
import Footer from "./components/Footer/Footer"

function App() {

  useEffect(() => {
    
    document.title = 'SUPcheck';

  }, []);

  return (
 <BrowserRouter>
 <Nav/>
 <Routes>
 <Route path="/" element={<Locations />} /> 
 <Route path="/:id" element={<SingleLocation />} /> 

 </Routes>
 <Footer/>
 </BrowserRouter>
  )
}

export default App
