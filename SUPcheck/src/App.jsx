import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Locations from './pages/Locations/Locations'
function App() {


  return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Locations />} /> 

 </Routes>
 </BrowserRouter>
  )
}

export default App
