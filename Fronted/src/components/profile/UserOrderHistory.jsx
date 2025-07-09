import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../loader/Loader";

function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/v1/get-order`, {
          headers,
        });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 px-6 py-8 text-white">
      <h1 className="text-3xl font-semibold text-center mb-6">Your Order History</h1>

      {orderHistory.length > 0 ? (
        <div className="space-y-4">
          {orderHistory.map((order, index) => (
            <div
              key={index}
              className="border border-zinc-700 p-4 rounded-md bg-zinc-800"
            >
              <p className="text-lg font-medium">Order ID: {order._id}</p>
              <p className="text-gray-400">Total Books: {order.books.length}</p>
              <p className="text-gray-400">Ordered On: {new Date(order.createdAt).toLocaleDateString()}</p>
              {/* List of books */}
              <ul className="mt-2 list-disc list-inside text-gray-300">
                {order.books.map((book, i) => (
                  <li key={i}>{book.title} by {book.author} - ₹{book.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mt-20">
          No order history available.
        </div>
      )}
    </div>
  );
}

export default UserOrderHistory;
