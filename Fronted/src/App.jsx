import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

// Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookDetails from './components/viewbookdetails/BookDetails';
import Profile from './pages/Profile';
import AddBook from './pages/AddBook';
import AllOrders from './pages/AllOrders';
import Favourites from './components/profile/Favourites';
import UserOrderHistory from './components/profile/UserOrderHistory';
import Setting from './components/profile/Setting';

export default function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const storedRole = localStorage.getItem('role');

    if (token && id && storedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changeRoleRole(storedRole)); // Ensure this function exists
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:id" element={<BookDetails />} />

        {/* Nested Profile Routes */}
        <Route path="/profile" element={<Profile />}>
          {/* Default route depending on role */}
          {role === 'admin' ? (
            <Route index element={<AllOrders />} />
          ) : (
            <Route index element={<Favourites />} />
          )}

          {/* Admin-only routes */}
          {role === 'admin' && (
            <>
              <Route path="add-book" element={<AddBook />} />
              <Route path="all-order" element={<AllOrders />} />
            </>
          )}

          {/* User-only routes */}
          {role === 'user' && (
            <>
              <Route path="orderHistory" element={<UserOrderHistory />} />
              <Route path="settings" element={<Setting />} />
            </>
          )}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
