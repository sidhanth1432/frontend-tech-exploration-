import WordCloud from "./WordCloud"
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify';
import Register from "./Register";
import Chart from "./Chart";
import Users from "./Users";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./Header";
import CountryPopJqgrid from "./CountryPopJqgrid"
import CsvUpDown from "./CsvUpDown";
import DragNDrop from "./DragNDrop"
import Maps from "./Maps";
import Heatmap from './Heatmap'
import DrillDownJqgrid from './DrillDownJqgrid'
import IndiaCovidMap from './IndiaCovidMap'
const App = () =>{


  return(
    
    <Router>
      <Header />
      <ToastContainer />
    <Routes>
    <Route path='/reg' element={<Register />} />
    <Route path='/chart' element={<Chart />} />
     
      <Route path='/maps' element={<Maps />} />    

    <Route path='/drilldownjqgrid' element={<DrillDownJqgrid />} />
    <Route path='/heatmap' element={<Heatmap />} />
    
    <Route path='/reg/:id' element={<Register />} />
    <Route path='/' element={<Users />} />
    <Route path='/wordCloud' element={<WordCloud />} />
    <Route path='/countryPop' element={<CountryPopJqgrid />} />
    <Route path='/csvUpDown' element={<CsvUpDown />} />
    <Route path='/dragNdrop' element={<DragNDrop />} />
    
    <Route path='/indiacovidMap' element={<IndiaCovidMap />} />
    </Routes>
     </Router>

  )
}


export default App;


