import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FormHeader from "../../Component/Form/FormLayout/FormHeader";
import { ON_RETURN_URL, ON_SUCCESS_URL } from "../../Util/ConstVar";

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
	const navigate = useNavigate();
	const location = useLocation();
	const continueUrl = location?.state?.[`${ON_SUCCESS_URL}`] || "/";
	const closeUrl = location.state?.[`${ON_RETURN_URL}`] || "";

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

	const handlerSubmit = () => {
		stepHandlers?.[step - 1].onStepHandlerPromise().then(() => {
			if (step < MAX_STEP) {
				setStep(step + 1);
			} else if (step === MAX_STEP) {
				navigate(closeUrl.length > 0 ? closeUrl : continueUrl, {
					state: {
						...(closeUrl.length > 0 && {
							[`${ON_SUCCESS_URL}`]: continueUrl,
						}),
					},
				});
			}
		});
		return Promise.resolve();
	};

	const onSubmitHandler = (e) => {
		// stop form submit refresh
		e.preventDefault();

		console.log(e);

		// form submit is processing
		setOnSubmitLoading(true);

		handlerSubmit().then(() => {
			// setTimeout(() => {
			// 	setOnSubmitLoading(false);
			// });
		});

		// if (onSubmitLoading) {
		// 	stepHandlers.forEach(
		// 		(stepHandler) =>
		// 			stepHandler.step === step &&
		// 			stepHandler

		// 				.then(() => {
		// 					if (step < MAX_STEP) {
		// 						console.log("not delay");
		// 						setStep(step + 1);
		// 					}

		// 					if (step === MAX_STEP) {

		// 					}

		// 					setTimeout(() => {
		// 						setOnSubmitLoading(false);
		// 					}, 2000);
		// 				})
		// 				.catch(() => {
		// 					console.log("failed");
		// 					setOnSubmitLoading(false);
		// 				})
		// 	);
		// }
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
