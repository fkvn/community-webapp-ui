import { Modal } from "bootstrap";
import React from "react";

function InfoModal(props) {
	const {
		size = "lg",
		ariaLabelledby = "contained-modal-title-vcenter",
		isCenter = true,
		isStatic = true,
		show = true,
		closeButton = false,
		onHide = () => {},
	} = props;

	const app = (
		<Modal
			size={size}
			aria-labelledby={ariaLabelledby}
			backdrop={isStatic}
			centerer={isCenter}
			onHide={onHide}
		>
			<Modal.Header closeButto={closeButton}>
				<Modal.Title id="contained-modal-title-vcenter">
					Modal heading
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Centered Modal</h4>
				<p>
					Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
					dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
					consectetur ac, vestibulum at eros.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);

	return app;
}

export default InfoModal;
