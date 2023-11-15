import React, { useEffect, useState } from "react";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import * as constVar from "../../Util/ConstVar";

function ToastError({ error = {} }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (error) setShow(true);
	}, [error]);

	const app = error && (
		<ToastContainer
			id="custom-error-toast-container"
			className=" border-0 w-50"
			position="middle-center"
		>
			<Toast
				className="border-0 w-100"
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
						className="p-4"
						dismissible
					>
						<Alert.Heading> {error[`${constVar.ERROR_MESSAGE}`]}</Alert.Heading>
					</Alert>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);

	return app;
}

export default ToastError;
