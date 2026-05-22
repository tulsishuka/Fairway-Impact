import React from 'react'
import Navbar from './layouts/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Verify from './components/Verify';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Subscription from './pages/Subscription';
// import Charity from './components/Charity';
import DashBoard from './pages/DashBoard';
// import Score from './components/Score';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminScores from './pages/admin/AdminScores';
import AdminDraw from './pages/admin/AdminDraw';
import AdminWinners from './pages/admin/AdminWinners';
import AdminCharities from './pages/admin/AdminCharities';
import About from './pages/About';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './layouts/Footer';
import UserLayout from './pages/user/UserLayout';
import UserDashboard from './pages/user/UserDashboard';
import UserScores from './pages/user/UserScore';
import UserCharities from './pages/user/UserCharity';

import UserCharity from './pages/user/UserCharity';
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
                              <Route path="/UserCharity" element={<UserCharity />} />

                              <Route path="/About" element={<About />} />


 <Route path="/admin" element={<AdminLayout />}>

      <Route index element={<Dashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="scores" element={<AdminScores />} />
      <Route path="draw" element={<AdminDraw />} />
      <Route path="winners" element={<AdminWinners />} />
      <Route path="charities" element={<AdminCharities />} />

    </Route>

 <Route path="/user" element={<UserLayout />}>

      <Route index element={<UserDashboard />} />
   
      <Route path="scores" element={<UserScores />} />
     
      <Route path="charities" element={<UserCharities />} />

    </Route>
   
   
      </Routes>
       <ToastContainer />
       
    </>
  )
}

export default App

