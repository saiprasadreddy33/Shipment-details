"use client";
import ShipmentTable from '../../components/ShipmentTable';
import ShipmentDetails from '../../components/ShipmentDetails';
import SideBar from '@/components/Sidebar';
import { useState } from 'react';

export default function DashboardPage() {
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="w-full flex-1 overflow-y-auto p-4">
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-full flex">
              <div className="flex-1 overflow-x-auto">
                <ShipmentTable onSelectShipment={setSelectedShipmentId} />
                {selectedShipmentId && <ShipmentDetails shipmentId={selectedShipmentId} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
