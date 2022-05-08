import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { ToastContainer } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import ToastError from "../Component/Error/ToastError";
import * as constVar from "../Util/ConstVar";

function ErrorContainer() {
	const error = useSelector(
		(state) => state.thainowReducer[`${constVar.ERROR}`]
	);

	const app = <ToastError error={error} />;

	return app;
}

export default ErrorContainer;
