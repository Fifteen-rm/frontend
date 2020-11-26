import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import * as path from 'Utils/path';

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
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '5px solid #4472c4',
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function PatientRecords(props) {
    const patient_name = window.sessionStorage.getItem('patient_name');
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

    const [results, setResults] = useState([]);
    useEffect(() => {
        axios
            .get(`${path.SERVER}/patient/description/all`)  // 진료 내역 데이터 위치
            .then((data) => setResults(data));
    }, []);

    return (
        <Box align="center">
            <Box padding={15} width="1200px">
                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={2 / 10} bgcolor="#4472c4" color="white" fontSize="1.5rem" className={classes.box}>
                        진료 내역
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
                    <Box width={8 / 10} display="flex" border={2} borderColor="#4472c4">
                        <Box margin={6} display="flex" justifyContent="center" width="100%">
                            <Box width="100%">
                                {results.length !== 0 ?
                                    results.data.map((result) => (
                                        <Box display="flex" width="100%">
                                            <Box padding={3} fontSize="1.2rem" borderBottom={1} borderColor="#ffffff" bgcolor="#4472c4" color="white" width={2 / 12}>{(result.updated_at).substr(0, 10)}<br></br>{(result.updated_at).substr(11, 8)}</Box>
                                    <Box padding={3} fontSize="1.2rem" border={1} borderColor="#4472c4" width={10 / 12}>{result.patient_say} {result.doctor}님 진료<br></br>{result.doctor_say}</Box>
                                        </Box>
                                    )) : ''}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}