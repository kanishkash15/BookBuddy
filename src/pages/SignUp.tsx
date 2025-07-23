import { Auth } from '@/components/Auth';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
  const { user } = useAuth();

  // If already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
      <Auth />
    </div>
  );
}
