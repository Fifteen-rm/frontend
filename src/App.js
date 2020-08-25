import React, { Component } from 'react';
import logo from './logo.svg';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import './App.css';


class App extends React.Component {

  async componentDidMount() {

    try {
      let res = await fetch('/isLoggedIn', { 
        method: 'post',
        headers: {
          'Accpet': 'application/json',
          'Content-type': 'application/json'
        }
      
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  render() {
    return (
      <div className="app">
        안녕하세요!
        </div>
    )
  }
}

export default App;
