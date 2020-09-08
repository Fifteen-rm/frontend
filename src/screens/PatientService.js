import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";


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
    //
    return (
        <div className={classes.root}>
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={2} >
                    <Paper className={classes.paper}>환자 서비스</Paper>
                </Grid>
                <Grid item xs={6} textAlign="right">
                    <Paper className={classes.loginstate}> { props.location.state.user.name }님 로그인됨　|　<a onClick={logoutClick} color="blue">로그아웃</a> </Paper>
                </Grid>
                <Grid item xs={8} >
                    <Paper className={classes.paper} lineHeight={10}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <div />
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <div>
                                            환자서비스페이지메인
                                        </div>
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