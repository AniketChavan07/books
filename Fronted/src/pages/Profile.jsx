import React, { useEffect, useState } from 'react';
import Sidebar from '../components/profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/loader/Loader';
import MobileView from '../components/profile/MobileView';

function Profile() {
  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/v1/get-user-information", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row min-h-screen py-8 gap-4 text-white ">
      {!profile ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/4">
            <Sidebar data={profile} />
            <MobileView/>
          </div>
          <div className="w-full md:w-3/4">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
