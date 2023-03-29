import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-durfkh7l673gjixp.us.auth0.com"
    clientId="qNGqhMoULtqDgCWf8iqnKJGUkcItVIfG"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
    <App />
   </React.StrictMode>
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
