"use client";
import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const ShipmentTable = ({ onSelectShipment }) => {
  const [shipments, setShipments] = useState([]);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    const { data, error } = await supabase.from('shipments').select('*');
    if (!error) setShipments(data);
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.tracking_number.includes(filter) || 
    shipment.customer_name.includes(filter) || 
    shipment.invoice_number.includes(filter) ||
    shipment.customer_number.includes(filter)
  );

  return (
    <div>
      <input 
        type="text" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="Filter shipments" 
      />
      <table>
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Customer Name</th>
            <th>Invoice Number</th>
            <th>Customer Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredShipments.map(shipment => (
            <tr key={shipment.id} onClick={() => onSelectShipment(shipment.id)}>
              <td>{shipment.tracking_number}</td>
              <td>{shipment.customer_name}</td>
              <td>{shipment.invoice_number}</td>
              <td>{shipment.customer_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;
