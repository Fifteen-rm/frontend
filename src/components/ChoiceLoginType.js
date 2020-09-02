import React from 'react';
import { Link } from 'react-router-dom';

const ChoiceLoginType = () => {
    return (
        <div>
            <Link to="/patientlogin">환자 로그인</Link>
            <div></div>
            <Link to="/doctorlogin">의사 로그인</Link>
        </div>
    );
};

export default ChoiceLoginType;

