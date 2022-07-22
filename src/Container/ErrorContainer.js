import React from "react";
import { Alert, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as constVar from "../Util/ConstVar";

function ErrorContainer() {
	const error = useSelector(
		(state) => state.thainowReducer[`${constVar.ERROR}`]
	);

	const show =
		JSON.stringify(error) !== "{}" &&
		error?.[`${constVar.ERROR_MESSAGE}`]?.length > 0;

	const app = (
		<Modal
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			contentClassName="bg-transparent border-0"
		>
			{/* <ToastError error={error} /> */}
			<Modal.Body>
				<Alert variant="danger" show={show} className="p-4 ">
					<Alert.Heading> {error?.[`${constVar.ERROR_MESSAGE}`]}</Alert.Heading>
				</Alert>
			</Modal.Body>
		</Modal>
	);

	return app;
}

export default ErrorContainer;
