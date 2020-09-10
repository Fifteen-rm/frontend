import * as api from '../../Utils/api';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MeetPlace from './MeetPlace';

function WaitingRoom(props) {
  const [token, setToken] = useState(null);
  useEffect(() => {
      async function getToken() {
        const {data} = await axios({
            method: 'post',
            url: api.WEB_RTC_TOKEN, 
            data: {
            identity: props.identity,
            room: props.room
          },
          headers: {
            'Content-Type': 'application/json'
          }})
          setToken(data.token);
      }
      getToken();
      console.log('end')
  }, []);
  
  let render;
  if (token) {
    render = (
      <MeetPlace roomName={"1234"} token={token}/>
    );
  } else {
    render = (
      <h1>Failed to load meeting room</h1>
    );
  }
  return render;
}

export default WaitingRoom