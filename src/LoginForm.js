import React, { useState } from "react"
import { signIn } from './auth';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function CenteredGrid( location ) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ name, front_number, back_number }) => setUser(signIn({ name, front_number, back_number }));
  const logout = () => setUser(null);

  const [name, setName] = useState("")
  const [front_number, setFront_number] = useState("")
  const [back_number, setBack_number] = useState("")

  const handleClick = () => {
    try {
      login({ name, front_number, back_number })
    } catch (e) {
      alert("일치하는 정보가 없습니다. 다시 입력 해주세요.")
      setName("")
      setFront_number("")
      setBack_number("")
    }
  }

  const { from } = location || { from: { pathname: "/patientservice" } }
  if (authenticated) return <Redirect to="/patientservice" />

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
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <img className={classes.img} src="/images/patient_login_logo.png" />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <div>
                      이름:
                      <input
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                        type="text"
                      />
                    </div>
                    <div textAlign="center">
                      주민등록번호:
                      <input
                        value={front_number}
                        onChange={({ target: { value } }) => setFront_number(value)}
                        type="text"
                      />
                      -<input
                        value={back_number}
                        onChange={({ target: { value } }) => setBack_number(value)}
                        type="text"
                      />
                    </div>
                    <div>
                      <Button onClick={ handleClick } variant="outlined" color="primary">로그인</Button>
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