import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user] = useAuthState(auth);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user?.email} 👋</h2>
      <p>You've successfully logged in to the FinanceBros dashboard.</p>
      <button
        onClick={() => signOut(auth)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#00c27a',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Logout
      </button>
    </div>
  );
} 