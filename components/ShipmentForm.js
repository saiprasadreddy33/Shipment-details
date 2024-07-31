"use client";
import { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const ShipmentForm = ({ shipment, onSave, onCancel }) => {
  const [trackingNumber, setTrackingNumber] = useState(shipment.tracking_number);
  const [customerName, setCustomerName] = useState(shipment.customer_name);
  const [invoiceNumber, setInvoiceNumber] = useState(shipment.invoice_number);
  const [customerNumber, setCustomerNumber] = useState(shipment.customer_number);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('shipments')
      .update({ tracking_number: trackingNumber, customer_name: customerName, invoice_number: invoiceNumber, customer_number: customerNumber })
      .eq('id', shipment.id);
    
    if (error) {
      setError(error.message);
    } else {
      onSave({ ...shipment, tracking_number: trackingNumber, customer_name: customerName, invoice_number: invoiceNumber, customer_number: customerNumber });
    }

    setIsSaving(false);
  };

  return (
    <div>
      <input 
        type="text" 
        value={trackingNumber} 
        onChange={(e) => setTrackingNumber(e.target.value)} 
        placeholder="Tracking Number" 
      />
      <input 
        type="text" 
        value={customerName} 
        onChange={(e) => setCustomerName(e.target.value)} 
        placeholder="Customer Name" 
      />
      <input 
        type="text" 
        value={invoiceNumber} 
        onChange={(e) => setInvoiceNumber(e.target.value)} 
        placeholder="Invoice Number" 
      />
      <input 
        type="text" 
        value={customerNumber} 
        onChange={(e) => setCustomerNumber(e.target.value)} 
        placeholder="Customer Number" 
      />
      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      <button onClick={onCancel}>Cancel</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ShipmentForm;
