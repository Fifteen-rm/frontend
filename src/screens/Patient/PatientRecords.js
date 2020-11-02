import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

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
                        <Box margin={6} display="flex" justifyContent="center" width="100%">
                            <Box display="flex" width="100%">
                                <Box padding={3} bgcolor="rgb(68, 114, 196)" color="white" width={1 / 8}>날짜</Box>
                                <Box padding={3} border={1} borderColor="rgb(68, 114, 196)" width={7 / 8}>내용</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}