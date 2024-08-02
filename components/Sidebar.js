import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaCog, FaChevronLeft, FaChevronRight, FaBox, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import adminProfile from '../public/admin-profile.png';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const Sidebar = ({ onShipmentsUpdated }) => {
  const [shipments, setShipments] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isShipmentsVisible, setIsShipmentsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchUser();
    }
  }, [mounted]);

  useEffect(() => {
    if (user) {
      fetchShipments();
    }
  }, [user]);

  useEffect(() => {
    if (onShipmentsUpdated) {
      fetchShipments();
    }
  }, [onShipmentsUpdated]);

  const fetchShipments = async () => {
    try {
      const response = await fetch('/api/shipments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Filter  based on the authenticated user's ID
      const userShipments = data.filter(shipment => shipment.user_id === user.id);
      console.log('Fetched shipments:', userShipments);
      setShipments(userShipments);
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    }
  };

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Failed to log out:', error.message);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };
  

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const toggleShipmentsVisibility = async () => {
    if (!isShipmentsVisible) {
      await fetchShipments();
    }
    setIsShipmentsVisible(!isShipmentsVisible);
  };

  const openShipmentModal = (shipment) => {
    setSelectedShipment(shipment);
  };

  const closeShipmentModal = () => {
    setSelectedShipment(null);
  };

  if (!mounted) return null;

  return (
    <aside
      className={`flex flex-col p-2 border justify-between border-gray-1000 bg-slate-600 text-white h-screen transition-width duration-300 ease-in-out ${
        isCollapsed ? 'w-[4.3rem]' : 'w-[270px]'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <>
              <FaUser className="text-2xl" />
              <h2 className="text-[.85rem] font-sans whitespace-nowrap">Shipment Details</h2>
            </>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-black-300 hover:text-grey-500 transition duration-300 p-2"
        >
          {isCollapsed ? <FaChevronRight className="text-2xl" /> : <FaChevronLeft className="text-2xl" />}
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <button
          className="flex items-center justify-between w-full p-3 text-gray-300 hover:bg-gray-700 rounded mb-2 transition duration-300"
          onClick={toggleShipmentsVisibility}
        >
          <div className="flex items-center gap-2">
            <FaBox className="text-2xl" />
            {!isCollapsed && <span className="text-xl font-semibold">Shipments</span>}
            <FaChevronRight className={`text-xl transition-transform ${isShipmentsVisible ? 'rotate-90' : ''}`} />
          </div>
        </button>

        <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${isShipmentsVisible ? 'opacity-100' : 'opacity-0'}`}>
          <ul className="max-h-72 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
            {shipments.map((shipment) => (
              <li
                key={shipment.id}
                className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-2 rounded transition duration-300"
                onClick={() => openShipmentModal(shipment)}
              >
                <FaBox className="text-lg" />
                {!isCollapsed && <span className="font-medium">{shipment.tracking_number}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col mt-auto">
          <button
            onClick={toggleProfileVisibility}
            className="flex items-center gap-2 p-3 text-gray-300 hover:bg-gray-700 rounded w-full mt-2 transition duration-300"
          >
            <FaCog className="text-2xl" />
            <span>Profile</span>
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isProfileVisible ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex my-2 cursor-pointer justify-between items-center p-3 bg-gray-700 rounded">
              <div className="flex gap-3 items-center">
                <Image src={adminProfile} className="h-12 w-12 rounded-full" alt="Admin Profile" />
                <div>
                  <h3 className="text-lg font-bold">{user ? user.email.split('@')[0] : 'Admin Name'}</h3>
                  <h4 className="text-sm font-light">{user ? user.email : 'adminname@gmail.com'}</h4>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-300 transition duration-300 p-2 relative group"
              >
                <FaSignOutAlt className="text-2xl" />
                <span className="absolute left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg w-3/4 max-w-2xl">
            <h2 className="text-2xl mb-4 text-white">Shipment Details</h2>
            <p className="text-white"><strong>ID:</strong> {selectedShipment.id}</p>
            <p className="text-white"><strong>Tracking Number:</strong> {selectedShipment.tracking_number}</p>
            <p className="text-white"><strong>Customer Name:</strong> {selectedShipment.customer_name}</p>
            <p className="text-white"><strong>Invoice Number:</strong> {selectedShipment.invoice_number}</p>
            <p className="text-white"><strong>Customer Number:</strong> {selectedShipment.customer_number}</p>
            <button
              onClick={closeShipmentModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
