import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DoctorLogin from "../Screens/Doctor/Login";
import PatientLogin from "../Screens/Patient/Login";
import Header from "./Header";

export default () => (
  <Router>
    <Header />
    <Route path="/doctor/login" component={DoctorLogin} />
    <Route path="/patient/login" component={PatientLogin} />
  </Router>
)