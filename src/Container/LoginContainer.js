import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/axios";
import Login from "../Component/Login/Login";

import * as constVar from "../Util/ConstVar";

function LoginContainer({ user }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate("/");
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
				localStorage.setItem(
					constVar.THAINOW_USER_STORRAGE_OBJ,
					JSON.stringify(result.data)
				);
				return true;
			})
			.catch(() => {
				return false;
			});
	};

	const app = <Login signInHandler={signInHandler} />;

	return app;
}

export default LoginContainer;
