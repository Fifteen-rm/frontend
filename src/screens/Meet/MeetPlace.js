import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
  const name = window.sessionStorage.getItem('name');
  const part = window.sessionStorage.getItem('part');

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
        <Box display="flex" justifyContent="center">
          <Box width={8 / 10}>
            {/*Room: {roomName}*/}
            <Box margin={5} border={5} borderColor="#000000" style={{ position: 'relative', zIndex: 1 }}>
              <Box className="remote-participants">{remoteParticipants}</Box>
            </Box>
            <Box width="20%" border={5} borderColor="#ffffff" style={{ position: 'relative', zIndex: 2, top: '-200px', left: '525px' }} >
              <Box className="local-participant">
                {room ? (
                  <Participant
                    key={room.localParticipant.sid}
                    participant={room.localParticipant}
                  />
                ) : ('')}
              </Box>
            </Box>
          </Box>
        </Box>
  );
};

export default MeetPlace;
