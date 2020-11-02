import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: 2,
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    lineHeight: 2,
  },
  loginstate: {
    textAlign: 'right',
  },
  logoutbutton: {
    '& > *': {
    },
  },
}));

const MeetPlace = ({ roomName, token }) => {
  const part = window.sessionStorage.getItem('part');
  const name = window.sessionStorage.getItem('name');

  const [user, setUser] = useState(null);
  const logout = () => setUser(null);

  const history = useHistory();

  const logoutClick = () => {
    logout()
    history.push('/')
  }

  const classes = useStyles();
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <Box align="center">
      <Box padding={15} width="1150px">
        <Box className={classes.root} display="flex" justifyContent="center">
          <Box width={2 / 10} bgcolor="rgb(68, 114, 196)" color="white" fontSize="1.5rem" className={classes.box}>
            진료실
        </Box>
          <Box width={6 / 10} className={classes.loginstate}>
            {name}님 로그인됨　|　<Button className={classes.logoutbutton} onClick={logoutClick} color="blue">로그아웃</Button>
          </Box>
        </Box>

        <Box className={classes.root} display="flex" justifyContent="center">
          <Box width={8 / 10} border={2} borderColor="rgb(68, 114, 196)">
            <h2>Room: {roomName}</h2>
            <Box margin={5} border={2} borderColor="rgb(68, 114, 196)" style={{ position: 'relative', zIndex: 2 }}>
              <h3>{part} 전문의 김덕배</h3>
              <Box className="remote-participants">{remoteParticipants}</Box>
            </Box>
            <Box width="20%" height="15%" border={2} borderColor="rgb(68, 114, 196)" style={{ position: 'relative', zIndex: 1, top: '-300px', left: '300px' }} >
              <h3>{name}님</h3>
              <Box className="local-participant">
                {room ? (
                  <Participant
                    key={room.localParticipant.sid}
                    participant={room.localParticipant}
                  />
                ) : (
                    ''
                  )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MeetPlace;
