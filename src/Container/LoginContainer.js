import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/axios";
import Login from "../Component/Login/Login";

import * as constVar from "../Util/ConstVar";
import * as axiosPromise from "../Axios/axiosPromise";

function LoginContainer({ user }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate("/");
	});

	const signInHandler = (
		channel = "",
		email = "",
		phone = "",
		password = ""
	) => {
		return axiosPromise.loginPromise(channel, email, phone, password);
	};

	// .catch(() => console.log("error"));

	const app = <Login signInHandler={signInHandler} />;

	return app;
}

export default LoginContainer;
