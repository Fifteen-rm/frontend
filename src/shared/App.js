import React, { Component } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { PatientLogin, PatientService } from '..';
import ChoiceLoginType from 'components/ChoiceLoginType';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={ChoiceLoginType} />
          <Switch>
            <Route path="/patientlogin" component={PatientLogin} />
            <Route path="/patientservice" component={PatientService} />
          </Switch>          
        </Router>
      </div>
    );
  }
}

export default App;