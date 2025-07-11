import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';

function Setting() {
  const [value, setValue] = useState({ address: '' });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3002/api/v1/get-user-information',
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Handle update
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        'http://localhost:3002/api/v1/update-address',
        { address: value.address },
        { headers }
      );
      setMessage('Address updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!profileData ? (
        <div className=" flex items-center justify-center bg-zinc-900 ">

          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-zinc-900 p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400 mb-8">
            Settings
          </h1>

          <div className="bg-zinc-800 p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium">Name</label>
              <p className="p-2 rounded bg-zinc-700 text-sm font-semibold">
                {profileData.name}
              </p>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium">Email</label>
              <p className="p-2 rounded bg-zinc-700 text-sm font-semibold">
                {profileData.email}
              </p>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium">Address</label>
              <textarea
                className="w-full p-2 rounded bg-zinc-700 text-sm font-semibold resize-none outline-none focus:ring-2 focus:ring-yellow-400"
                rows="3"
                placeholder="Enter your address"
                name="address"
                value={value.address}
                onChange={(e) => setValue({ address: e.target.value })}
              />
            </div>

            {/* Update Button */}
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-semibold px-4 py-2 rounded transition duration-300"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>

            {/* Message */}
            {message && (
              <p className="mt-4 text-sm text-green-400 font-medium">{message}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Setting;
