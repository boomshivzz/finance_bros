import { Inertia } from '@inertiajs/inertia';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (!user) {
    Inertia.visit('/login');
    return null;
  }
  return children;
}
