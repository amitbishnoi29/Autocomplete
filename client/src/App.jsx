// import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './pages/Homepage/Homepage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import HotelDetails from './pages/HotelDetails/HotelDetails'
import PlaceDetails from './pages/PlaceDetails/PlaceDetails'

axios.defaults.baseURL = "http://localhost:5000"


function App() {
   
  return (
    <>
      <Header />

      <Router>
        <Routes >
          <Route path="/" element={<Homepage />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
      </Router>
      <Footer />

    </>
  )
}

export default App
