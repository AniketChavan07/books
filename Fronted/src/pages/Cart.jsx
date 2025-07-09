import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../components/BookCard/Bookcard';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetch cart
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/v1/get-cart-book", { headers });
      setCartItems(response.data.cart);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  // Remove book from cart
  const handleRemoveFromCart = async (bookId) => {
    try {
      await axios.put(`http://localhost:3002/api/v1/delete-book-cart/${bookId}`, {}, { headers });
      fetchCart(); // Refresh after deletion
    } catch (error) {
      console.error("Failed to remove book from cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 px-4 md:px-12 py-8">
      <h1 className="text-3xl text-white font-semibold mb-8 text-center border-b border-zinc-700 pb-4">
        Your Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item, i) => (
            <Bookcard key={i} data={item} cart="true" onRemove={handleRemoveFromCart} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mt-20">
          Your cart is empty. Start adding books to enjoy reading!
        </div>
      )}
    </div>
  );
}

export default Cart;
