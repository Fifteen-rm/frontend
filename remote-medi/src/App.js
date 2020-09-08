import React, { useEffect } from 'react';
import Router from  './Components/Route';
import './App.css';
function App() {
  useEffect(() => doRequest(), []);
  return (
    <div className="App">
      <Router/>
    </div>
  );
}


const doRequest = () => {
  console.log('loaded!');
}
export default App;
