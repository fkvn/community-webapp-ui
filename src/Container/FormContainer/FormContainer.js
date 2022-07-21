import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import FormHeader from "../../Component/Form/FormLayout/FormHeader";

function FormContainer({
	id = "",
	noHeader = true,
	customerHeader = false,
	header = () => {},
	body = {},
	stepHandlers = [],
	onBackHandlerPromise = async () => {},
	onClose = () => {},
}) {
	const MIN_STEP = 1;
	const MAX_STEP = stepHandlers.length;

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const [step, setStep] = useState(MIN_STEP);

	const onBackHandler = (onBack = () => {}) => {
		onBackHandlerPromise(onBack).then(() =>
			setStep(step - 1 < 0 ? 0 : step - 1)
		);
	};

	const RenderHeader = () => (
		<FormHeader id={id} onClose={onClose} className=" w-100 bg-white" />
	);

	const RenderBody = ({ FormComponent = () => {}, ...props }) => {
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

						setTimeout(() => {
							setOnSubmitLoading(false);
						}, 2000);
					})
					.catch(() => {
						// console.log("failed");
						setTimeout(() => {
							setOnSubmitLoading(false);
						}, 2000);
					})
		);
	};

	const app = (
		<Form onSubmit={onSubmitHandler} {...(id && { id: "form-" + id })}>
			{MIN_STEP <= MAX_STEP ? (
				<>
					{!noHeader ? <RenderHeader /> : customerHeader ? header : <> </>}
					<RenderBody {...body} />
				</>
			) : (
				<div className="tedkvn-center position-relative">
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
			{/* <Card className="m-0 p-0">
				<Card.Header className="m-0 p-0">{Header}</Card.Header>
				<Card.Body className="m-0 p-0">
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
			</Card> */}
		</Form>
		// </Container>
	);
	return app;
}

export default FormContainer;
