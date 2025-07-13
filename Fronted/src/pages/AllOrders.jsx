import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader/Loader';
import { FaUser } from 'react-icons/fa';

function AllOrders() {
  const [allOrders, setAllOrders] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const headers = {
    id: localStorage.getItem('id'),
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/get-all-orders', { headers });
        setAllOrders(response.data.orders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetch();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3002/api/v1/update-order-status/${orderId}`, { status: newStatus }, { headers });
      setAllOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <>
      {!allOrders ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : allOrders.length > 0 ? (
        <div className="min-h-screen bg-zinc-900 px-6 py-8 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 font-bold border-b border-zinc-700">
            <div className="w-[5%] text-center">#</div>
            <div className="w-[20%]">User</div>
            <div className="w-[35%]">Book(s)</div>
            <div className="w-[10%] text-center">Total</div>
            <div className="w-[15%] text-center">Status</div>
            <div className="w-[5%] text-center">Info</div>
          </div>

          {allOrders.map((order, i) => (
            <div
              key={order._id}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 my-2 border border-zinc-700"
            >
              <div className="w-[5%] text-center">{i + 1}</div>
              <div className="w-[20%]">{order.user?.name || 'Unknown'}</div>
              <div className="w-[35%] text-sm text-zinc-300">
                {order.books.map((book) => (
                  <div key={book._id} className="mb-2">
                    <p className="font-semibold text-white">{book.title}</p>
                    <p className="text-zinc-400 text-sm">{book.description}</p>
                    <p className="text-zinc-400 text-xs">Lang: {book.language}</p>
                    <p className="text-green-400">₹{book.price}</p>
                    <hr className="my-1 border-zinc-600" />
                  </div>
                ))}
              </div>
              <div className="w-[10%] text-center">₹{order.totalAmount}</div>
              <div className="w-[15%] text-center">
                <select
  value={order.status}
  onChange={(e) => handleStatusChange(order._id, e.target.value)}
  className={`px-2 py-1 rounded text-sm font-semibold transition duration-300
    ${
      order.status === "Placed"
        ? "bg-yellow-500 text-black"
        : order.status === "Delivered"
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
    }`}
>
  <option value="Placed" className="bg-zinc-900 text-white">Placed</option>
  <option value="Delivered" className="bg-zinc-900 text-white">Delivered</option>
  <option value="Cancelled" className="bg-zinc-900 text-white">Cancelled</option>
</select>

         
              </div>
              <div className="w-[5%] flex justify-center">
                <button onClick={() => handleViewUser(order.user)}>
                  <FaUser className="text-blue-400 hover:text-blue-600 text-lg" />
                </button>
              </div>
            </div>
          ))}

          {showModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white text-black rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {selectedUser.address || 'N/A'}</p>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-white">
          No orders found.
        </div>
      )}
    </>
  );
}

export default AllOrders;
