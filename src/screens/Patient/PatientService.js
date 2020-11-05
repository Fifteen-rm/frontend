import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import * as path from 'Utils/path';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const diagnosis = [
    {
        url: '../images/diagnosis_.png',
        title: '진료하기',
        width: '400px',
        height: '400px',
    },

];

const record = [
    {
        url: '../images/records.png',
        title: '진료 내역 조회',
        width: '400px',
        height: '400px',
    },
];

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
    btnroot: {
        minWidth: 400,
    },
    image: {
        position: 'relative',
        height: 400,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        fontSize: '1.5rem',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
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
                    <Box width={2 / 10} bgcolor="#4472c4" color="white" fontSize="1.5rem" className={classes.box}>환자 서비스</Box>
                    <Box width={6 / 10} className={classes.loginstate}>
                        {name}님 로그인됨　| <Button className={classes.logoutbutton} onClick={logoutClick}>로그아웃</Button>
                    </Box>
                </Box>
                <Box width={8 / 10} border={2} borderColor="#4472c4">
                    <Box display="flex" justifyContent="center" padding={3}>
                        <Box border={5} borderColor="#4472c4" margin={3}>
                            {diagnosis.map((image) => (
                                <Link to={path.PATIENT_DIAGNOSIS}>
                                    <ButtonBase
                                        focusRipple
                                        key={image.title}
                                        className={classes.image}
                                        focusVisibleClassName={classes.focusVisible}
                                        style={{
                                            width: image.width,
                                        }}
                                    >
                                        <span
                                            className={classes.imageSrc}
                                            style={{
                                                backgroundImage: `url(${image.url})`,
                                            }}
                                        />
                                        <span className={classes.imageBackdrop} />

                                        <span className={classes.imageButton}>
                                            <Typography
                                                component="span"
                                                variant="subtitle1"
                                                color="inherit"
                                                className={classes.imageTitle}
                                            >
                                                {image.title}
                                                <span className={classes.imageMarked} />
                                            </Typography>
                                        </span>
                                    </ButtonBase>
                                </Link>
                            ))}
                        </Box>

                        <Box border={5} borderColor="#4472c4" margin={3}>
                            {record.map((image) => (
                                <Link to={path.PATIENT_RECORDS}>
                                    <ButtonBase
                                        focusRipple
                                        key={image.title}
                                        className={classes.image}
                                        focusVisibleClassName={classes.focusVisible}
                                        style={{
                                            width: image.width,
                                        }}
                                    >
                                        <span
                                            className={classes.imageSrc}
                                            style={{
                                                backgroundImage: `url(${image.url})`,
                                            }}
                                        />
                                        <span className={classes.imageBackdrop} />
                                        <span className={classes.imageButton}>
                                            <Typography
                                                component="span"
                                                variant="subtitle1"
                                                color="inherit"
                                                className={classes.imageTitle}
                                            >
                                                {image.title}
                                                <span className={classes.imageMarked} />
                                            </Typography>
                                        </span>
                                    </ButtonBase>
                                </Link>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}