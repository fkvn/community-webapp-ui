import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { ToastContainer } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as constVar from "../Util/ConstVar";

function ErrorContainer() {
	const [show, setShow] = useState(false);

	const error = useSelector(
		(state) => state.thainowReducer[`${constVar.ERROR}`]
	);

	useEffect(() => {
		if (error) setShow(true);
	}, [error]);

	const alert = error && (
		<ToastContainer
			className="p-3 border-0"
			position="middle-center"
			id="error-toast-container"
		>
			<Toast
				className="border-0"
				onClose={() => setShow(false)}
				show={show}
				delay={3000}
				autohide
			>
				<Toast.Body className="m-0 p-0">
					<Alert
						variant="danger"
						onClose={() => setShow(false)}
						show={show}
						dismissible
					>
						{error[`${constVar.ERROR_MESSAGE}`]}
					</Alert>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);

	const app = alert;

	return app;
}

export default ErrorContainer;
