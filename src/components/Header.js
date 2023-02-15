import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/MCID-Logo.png";

import "./Header.css";

const Header = (props) => {
	return (
		<div className="header-body">
			<div className="logo">
				<Link to="/">
					<img src={logo} alt="logo" onClick={props.handleReset} />
				</Link>
			</div>
		</div>
	);
};

export default Header;
