import React, { useState } from "react";

import { makeStyles, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory, Link} from "react-router-dom";

import * as path from 'Utils/path';
import { Redirect } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

import Button from '@material-ui/core/Button';
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
    loginstate: {
        padding: theme.spacing(2),
        textAlign: 'right',
        margin: 'auto',
    },
}));


export default function PatientService(props) {

    const classes = useStyles();
    const [user, setUser] = useState(null);
    const logout = () => setUser(null);

    const history = useHistory();

    const logoutClick = () => {
        logout()
        history.push('/')
    }

    const enterMeet = () => {
        return history.push(path.VIDEO_CALL, {
            identity:uuidv4(),
            room:'1234'
        } )
    }
    //
    return (
        <div className={classes.root}>
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={2} >
                    <Paper className={classes.paper}>환자 서비스</Paper>
                </Grid>
                <Grid item xs={6} textAlign="right">
                    <Paper className={classes.loginstate}> {props.location.state.user.name}님 로그인됨　|　<a onClick={logoutClick} color="blue">로그아웃</a> </Paper>
                </Grid>
                <Grid item xs={8} >
                    <Paper className={classes.paper} lineHeight={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={12}>
                                    <Grid container spacing={10} item xs={12} justify="center" alignItems="center">
                                        <Grid item xs={4}>
                                        <Link to={path.PATIENT_DIAGNOSIS}><Paper className={classes.paper}>진료 하기</Paper></Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Link to={path.PATIENT_RECORDS}><Paper className={classes.paper}>진료 내역 조회</Paper></Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}