import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'
import Navbar from './pages/Navbar'
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/setAvatar" element={<SetAvatar/>}/>
      <Route path="/" element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
  )
}
