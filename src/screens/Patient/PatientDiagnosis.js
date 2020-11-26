import React, { useState } from "react";
import * as path from 'Utils/path';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import { useHistory, Link } from "react-router-dom";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';

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
        fontSize: '1.2rem',
    },
    logoutbutton: {
        '& > *': {
            fontSize: '1.2rem',
        },
    },
    remotePage: {
        '& > *': {
            color: "#4472c4",
            fontSize: '1.2rem',
        },
        borderColor: "#4472c4",
    },
    text: {
        textAlign: 'center',
        fontSize: '1.5rem',
        lineHeight: "100px",
    },
}));


export default function PatientDiagnosis(props) {
    const patient_name = window.sessionStorage.getItem('patient_name');
    const part = window.sessionStorage.getItem('part');

    const classes = useStyles();
    const [user, setUser] = useState(null);
    const logout = () => setUser(null);

    const history = useHistory();

    const logoutClick = () => {
        logout()
        history.push('/')
    }

    const goBackButton = () => {
        history.goBack()
    }

    const goHomeButton = () => {
        history.push('/patient/service')
    }

    const sendPart = () => {
        axios({
            method: 'post',
            url: `${path.SERVER}/treatment/createroom/`,
            data: {
                Patient: patient_name,
                Major: part,
            }
        })
    }
    
    return (
        <Box align="center" onDragStart="false">
            <Box padding={15} width="1150px">
                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={2 / 10} bgcolor="#4472c4" color="white" fontSize="1.5rem" className={classes.box}>
                        진료과 선택
                </Box>
                <Box width={2 / 10} borderTop={2} borderRight={2} fontSize="1.5rem" className={classes.remotePage}>
                        <Button className={classes.remotePage} onClick={goBackButton}><ArrowBackIcon />뒤로가기</Button>
                        <Button className={classes.remotePage} onClick={goHomeButton}><HomeIcon />홈으로</Button>
                    </Box>
                    <Box width={4 / 10} className={classes.loginstate}>
                        {patient_name}님 로그인됨　| <Button className={classes.logoutbutton} onClick={logoutClick} color="blue">로그아웃</Button>
                    </Box>
                </Box>

                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={8 / 10} border={2} borderColor="#4472c4">
                        <Box justifyContent="center">
                            <Box display="flex" paddingTop={4} width="100%" justifyContent="center">
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/정형외과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>정형외과</Box>
                                </Link>
                                <Box marginX={2}></Box>
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/가정의학과'} style={{ textDecoration: 'none' }}
                                ><Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>가정의학과</Box>
                                </Link>
                                <Box marginX={2}></Box>
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/재활의학과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>재활의학과</Box>
                                </Link>
                            </Box>
                            <Box display="flex" paddingTop={4} width="100%" justifyContent="center">
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/이비인후과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>이비인후과</Box>
                                </Link>
                                <Box marginX={2}></Box>
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/안과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>안과</Box>
                                </Link>
                                <Box marginX={2}></Box>
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/치과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>치과</Box>
                                </Link>
                            </Box>
                            <Box display="flex" paddingY={4} width="100%" justifyContent="center">
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/비뇨의학과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>비뇨의학과</Box>
                                </Link>
                                <Box marginX={2}></Box>
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/노년내과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart}>노년내과</Box>
                                </Link>
                                <Box marginX={2}></Box>
                                <Link to={path.PATIENT_DIAGNOSISROOM + '/정신건강의학과'} style={{ textDecoration: 'none' }}>
                                    <Box className={classes.text} padding={3} width={150} height={100} border={1} borderColor='rgb(68, 114, 195)' color="black" onClick={sendPart} style={{fontSize: "1.3rem"}}>정신건강의학과</Box>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}