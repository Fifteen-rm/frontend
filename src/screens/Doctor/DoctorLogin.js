import React, { useState } from "react"
import { dsignIn } from 'components/auth';
import * as path from 'Utils/path';
import { makeStyles, styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    box: {
        padding: 2,
        textAlign: 'center',
    },
    root: {
        flexGrow: 1,
        lineHeight: 2,
    },
    formControl: {
        margin: theme.spacing(1),
        width: 250,
    },
}));

export default function DoctorLogin(location) {
    const classes = useStyles();
    const [doctor, setDoctor] = useState(null);
    const [values, setValues] = useState("");
    const authenticated = doctor != null;
    const login = ({ doctor_part, doctor_name, password }) => setDoctor(dsignIn({ doctor_part, doctor_name, password }));
    const [doctor_name, setDoctorName] = useState("")
    const [password, setPassword] = useState("")
    const [doctor_part, setDoctorPart] = useState("")

    window.sessionStorage.setItem('doctor_name', doctor_name);
    window.sessionStorage.setItem('doctor_part', doctor_part);

    const LoginButton = styled(Button)({
        background: '#70ad47',
        color: 'white',
        variant: 'contained',
        fontSize: '1.2rem',
        tex: 10,
        height: 45,
        width: 200,
        margin: 20,
    });

    const loginClick = () => {
        try {
            login({ doctor_part, doctor_name, password })
        } catch (e) {
            alert("일치하는 정보가 없습니다. 다시 입력 해주세요.")
            setDoctorPart("")
            setDoctorName("")
            setPassword("")
        }
    }

    const responseFail = (err) => {
        alert(JSON.stringify(err));
    }

    if (authenticated) return <Redirect to={{ pathname: path.DOCTOR_WAITINGROOM, state: { doctor: doctor } }} />

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const appKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginClick();
        }
    }

    return (
        <Box align="center">
            <Box padding={15} width="1200px" alignContent="center">
                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={2 / 10} bgcolor="#70ad47" color="white" fontSize="1.5rem" className={classes.box}>
                        의료진 로그인
            </Box>
                    <Box width={6 / 10}>
                        {/*로그인 상태*/}
                    </Box>
                </Box>

                <Box className={classes.root} display="flex" justifyContent="center">
                    <Box width={8 / 10} display="flex" border={2} borderColor="#70ad47">
                        <Box width={5 / 10} paddingLeft={10} paddingY={5}>
                            <img src="/images/doctorlogin.png" width='80%' />
                        </Box>
                        <Box width={5 / 10} padding={5} marginLeft={5} marginRight={10}>
                            <Box>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>진료과</InputLabel>
                                    <Select
                                        value={doctor_part}
                                        onChange={({ target: { value } }) => setDoctorPart(value)}
                                    >
                                        <MenuItem value={"정형외과"}>정형외과</MenuItem>
                                        <MenuItem value={"가정의학과"}>가정의학과</MenuItem>
                                        <MenuItem value={"재활의학과"}>재활의학과</MenuItem>
                                        <MenuItem value={"이비인후과"}>이비인후과</MenuItem>
                                        <MenuItem value={"안과"}>안과</MenuItem>
                                        <MenuItem value={"치과"}>치과</MenuItem>
                                        <MenuItem value={"비뇨의학과"}>비뇨의학과</MenuItem>
                                        <MenuItem value={"노년내과"}>노년내과</MenuItem>
                                        <MenuItem value={"정신의학과"}>정신건강의학과</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box >
                                <TextField
                                    className={classes.formControl}
                                    margin="dense"
                                    value={doctor_name}
                                    onChange={({ target: { value } }) => setDoctorName(value)}
                                    type="text"
                                    label="성명"
                                />
                            </Box>
                            <Box >
                                <FormControl>
                                    <TextField
                                        className={classes.formControl}
                                        margin="dense"
                                        value={password}
                                        onChange={handleChange, ({ target: { value } }) => setPassword(value)}
                                        type="password"
                                        label="비밀번호"
                                        onKeyPress={appKeyPress}
                                    />
                                </FormControl>
                            </Box>
                            <Box padding={1}>
                                <LoginButton onClick={loginClick}>로그인</LoginButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}