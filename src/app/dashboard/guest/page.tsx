import DashboardLayout from '@/layouts/dashboard';
import { NextPage } from 'next';

const GuestPage: NextPage = () => {
  return (
    <DashboardLayout>
      {/* Your guest-specific content here */}
      <h1>Welcome, Guest!</h1>
      <p>This is the guest dashboard page.</p>
    </DashboardLayout>
  );
};

export default GuestPage;
