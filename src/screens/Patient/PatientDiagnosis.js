import React, { useState } from "react";
import * as path from 'Utils/path';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory, Link } from "react-router-dom";

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


export default function PatientDiagnosis() {

    const classes = useStyles();
    const [user, setUser] = useState(null);
    const logout = () => setUser(null);

    const history = useHistory();

    const logoutClick = () => {
        logout()
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={2} >
                    <Paper className={classes.paper}>진료과 선택</Paper>
                </Grid>
                <Grid item xs={6} textAlign="right">
                    <Paper className={classes.loginstate}> !!님 로그인됨　|　<a onClick={logoutClick} color="blue">로그아웃</a> </Paper>
                </Grid>
                <Grid item xs={8} >
                    <Paper className={classes.paper} lineHeight={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Grid container spacing={3} justify="center" alignItems="center">
                                            <Grid container item xs={12} spacing={4}>
                                                <Grid item xs={4}>
                                                    <Link to={path.VIDEO_CALL}><Paper className={classes.paper}>정형외과</Paper></Link>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>가정의학과</Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>재활의학과</Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={12} spacing={4}>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>이비인후과</Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>안과</Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>치과</Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={12} spacing={4}>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>비뇨의학과</Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>노년내과</Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper className={classes.paper}>정신건강의학과</Paper>
                                                </Grid>
                                            </Grid>
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