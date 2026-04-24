import React from 'react'
import Navbar from './layouts/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Verify from './components/Verify';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Subscription from './pages/Subscription';
import DashBoard from './components/DashBoard';
const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/Subscription" element={<Subscription />} />
            <Route path="/Dashboard" element={<DashBoard />} />

      </Routes>
    
    </>
  )
}

export default App

