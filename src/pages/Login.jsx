import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import GoogleLogo from '../assets/google-icon.svg';
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };
  
  const handlePasswordReset = async () => {
    if (!email) {
      alert('Please enter your email first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
    } catch (err) {
      alert(err.message);
    }
  };
    
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to your account</h2>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
        <img src={GoogleLogo} alt="Google" className="google-icon" />
         Continue with Google
        </button>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />        
        <label className="remember-label">
         <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
         />
         Remember me
        </label>
        <p className="login-link" onClick={handlePasswordReset} style={{ cursor: 'pointer' }}>
            Forgot password?
        </p>
        <button className="login-button" onClick={handleLogin}>Login</button>
        <Link to="/" className="login-link">← Back to Home</Link>
      </div>
    </div>
  );
}

