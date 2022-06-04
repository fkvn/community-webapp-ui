import React, { useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import FormHeader from "./FormHeader";

function FormLayout({ ...headerProps }, Body = () => {}, steps = []) {
	const MIN_STEP = 1;
	const MAX_STEP = steps.length;

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const [step, setStep] = useState(MIN_STEP);

	const app = (
		// <Container fluid className={``}>
		<Form id="classicSignupFormCol">
			<Card className="">
				<Card.Header className="">
					<FormHeader {...headerProps} />
					{/* <Row className={`tedkvn-center`}>
							

							<Col xs={4}>{title}</Col>
							<Col xs={8}>
								{title} {title} {title} {title}{" "}
							</Col>
						</Row> */}
				</Card.Header>
				<Card.Body>
					{MIN_STEP <= MAX_STEP ? (
						Body
					) : (
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					)}
				</Card.Body>
			</Card>
		</Form>
		// </Container>
	);
	return app;
}

export default FormLayout;
