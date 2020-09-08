import React, { Component } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { PatientLogin, PatientService } from '..';
import ChoiceLoginType from 'components/ChoiceLoginType';
import * as path from 'Utils/path';
class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={ChoiceLoginType} />
          <Switch>
            <Route path={path.PATIENT_LOGIN} component={PatientLogin} />
            <Route path={path.PATIENT_SERVICE} component={PatientService} />
          </Switch>          
        </Router>
      </div>
    );
  }
}

export default App;