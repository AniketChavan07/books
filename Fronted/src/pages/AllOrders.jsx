import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const adminId = localStorage.getItem('id');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/v1/get-all-orders', {
          headers: {
            id: adminId,
            authorization: `Bearer ${token}`
          }
        });
        setOrders(res.data.orders); // ✅ Fix this line
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, adminId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, i) => (
            <div
              key={order._id || i}
              className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">Order #{i + 1}</h2>
              <p><span className="font-semibold text-gray-300">User:</span> {order.user?.email || 'N/A'}</p>
              <p><span className="font-semibold text-gray-300">Book:</span> {order.book?.title || 'N/A'}</p>
              <p><span className="font-semibold text-gray-300">Price:</span> ₹{order.book?.price || 'N/A'}</p>
              <p><span className="font-semibold text-gray-300">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
