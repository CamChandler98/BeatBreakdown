import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store';
import * as sessionActions from './store/session'
import * as spotifyActions from './store/spotify'

import './index.css';
import App from './App';

export const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotifyActions = spotifyActions;
} 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
