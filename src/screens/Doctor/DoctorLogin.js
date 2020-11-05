
import React, { useState, Component } from "react"
import { dsignIn } from 'components/auth';
import * as path from 'Utils/path';

import { makeStyles, styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom"
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { TrackServerTrackCapacityReachedError } from "twilio-video";

const useStyles = makeStyles((theme) => ({
    box: {
      padding: 2,
      textAlign: 'center',
    },
    root: {
      flexGrow: 1,
      lineHeight: 2,
    },
  }));

export default function DoctorLogin(location){
    const classes = useStyles();
    const[doctor, setDoctor] = useState(null);
    const [values, setValues] = useState("");
    const authenticated = doctor != null;
    const login = ({part,dname, password}) => setDoctor(dsignIn({part,dname, password}));
    const part = "orthopedics"
    const [dname,setDname] = useState("")
    const [password, setPassword] = useState("")

    window.sessionStorage.setItem('doctorid',doctor);

    const LoginButton = styled(Button)({
        background: 'rgb(68, 114, 196)',
        color: 'white',
        variant: 'contained',
        fontSize: '1.2rem',
        tex: 10,
        height: 45,
        width: 200,
        margin: 5,
      });

      const loginClick = () => {
        try {
          login({part, dname, password })
        } catch (e) {
          alert("일치하는 정보가 없습니다. 다시 입력 해주세요.")
          setDname("")
          setPassword("")
        }
      }

      const responseFail = (err) => {
        alert(JSON.stringify(err));
      }

      if (authenticated) return <Redirect to={{ pathname: path.DOCTOR_WAITINGROOM, state: { doctor: doctor } }} />

    const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const appKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginClick();
    }
  }

      return (
        <Box padding={15} width="1200px" alignContent="center">
          <Box className={classes.root} display="flex" justifyContent="center">
            <Box width={2 / 10} bgcolor="rgb(112, 173, 71)" color="white" fontSize="1.5rem" className={classes.box}>
              의료진 로그인
            </Box>
            <Box width={6 / 10}>
              {/*로그인 상태*/}
            </Box>
          </Box>
    
          <Box className={classes.root} display="flex" justifyContent="center">
            <Box width={8 / 10} display="flex" border={2} borderColor="rgb(112, 173, 71)">
              <Box width={5 / 10} paddingLeft={10} paddingY={5}>
                <img src="/images/doctorlogin.png" width='80%' />
              </Box>
              <Box width={5 / 10} textAlign="center" padding={5}b order={1} borderColor="black" marginLeft={5} marginRight={10}>
                <Box padding={1}>
                  <TextField
                    margin="dense"
                    value={dname}
                    onChange={({ target: { value } }) => setDname(value)}
                    type="text"
                    label="ID"
                  />
                  </Box>
                  <Box padding={1}>
                  <FormControl>
                    <InputLabel htmlFor="formatted-text-mask-input">패스워드</InputLabel>
                    <Input
                      value={password}
                      name="textmask"
                      onChange={handleChange, ({ target: { value } }) => setPassword(value)}
                      onKeyPress={appKeyPress}
                    />
                  </FormControl>
                  </Box>
                  <Box padding={1}>
                  <LoginButton onClick={loginClick}>로그인</LoginButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      );
}