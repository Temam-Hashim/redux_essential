import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import  store  from './redux/store/store';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './index.css';
import "./../node_modules/bootstrap/dist/css/bootstrap.css"
import "./../node_modules/bootstrap/dist/js/bootstrap.js"

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
    </Provider>

);

