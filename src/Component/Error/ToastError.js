import React, { useEffect, useState } from "react";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import * as constVar from "../../Util/ConstVar";

function ToastError({ error }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (error) setShow(true);
	}, [error]);

	const app = error && (
		<ToastContainer
			className="tedkvn-error-toast-container p-3 border-0"
			position="middle-center"
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

	return app;
}

export default ToastError;
