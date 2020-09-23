import React, { Component } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { PatientLogin, PatientService, PatientDiagnosis } from '..';
import ChoiceLoginType from 'components/ChoiceLoginType';
import * as path from 'Utils/path';
import PatientRecords from "../screens/Patient/PatientRecords";
class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={ChoiceLoginType} />
          <Switch>
            <Route path={path.PATIENT_LOGIN} component={PatientLogin} />
            <Route path={path.PATIENT_SERVICE} component={PatientService} />
            <Route path={path.PATIENT_DIAGNOSIS} component={PatientDiagnosis} />
            <Route path={path.PATIENT_RECORDS} component={PatientRecords} />
          </Switch>          
        </Router>
      </div>
    );
  }
}

export default App;