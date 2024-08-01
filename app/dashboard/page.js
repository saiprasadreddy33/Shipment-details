"use client"
import { useState } from 'react';
import Layout from '@/components/Layout';
import Sidebar from '@/components/Sidebar';
import ShipmentDetails from '@/components/[id]';
import ShipmentTable from '@/components/ShipmentTable';
import '@/styles/globals.css'

const Dashboard = () => {
  const [selectedShipment, setSelectedShipment] = useState(null);

  return (
    <Layout>
      <div className="h-screen w-full flex">
        <Sidebar onSelectShipment={setSelectedShipment} />
        <div className="w-full h-auto overflow-x-auto">
          {selectedShipment ? (
            <ShipmentDetails shipmentId={selectedShipment} />
          ) : (
            <ShipmentTable onSelectShipment={setSelectedShipment} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
