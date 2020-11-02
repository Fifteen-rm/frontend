import React, { useState } from "react";
import * as path from 'Utils/path';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import { useHistory, Link } from "react-router-dom";

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

    text: {
        textAlign: 'center',
        fontSize: '1.2rem',
    }
}));


export default function PatientDiagnosis(props) {
    const name = window.sessionStorage.getItem('name');

    const classes = useStyles();
    const [user, setUser] = useState(null);
    const logout = () => setUser(null);

    const history = useHistory();

    const logoutClick = () => {
        logout()
        history.push('/')
    }

    return (
        <Box padding={15}>
            <Box className={classes.root} display="flex" justifyContent="center">
                <Box width={2 / 10} bgcolor="rgb(68, 114, 196)" color="white" fontSize="1.5rem" className={classes.box}>
                    진료과 선택
                </Box>
                <Box width={6 / 10} className={classes.loginstate}>
                    {name}님 로그인됨　|　<Button className={classes.logoutbutton} onClick={logoutClick} color="blue">로그아웃</Button>
                </Box>
            </Box>

            <Box className={classes.root} display="flex" justifyContent="center">
                <Box width={8 / 10} border={2} borderColor="rgb(68, 114, 196)">
                    <Box justifyContent="center">
                        <Box display="flex" paddingX={3}>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                        </Box>
                        <Box display="flex" paddingX={3}>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                        </Box>
                        <Box display="flex" paddingX={3}>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                            <Box className={classes.text} padding={3} margin={3} width={2/9} border={1} borderColor='rgb(68, 114, 195)'>안과</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        /*
        <div className={classes.root}>
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={2} >
                    <Paper className={classes.paper}>진료과 선택</Paper>
                </Grid>
                <Grid item xs={6} textAlign="right">
                    <Paper className={classes.loginstate}> {name}님 로그인됨　|　<a onClick={logoutClick} color="blue">로그아웃</a> </Paper>
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
                                                    <Link to="/patient/diagnosis"><Paper className={classes.paper}>정형외과</Paper></Link>
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
        </div>*/
    )
}