"use client";
import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const ShipmentDetails = ({ shipmentId }) => {
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    fetchShipment();
  }, [shipmentId]);

  const fetchShipment = async () => {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', shipmentId)
      .single();
    if (!error) setShipment(data);
  };

  return (
    <div>
      {shipment ? (
        <div>
          <h2>Shipment Details</h2>
          <p><strong>Tracking Number:</strong> {shipment.tracking_number}</p>
          <p><strong>Customer Name:</strong> {shipment.customer_name}</p>
          <p><strong>Invoice Number:</strong> {shipment.invoice_number}</p>
          <p><strong>Customer Number:</strong> {shipment.customer_number}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {isEditing && (
            <ShipmentForm 
              shipment={shipment} 
              onSave={(updatedShipment) => {
                setShipment(updatedShipment);
                setIsEditing(false);
              }} 
              onCancel={() => setIsEditing(false)}
            />
          )}
        </div>
      ) : (
        <p>Loading shipment details...</p>
      )}
    </div>
  );
};

export default ShipmentDetails;