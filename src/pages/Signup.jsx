import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import './Signup.css';
import GoogleLogo from '../assets/google-icon.svg';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Inertia.visit('/dashboard');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Your account already exists. Try logging in instead.');
      } else {
        alert(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      Inertia.visit('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Your Account</h2>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
        <img src={GoogleLogo} alt="Google" className="google-icon" />
         Continue with Google
        </button>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="signup-button" onClick={handleSignup}>Sign Up</button>
        <Link href="/" className="signup-link">← Back to Home</Link>
      </div>
    </div>
  );
}
