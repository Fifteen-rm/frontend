import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'shared/App';
import * as serviceWorker from './serviceWorker';
import Root from 'client/Root';

ReactDOM.render(<Root />, document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { default as PatientLogin } from './pages/PatientLogin';
export { default as PatientService } from './pages/PatientService';