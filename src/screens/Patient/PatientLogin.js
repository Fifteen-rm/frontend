import React, { useState, Component } from "react"
import { signIn } from 'components/auth';
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

import KaKaoLogin from 'react-kakao-login';
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
const KaKaoBtn = styled(KaKaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,]}
      placeholderChar={'\u2000'}
      showMask
    />);
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


export default function PatientLogin(location) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    textmask: '      -       ',
  });
  const authenticated = user != null;
  const login = ({ name, idnumber }) => setUser(signIn({ name, idnumber }));

  const [name, setName] = useState("")
  const [idnumber, setIDNumber] = useState("")

  window.sessionStorage.setItem('name', name);

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
      login({ name, idnumber })
    } catch (e) {
      alert("일치하는 정보가 없습니다. 다시 입력 해주세요.")
      setName("")
      setIDNumber("")
    }
  }

  const KakaoLoginButton = styled(Button) ({
    background: 'rgb(254, 229, 0)',
    color: 'black',
    variant: 'contained',
    fontSize: '1.2rem',
    tex: 10,
    height: 45,
    width: 200,
    margin: 5,
  });

  const kakaoLoginClick = () => {
    let kakao_url = process.env.NODE_ENV === 'prod'
      ? process.env.HOST_URL
      : "http://127.0.0.1:10637/authenticate/kakao/login/"
    window.open(kakao_url, '', 'width=400,height=600,location=no,status=no,scrollbars=yes');
  };
  const responseKaKao = (res) => {
    console.log(res)
  }

  const responseFail = (err) => {
    alert(JSON.stringify(err));
  }

  // const kakaoLoginClick = () => {
  
  //   var loginForm = window.open(loginPopup, "kakao_oauth", "width=800, height=600");
  //   // loginForm.addEventListener("message", receiveMessage, false);
  //   //process.env.REACT_APP_KAKAO_HOST_URL
    
  // };  



  if (authenticated) return <Redirect to={{ pathname: path.PATIENT_SERVICE, state: { user: user } }} />

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
        <Box width={2 / 10} bgcolor="rgb(68, 114, 196)" color="white" fontSize="1.5rem" className={classes.box}>
          환자 로그인
        </Box>
        <Box width={6 / 10}>
          {/*로그인 상태*/}
        </Box>
      </Box>

      <Box className={classes.root} display="flex" justifyContent="center">
        <Box width={8 / 10} display="flex" border={2} borderColor="rgb(68, 114, 196)">
          <Box width={5 / 10} paddingLeft={10} paddingY={5}>
            <img src="/images/patientlogin.png" width='80%' />
          </Box>
          <Box width={5 / 10} textAlign="center" padding={5}b order={1} borderColor="black" marginLeft={5} marginRight={10}>
            <Box padding={1}>
              <TextField
                margin="dense"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                type="text"
                label="이름"
              />
              </Box>
              <Box padding={1}>
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">주민등록번호</InputLabel>
                <Input
                  value={idnumber}
                  name="textmask"
                  inputComponent={TextMaskCustom}
                  onChange={handleChange, ({ target: { value } }) => setIDNumber(value)}
                  onKeyPress={appKeyPress}
                />
              </FormControl>
              </Box>
              <Box padding={1}>
              <LoginButton onClick={loginClick}>로그인</LoginButton>
              <KakaoLoginButton onClick={kakaoLoginClick} startIcon={<ChatBubbleIcon/>} >카카오톡 로그인</KakaoLoginButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}