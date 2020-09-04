import React from 'react';
import { Link, NavLink } from "react-router-dom";
import * as utils from '../Utils/path'

const Header = () => (
	<div>
    	<ul>
    		<li>
                <Link to={utils.DOCTOR_LOGIN}>Doctor Login</Link>
            </li>
        	<li>
                <Link to ={utils.PATIENT_LOGIN}>Patient Login</Link>
            </li>
            <li>
                <Link to ={utils.DASHBOARD_EXAMPLE}>material dashboard example</Link >
            </li>
            <li>
                <Link to ={utils.VIDEO_CALL}>video call</Link >
            </li>
    	</ul>
	</div>
)

export default Header;