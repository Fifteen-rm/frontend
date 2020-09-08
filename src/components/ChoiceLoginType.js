import React from 'react';
import { Link } from 'react-router-dom';
import * as path from 'Utils/path';
const ChoiceLoginType = () => {
    return (
        <div>
            <Link to={path.PATIENT_LOGIN}>환자 로그인</Link>
            <div></div>
            <Link to={path.DOCTOR_LOGIN}>의사 로그인</Link>
        </div>
    );
};

export default ChoiceLoginType;

