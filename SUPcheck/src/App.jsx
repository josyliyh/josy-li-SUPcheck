import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Locations from './pages/Locations/Locations'
import SingleLocation from "./pages/SingleLocation/SingleLocation"
import Nav from "./components/Nav/Nav"
import "./styles/global.scss"

function App() {


  return (
 <BrowserRouter>
 <Nav/>
 <Routes>
 <Route path="/" element={<Locations />} /> 
 <Route path="/:id" element={<SingleLocation />} /> 

 </Routes>
 </BrowserRouter>
  )
}

export default App
