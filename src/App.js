import React, { Component } from "react"
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import LoginForm from "./LoginForm"
import PatientService from "./PatientService"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Link to="/patientlogin">
            <button>환자 로그인</button>
          </Link>
          <Route path="/patientlogin" component={LoginForm} />
          <Route path="/patientservice" component={PatientService} />
        </Router>
      </div>
    );
  };
}

export default App;