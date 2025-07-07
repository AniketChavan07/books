import React, { use } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BookDetails from './components/viewbookdetails/BookDetails'
import { authActions } from './store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (localStorage.getItem('id')
        && localStorage.getItem('token')
        && localStorage.getItem('role'))
         {
      dispatch(authActions.login());
      dispatch(authActions.changeRoleRole(localStorage.getItem('role')));
    
    }
  },[]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={ <AllBooks />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <Footer />

      

    </div>
  )
}
