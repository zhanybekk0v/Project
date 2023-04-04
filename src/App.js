import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import MainRoutes from './routes/MainRoutes'

const App = () => {
  return (
    <>
      <Navbar />
      <MainRoutes />
    </>
  )
}

export default App