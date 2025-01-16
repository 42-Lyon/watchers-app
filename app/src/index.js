import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './components/ui/provider';
import { MeProvider } from './context/useMe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <MeProvider>
        <App />
      </MeProvider>
    </Provider>

  </React.StrictMode>
);

