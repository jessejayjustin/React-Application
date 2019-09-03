import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './scss/custom.scss';
import './scss/style.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
