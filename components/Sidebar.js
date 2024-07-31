"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaSignOutAlt, FaCog, FaChevronLeft, FaChevronRight, FaBox, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import adminProfile from '../public/admin-profile.png';

const supabase = createClientComponentClient();

const Sidebar = () => {
  const [shipments, setShipments] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchShipments();
    fetchUser();
  }, []);

  const fetchShipments = async () => {
    const { data, error } = await supabase.from('shipments').select('*');
    if (!error) setShipments(data);
  };

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <aside
      className={`flex flex-col p-4 border-r border-gray-700 bg-gray-800 text-white h-screen transition-width duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <>
              <FaUser className="text-xl" />
              <h2 className="font-bold text-xl whitespace-nowrap">Shipment Details</h2>
            </>
          )}
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-300 hover:text-gray-500">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      
      <button
        className="flex items-center justify-between w-full p-2 text-gray-300 hover:bg-gray-700 rounded mb-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <FaBox className="text-xl" />
          {!isCollapsed && <span className="text-lg">Shipments</span>}
        </div>
      </button>
      <ul className={`transition-opacity duration-300 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        {shipments.map((shipment) => (
          <li
            key={shipment.id}
            className="p-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
            onClick={() => router.push(`/dashboard/${shipment.id}`)}
          >
            <FaBox className="text-lg" />
            {!isCollapsed && <span>{shipment.tracking_number}</span>}
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <button
          onClick={toggleProfileVisibility}
          className="flex items-center gap-2 p-2 text-gray-300 hover:bg-gray-700 rounded w-full mt-2"
        >
          <FaCog className="text-xl" />
          <span>Profile</span>
        </button>
        
        {/* Profile section */}
        <div
          className={`transition-all duration-500 ease-in-out ${isProfileVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="flex my-2 cursor-pointer justify-between items-center p-2 bg-gray-700 rounded">
            <div className="flex gap-2 items-center">
              <Image src={adminProfile} className="h-10 w-10 rounded-full" alt="Admin Profile" />
              <div>
                <h3 className="text-[.87rem] font-bold">Admin Name</h3>
                <h4 className="text-[.7rem] font-light">adminname@gmail.com</h4>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-300"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
