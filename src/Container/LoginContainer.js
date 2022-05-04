import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/axios";
import Login from "../Component/Login/Login";

import * as constVar from "../Util/ConstVar";

function LoginContainer({ prevRoute = "/" }) {
	const navigate = useNavigate();

	useEffect(() => {
		const thaiNowObj = window.sessionStorage.getItem(
			constVar.THAINOW_USER_STORRAGE_OBJ
		);
		if (thaiNowObj) navigate("/");
	});

	const signInHandler = ({
		channel = "",
		email = "",
		phone = "",
		password = "",
	}) => {
		return axios
			.post(`/auth/signin`, {
				channel: channel,
				email: email,
				phone: phone,
				password: password,
			})
			.then((result) => {
				sessionStorage.setItem(
					constVar.THAINOW_USER_STORRAGE_OBJ,
					JSON.stringify(result.data)
				);
				return [true, prevRoute];
			})
			.catch(() => {
				return [false, prevRoute];
			});
	};

	const app = <Login signInHandler={signInHandler} />;

	return app;
}

export default LoginContainer;
