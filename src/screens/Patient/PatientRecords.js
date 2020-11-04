import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

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
            color: "rgb(68, 114, 196)",
            fontSize: '1.2rem',
        },
    },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '5px solid rgb(68, 114, 196)',
        boxShadow: theme.shadows[5],
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
        console.log(open)
        setOpen(!open)
    };

    const goBackButton = () => {
        history.goBack()
    }

    const goHomeButton = () => {
        history.push('/patient/service')
    }

    return (
        <Box align="center">
            <Box padding={15} width="1200px">
                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={2 / 10} bgcolor="rgb(68, 114, 196)" color="white" fontSize="1.5rem" className={classes.box}>
                        환자 서비스
                </Box>
                <Box width={2 / 10} borderColor="rgb(68, 114, 196)" borderTop={2} borderRight={2} fontSize="1.5rem" className={classes.remotePage}>
                        <Button className={classes.remotePage} onClick={goBackButton}><ArrowBackIcon />뒤로가기</Button>
                        <Button className={classes.remotePage} onClick={goHomeButton}><HomeIcon />홈으로</Button>
                    </Box>
                    <Box width={4 / 10} className={classes.loginstate}>
                        {name}님 로그인됨　| <Button className={classes.logoutbutton} onClick={logoutClick} color="blue">로그아웃</Button>
                    </Box>
                </Box>

                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={8 / 10} display="flex" border={2} borderColor="rgb(68, 114, 196)">
                        <Box margin={6} display="flex" justifyContent="center" width="100%">
                            <Box display="flex" width="100%">
                                <Box padding={3} bgcolor="rgb(68, 114, 196)" color="white" width={1 / 10}>날짜</Box>
                                <Box padding={3} border={1} borderColor="rgb(68, 114, 196)" width={9 / 10} onClick={handleToggle}>내용
                                    <Modal open={open} onClose={handleToggle}>
                                    <div style={modalStyle} className={classes.paper} align="center">
                                        <h2>20.11.03 진료 내용</h2>
                                        <p>약은 사서드세요. 제발...</p>
                                        <Button variant="outlined" color="rgb(68, 114, 196)" onClick={handleToggle}>창 닫기</Button>
                                    </div>
                                </Modal>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}