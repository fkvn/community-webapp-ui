import { useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";

function FormContainer(
	Header = () => {},
	Body = {},
	stepHandlers = [],
	onBackHandlerPromise = () => {}
) {
	const MIN_STEP = 1;
	const MAX_STEP = stepHandlers.length;

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const [step, setStep] = useState(MIN_STEP);

	const onBackHandler = (onBack = () => {}) => {
		onBackHandlerPromise(onBack).then(() =>
			setStep(step - 1 < 0 ? 0 : step - 1)
		);
	};

	const RenderBody = ({ FormComponent, ...props }) => {
		return (
			<FormComponent
				{...props}
				step={step}
				onBack={onBackHandler}
				onSubmitLoading={onSubmitLoading}
			/>
		);
	};

	const onSubmitHandler = (e) => {
		// stop form submit refresh
		e.preventDefault();

		// form submit is processing
		setOnSubmitLoading(true);

		// console.log("submitte");

		// hanlder step submit
		stepHandlers.forEach(
			(stepHandler) =>
				stepHandler.step === step &&
				stepHandler
					.onStepHandlerPromise()
					.then(() => {
						// console.log("passed");
						if (stepHandler.callBack) {
							stepHandler.callBack();
						}
						if (step < MAX_STEP) {
							setStep(step + 1);
						}
						setOnSubmitLoading(false);
					})
					.catch(() => {
						// console.log("failed");
						setOnSubmitLoading(false);
					})
		);
	};

	const app = (
		// <Container fluid className={``}>
		<Form id="classicSignupFormCol" onSubmit={onSubmitHandler}>
			<Card className="">
				<Card.Header className="py-0">{Header}</Card.Header>
				<Card.Body className="p-5">
					{MIN_STEP <= MAX_STEP ? (
						<RenderBody {...Body} />
					) : (
						<div className="tedkvn-center-left">
							<div>
								<Spinner animation="border" role="status" />
							</div>
							<div className="mx-4">
								Loading...
								<span className="text-danger">
									{" "}
									Please come back later if it is taking too long!
								</span>
							</div>
						</div>
					)}
				</Card.Body>
			</Card>
		</Form>
		// </Container>
	);
	return app;
}

export default FormContainer;
