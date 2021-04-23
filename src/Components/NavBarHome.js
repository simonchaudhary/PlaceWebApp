import React from "react";

import "../css/navbar.css";
import pin from "../Assets/pin.svg";
import { useDispatch, useSelector } from "react-redux";
import { setAuthSession } from "../Store/actions";
import { Link, useHistory } from "react-router-dom";

function NavBarHome({ parentCallBackLogin, parentCallBackSignup }) {
	const loginButton = (e) => {
		e.preventDefault();
		parentCallBackLogin();
	};
	const registerButton = (e) => {
		e.preventDefault();
		parentCallBackSignup();
	};

	const dispatch = useDispatch()
	const history = useHistory()

	const authSession = useSelector(state => state.authSession)
	const userDetails = useSelector(state => state.userDetails)

	const isLoggedIn = () => {
		return authSession != null
	}

	const logout = () => {
        dispatch(setAuthSession(null))
		localStorage.setItem('token', null)
        alert('Logout successful')	
		history.push('/')
	}

	return (
		<div className="navbar">
			<div className="nav__left row">
				<img
					src={pin}
					style={{ width: "25px", color: "#FF6584" }}
					alt=""
				/>
				<div className="vertical"></div>
				Gharjagga
			</div>
			<div className="nav__menu">
				<Link className="nav__menu__item" to='/'>Home</Link>
				<div className="nav__menu__item">For Rent</div>
				<div className="nav__menu__item">For Sale</div>
				<Link className="nav__menu__item" to='/message'>Messages</Link>
				{
					isLoggedIn() ? (
						<div className="nav__menu__item" onClick={logout}>{`Logout (${userDetails.name})`}</div>
					): (<Link className="nav__menu__item" to='/user'>Login</Link>)
				}
			</div>
		</div>
	);
}

export default NavBarHome;
