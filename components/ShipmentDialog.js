"use client";
import { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const ShipmentDialog = ({ open, onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('shipments')
      .insert([{ tracking_number: trackingNumber, customer_name: customerName, invoice_number: invoiceNumber, customer_number: customerNumber }]);
    
    if (error) {
      setError(error.message);
    } else {
      onClose();
    }

    setIsSaving(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Shipment</h2>
        <input 
          type="text" 
          value={trackingNumber} 
          onChange={(e) => setTrackingNumber(e.target.value)} 
          placeholder="Tracking Number" 
          className="border p-2 rounded w-full mb-2" 
        />
        <input 
          type="text" 
          value={customerName} 
          onChange={(e) => setCustomerName(e.target.value)} 
          placeholder="Customer Name" 
          className="border p-2 rounded w-full mb-2" 
        />
        <input 
          type="text" 
          value={invoiceNumber} 
          onChange={(e) => setInvoiceNumber(e.target.value)} 
          placeholder="Invoice Number" 
          className="border p-2 rounded w-full mb-2" 
        />
        <input 
          type="text" 
          value={customerNumber} 
          onChange={(e) => setCustomerNumber(e.target.value)} 
          placeholder="Customer Number" 
          className="border p-2 rounded w-full mb-4" 
        />
        <button onClick={handleSave} disabled={isSaving} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ShipmentDialog;
