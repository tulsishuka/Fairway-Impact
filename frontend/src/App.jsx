import React from 'react'
import Navbar from './layouts/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Verify from './components/Verify';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Subscription from './pages/Subscription';
import Charity from './components/Charity';
import DashBoard from './pages/DashBoard';
import Score from './components/Score';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminScores from './pages/admin/AdminScores';
import AdminDraw from './pages/admin/AdminDraw';
import AdminWinners from './pages/admin/AdminWinners';
import AdminCharities from './pages/admin/AdminCharities';

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
            <Route path="/Charity" element={<Charity />} />
                        <Route path="/Scores" element={<Score />} />
 <Route path="/admin" element={<AdminLayout />}>

      <Route index element={<Dashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="scores" element={<AdminScores />} />
      <Route path="draw" element={<AdminDraw />} />
      <Route path="winners" element={<AdminWinners />} />
      <Route path="charities" element={<AdminCharities />} />

    </Route>
      </Routes>
    
    </>
  )
}

export default App

