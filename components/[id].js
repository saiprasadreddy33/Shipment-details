import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Spinner from './Spinner';

const supabase = createClientComponentClient();

const ShipmentDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchShipment();
    }
  }, [id]);

  const fetchShipment = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('shipments').select('*').eq('id', id).single();
    if (!error) {
      setShipment(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!shipment) {
    return <div>Shipment not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Shipment Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="font-medium">Tracking Number:</label>
          <p className="text-gray-700">{shipment.tracking_number}</p>
        </div>
        <div className="col-span-1">
          <label className="font-medium">Customer Name:</label>
          <p className="text-gray-700">{shipment.customer_name}</p>
        </div>
        <div className="col-span-1">
          <label className="font-medium">Invoice Number:</label>
          <p className="text-gray-700">{shipment.invoice_number}</p>
        </div>
        <div className="col-span-1">
          <label className="font-medium">Customer Number:</label>
          <p className="text-gray-700">{shipment.customer_number}</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
