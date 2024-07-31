import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';

export default function HomePage() {
  return (
    <Layout>
      <h1>Welcome to Shipment Management</h1>
      <AuthForm />
    </Layout>
  );
}
