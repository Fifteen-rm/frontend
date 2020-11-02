import React, { useState } from "react";
import { makeStyles, styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useHistory, Link } from "react-router-dom";
import * as path from 'Utils/path';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';

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
            identity: uuidv4(),
            room: '1234'
        })
    }

    const name = window.sessionStorage.getItem('name');

    return (
        <Box align="center">
            <Box padding={15} width="1200px">
                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={2 / 10} bgcolor="rgb(68, 114, 196)" color="white" fontSize="1.5rem" className={classes.box}>
                        환자 서비스
                </Box>
                    <Box width={6 / 10} className={classes.loginstate}>
                        {name}님 로그인됨　|　<Button className={classes.logoutbutton} onClick={logoutClick} color="blue">로그아웃</Button>
                    </Box>
                </Box>

                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={8 / 10} display="flex" border={2} borderColor="rgb(68, 114, 196)">
                        <Box display="flex" justifyContent="center" width="100%" paddingY={6}>
                            <Link to={path.PATIENT_DIAGNOSIS} style={{ textDecoration: 'none' }}>
                                <Box border={2} fontSize="1.5rem" width={200} height={200} padding={3} bgcolor="rgb(68, 114, 196)" color="white" lineHeight="200px">진료 하기</Box>
                            </Link>
                            <Box marginX={6}></Box>
                            <Link to={path.PATIENT_RECORDS} style={{ textDecoration: 'none' }}>
                                <Box border={2} fontSize="1.5rem" width={200} height={200} padding={3} bgcolor="rgb(68, 114, 196)" color="white" lineHeight="200px">진료 내역 조회</Box>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}