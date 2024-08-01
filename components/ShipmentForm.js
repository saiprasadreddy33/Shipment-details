"use client";

import { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const ShipmentForm = ({ shipment, setShipment, onSave }) => {
  const [trackingNumber, setTrackingNumber] = useState(shipment?.tracking_number || '');
  const [customerName, setCustomerName] = useState(shipment?.customer_name || '');
  const [invoiceNumber, setInvoiceNumber] = useState(shipment?.invoice_number || '');
  const [customerNumber, setCustomerNumber] = useState(shipment?.customer_number || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    const { data: { user }, error: authError } = await supabase.auth.getUser(); // Get current user

    if (!authError && user) {
      const { error } = await supabase
        .from('shipments')
        .upsert({
          id: shipment?.id,
          tracking_number: trackingNumber,
          customer_name: customerName,
          invoice_number: invoiceNumber,
          customer_number: customerNumber,
          user_id: user.id // Set user_id
        });

      if (error) {
        setError(error.message);
      } else {
        onSave(); // Notify parent component on save
        setShipment(null);
        alert('Shipment saved successfully!'); // Custom alert message
      }
    } else {
      setError(authError.message);
    }

    setIsSaving(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Tracking Number"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          placeholder="Invoice Number"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          placeholder="Customer Number"
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShipment(null)}
          className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 text-white rounded-md ${isSaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ShipmentForm;
