import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Locations from './pages/Locations/Locations'
import SingleLocation from "./pages/SingleLocation/SingleLocation"
function App() {


  return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Locations />} /> 
 <Route path="/:id" element={<SingleLocation />} /> 

 </Routes>
 </BrowserRouter>
  )
}

export default App
