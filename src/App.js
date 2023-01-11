import React from 'react'
import Navbar from './components/Navbar'
import './App.css'
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