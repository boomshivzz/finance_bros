import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import './index.css';
import reportWebVitals from './reportWebVitals';

createInertiaApp({
  resolve: name => import(`./pages/${name}`).then(module => module.default),
  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );
  },
  progress: false,
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
