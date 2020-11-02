import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'shared/App';
import * as serviceWorker from './serviceWorker';
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

export { default as PatientLogin } from './screens/Patient/PatientLogin';
export { default as PatientService } from './screens/Patient/PatientService';
export { default as WaitingRoom } from './screens/Meet/WaitingRoom';
export { default as PatientDiagnosis } from './screens/Patient/PatientDiagnosis';
export { default as PatientRecords } from './screens/Patient/PatientRecords';