import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useHistory } from "react-router-dom";
import Iframe from 'react-iframe';
import axios from 'axios';
import * as path from 'Utils/path';
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
            color: "#70ad47",
            fontSize: '1.2rem',
        },
        borderColor: "#70ad47",
    },
    textArea: {
        margin: "10px",
        resize: "none",
    },
    header: {
        color: "#FFFFFF",
        backgroundColor: "#70ad47",
        fontSize: "1.5rem",
        fontWeight: "400",
    },
    sendButton: {
        color: "#FFFFFF",
        backgroundColor: "#70ad47",
        fontSize: "1.2rem",
        fontWeight: "500",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "40px",
        paddingRight: "40px",
    },
}));


export default function DoctorDiagnosisRoom(props) {
    const doctor_name = window.sessionStorage.getItem('doctor_name');
    const doctor_part = window.sessionStorage.getItem('doctor_part');
    const patient_name = window.sessionStorage.getItem('patient_name');

    const classes = useStyles();
    const [doctor, setDoctor] = useState(null);
    const [patientInfo, setPatientInfo] = useState("")
    const logout = () => setDoctor(null);

    const history = useHistory();

    const logoutClick = () => {
        logout()
        history.push('/')
    }

    const goBackButton = () => {
        history.goBack()
    }

    const goHomeButton = () => {
        history.push('/doctor/waiting')
    }

    const sendRecord = () => {
        axios({
            method: 'post',
            url: `${path.SERVER}/doctor/description/`,
            headers: {
                Authorization: "backdoor"
            },
            data: {
                patient: patient_name,
                doctor: doctor_name,
                patient_say: doctor_part,
                doctor_say: patientInfo,
            }
        })
        //axios.delete(`${path.SERVER}/treatment/waitingroom?Patient=` + doctor_part);
        history.goBack()
    }

    return (
        <Box align="center">
            <Box padding={15} width="1300px">
                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={2 / 10} bgcolor="#70ad47" color="white" fontSize="1.5rem" className={classes.box}>
                        진료실
                </Box>
                    <Box width={2 / 10} borderTop={2} borderRight={2} fontSize="1.5rem" className={classes.remotePage}>
                        <Button className={classes.remotePage} onClick={goBackButton}><ArrowBackIcon />뒤로가기</Button>
                        <Button className={classes.remotePage} onClick={goHomeButton}><HomeIcon />홈으로</Button>
                    </Box>
                    <Box width={6 / 10} className={classes.loginstate}>
                        {doctor_part} {doctor_name}님 로그인됨　| <Button className={classes.logoutbutton} onClick={logoutClick} color="blue">로그아웃</Button>
                    </Box>
                </Box>

                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={11 / 15} display="flex" border={2} borderColor="#70ad47">
                        <Iframe url="/video/WaitingRoom"
                            width="100%"
                            height="600px"
                            frameBorder="0"
                            scrolling="no"
                        />
                    </Box>
                    <Box width={4 / 15} borderTop={2} borderRight={2} borderBottom={2} style={{ borderColor: "#70ad47" }}>
                        <Box className={classes.header}>진료 내용 작성</Box>
                        <TextareaAutosize
                            value={patientInfo}
                            onChange={({ target: { value } }) => setPatientInfo(value)}
                            className={classes.textArea}
                            pd={5}
                            rowsMin={30}
                            cols={33}
                        />
                        <Box><span className={classes.sendButton} onClick={sendRecord}>진료 내용 보내기</span></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
