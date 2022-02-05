import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './context/auth/provider/AuthProvider';
import  authReducer  from './context/auth/reducer/authReducer';
import { initialState } from './context/auth/state/authState';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider authReducer={authReducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
