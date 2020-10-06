import React, { useState } from "react"
import { signIn } from 'components/auth';
import * as path from 'Utils/path';

import { makeStyles, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom"
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import KaKaoLogin from 'react-kakao-login';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    lineHeight: 2,
    margin: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: 'auto',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    padding: '20px 50px',
  },
  kakao_login_button_img: {
    height: 45,
    width: 135,
    margin: 5,
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

  const LoginButton = styled(Button)({
    background: 'white',
    color: 'skyblue',
    variant: 'contained',
    fontSize: 20,
    tex: 10,
    height: 45,
    width: 135,
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
    <div className={classes.root}>
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item xs={2} >
          <Paper className={classes.paper}>환자 로그인</Paper>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Paper className={classes.paper}>　</Paper>
        </Grid>
        <Grid item xs={8} >
          <Paper className={classes.paper} lineHeight={10}>
            <Grid container spacing={2}>
              <Grid item>
                <img className={classes.img} src="/images/patient_login_logo.png" />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <div>
                      <TextField
                        margin="dense"
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                        type="text"
                        label="이름"
                      //defaultValue="" 기본 입력된 텍스트
                      //helperText="" 도움말
                      />
                    </div>
                    <div textAlign="center">
                      <div className={classes.root}>
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
                      </div>
                      <LoginButton onClick={loginClick} variant="outlined" color="primary">로그인</LoginButton>
                    </div>
                    <div>
                    <KaKaoBtn
                        jsKey={process.env.REACT_APP_JSKEY}
                        buttonText="KaKao"
                        onSuccess={responseKaKao}
                        onFailure={responseFail}
                        getProfile={false}
                    />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}