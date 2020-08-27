import React from 'react';
import { Link } from "react-router-dom";

// 이거 링크들 const로 묶어서 관리하기
const Header = () => (
	<div>
    	<ul>
    		<li>
                <Link to ="/doctor/login">Doctor Login</Link>
            </li>
        	<li>
                <Link to ="/patient/login">Patient Login</Link>
            </li>
    	</ul>
	</div>
)

export default Header;