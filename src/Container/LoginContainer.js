import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Component/Login/Login";
import * as axiosPromise from "../Axios/axiosPromise";

function LoginContainer({ user = {} }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (JSON.stringify(user) !== "{}") navigate("/");
	});

	const loginHanlder = (
		channel = "",
		email = "",
		phone = "",
		password = ""
	) => {
		return axiosPromise.getPromise(
			axiosPromise.loginPromise(channel, email, phone, password)
		);
	};

	const app = <Login loginHanlder={loginHanlder} />;

	return app;
}

export default LoginContainer;
