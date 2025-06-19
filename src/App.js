import { useEffect, React } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import TopFold from './components/TopFold';

function App({ children }) {
  const { url } = usePage();
  const showTopFold = url === '/';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && url === '/login') {
        // User is logged in, redirect to dashboard
        Inertia.visit('/dashboard');
      }
    });

    return () => unsubscribe(); // clean up listener
  }, [url]);

  return (
    <>
      {showTopFold && <TopFold />}
      {children}
    </>
  );
}

export default App;
