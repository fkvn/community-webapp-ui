import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

function FormLayout(Header = () => {}, Body = () => {}, steps = []) {
	const MIN_STEP = 1;
	const MAX_STEP = steps.length + 5;

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const [step, setStep] = useState(MIN_STEP);

	const loginFormIntro = (
		<Form.Group className="mb-5">
			<Row>
				<Col xs={12}>
					<Button size="sm" variant="link" href="/signup" className="p-0">
						Sign up Business Account instead
					</Button>
				</Col>
			</Row>
		</Form.Group>
	);

	const app = (
		// <Container fluid className={``}>
		<Form id="classicSignupFormCol">
			<Card className="">
				<Card.Header className="py-0">{Header}</Card.Header>
				<Card.Body className="p-5">
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
