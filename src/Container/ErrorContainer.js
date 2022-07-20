import React from "react";
import { useSelector } from "react-redux";
import ToastError from "../Component/Error/ToastError";
import * as constVar from "../Util/ConstVar";

function ErrorContainer() {
	const error = useSelector(
		(state) => state.thainowReducer[`${constVar.ERROR}`]
	);

	const app = JSON.stringify(error) !== "{}" &&
		error?.[`${constVar.ERROR_MESSAGE}`]?.length > 0 && (
			<ToastError error={error} />
		);

	return app;
}

export default ErrorContainer;
