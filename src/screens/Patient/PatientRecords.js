import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import axios from 'axios';
import Modal from '@material-ui/core/Modal';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    const name = window.sessionStorage.getItem('name');
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const logout = () => setUser(null);

    const history = useHistory();

    const logoutClick = () => {
        logout()
        history.push('/')
    }

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        setOpen(!open)
    };

    const goBackButton = () => {
        history.goBack()
    }

    const goHomeButton = () => {
        history.push('/patient/service')
    }

    const [results, setResults] = useState([]);
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users`)  // 진료 내역 데이터 위치
            .then((data) => setResults(data));
    }, []);

    return (
        <Box align="center">
            <Box padding={15} width="1200px">
                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={2 / 10} bgcolor="#4472c4" color="white" fontSize="1.5rem" className={classes.box}>
                        환자 서비스
                </Box>
                    <Box width={2 / 10} borderColor="#4472c4" borderTop={2} borderRight={2} fontSize="1.5rem" className={classes.remotePage}>
                        <Button className={classes.remotePage} onClick={goBackButton}><ArrowBackIcon />뒤로가기</Button>
                        <Button className={classes.remotePage} onClick={goHomeButton}><HomeIcon />홈으로</Button>
                    </Box>
                    <Box width={4 / 10} className={classes.loginstate}>
                        {name}님 로그인됨　| <Button className={classes.logoutbutton} onClick={logoutClick} color="blue">로그아웃</Button>
                    </Box>
                </Box>

                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={8 / 10} display="flex" border={2} borderColor="#4472c4">
                        <Box margin={6} display="flex" justifyContent="center" width="100%">
                            <Box width="100%">
                                {results.length !== 0 ?
                                    results.data.slice(0).reverse().map((result) => (
                                        <Box display="flex" width="100%">
                                            <Box padding={3} fontSize="1.2rem" borderBottom={1} borderColor="#ffffff" bgcolor="#4472c4" color="white" width={1 / 10}>{result.id}</Box>
                                            <Box padding={3} fontSize="1.2rem" border={1} borderColor="#4472c4" width={9 / 10} onClick={handleToggle}>{result.email}</Box>
                                            {/*result.id 에는 날짜 데이터(예: 20/11/05), result.email에는 내용 데이터 짤라서 넣고 모달 안에 result.email에 전체 내용 데이터 넣을 겁니다*/}
                                            <Modal open={open}>
                                                <div style={modalStyle} className={classes.paper} align="center">
                                                    <h1>{result.id}</h1>
                                                    <h2>{result.email}</h2>
                                                    <Button variant="outlined" color="#4472c4" onClick={handleToggle}>창 닫기</Button>
                                                </div>
                                            </Modal>
                                        </Box>
                                    )) : console.log('hi')}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

{/*  */}