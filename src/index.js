import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './css/normalize.css';/* Provides better cross-browser consistency in the default styling of HTML elements */
import './css/app.css'; /* Multiple Pseudo-selectors in styled-components is not working properly, So i end up using an external css just for styling the radio input button */
import './css/modernizr-custom.css'; /* A fallback with border width to compensate for lack of any shadow for all the unsupported browsers.*/ 

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
