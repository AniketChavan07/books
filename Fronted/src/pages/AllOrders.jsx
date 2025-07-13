import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader/Loader';

function AllOrders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/get-all-orders', {
          headers,
        });
        setOrders(response.data.orders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Something went wrong while fetching orders');
      }
    };
    fetch();
  }, []);

  if (!orders && !error) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900 text-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">All Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-400">No orders found.</div>
      ) : (
        <div className="space-y-10 max-w-5xl mx-auto">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700"
            >
              <h2 className="text-2xl font-semibold mb-4">Order #{index + 1}</h2>
              
              {order.books.map((book, i) => (
                <div key={book._id || i} className="bg-zinc-700 rounded-lg p-4 mb-4">
                  <p><span className="font-semibold text-gray-300">Title:</span> {book.title}</p>
                  <p><span className="font-semibold text-gray-300">Author:</span> {book.author}</p>
                  <p><span className="font-semibold text-gray-300">Description:</span> {book.description}</p>
                  <p><span className="font-semibold text-gray-300">Language:</span> {book.language}</p>
                  <p><span className="font-semibold text-gray-300">Price:</span> ₹{book.price}</p>
                </div>
              ))}

              <div className="mt-2">
                <p><span className="font-semibold text-gray-300">Total Amount:</span> ₹{order.totalAmount}</p>
                <p><span className="font-semibold text-gray-300">Status:</span> {order.status}</p>
                <p><span className="font-semibold text-gray-300">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrders;
