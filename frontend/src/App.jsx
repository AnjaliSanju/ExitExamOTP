
import { Route, Routes } from 'react-router-dom'
import GenerateOtp from "./components/GenerateOtp"

import './App.css'
import Home from './components/Home'
import VerifyOtp from './components/VerifyOtp'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<GenerateOtp/>}></Route>
      <Route path='/VerifyOtp' element={<VerifyOtp/>}></Route>
      <Route path='/home' element={<Home/>}></Route>

      </Routes>
    </>
  )
}

export default App
