import ShipmentDetails from '../../../components/ShipmentDetails';

export default function ShipmentPage({ params }) {
  return <ShipmentDetails shipmentId={params.shipmentId} />;
}
