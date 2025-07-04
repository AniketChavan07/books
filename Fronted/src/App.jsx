import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import RecentlyAdd from './components/home/RecentlyAdd'

export default function App() {
  return (
    <div>
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={<h1>All Books Page</h1>} />
        <Route path="/cart" element={<h1>Cart Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/signup" element={<h1>Sign Up Page</h1>} />
      </Routes>
      <Footer />

        </Router>

    </div>
  )
}
