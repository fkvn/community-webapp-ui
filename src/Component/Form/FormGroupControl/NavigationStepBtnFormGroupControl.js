import React from "react";
import { Form } from "react-bootstrap";
import NextstepFormGroupControl from "./NextstepFormGroupControl";
import PrevstepFormGroupControl from "./PrevstepFormGroupControl";

function NavigationStepBtnFormGroupControl({
	formGroupClassName = "",
	step = 0,
	minstep = 1,
	maxStep = 1,
	nextstepBtnTitle = "Next step",
	skipnextstep = [],
	skipprevstep = [],
	setStep = () => {},
	onSubmitLoading = false,
}) {
	const nextstepFormGroupControl = (
		<NextstepFormGroupControl
			btnTitle={nextstepBtnTitle}
			btnShow={onSubmitLoading}
		/>
	);

	const prevstepFormGroupControl = (
		<PrevstepFormGroupControl
			btnOnClick={() => setStep(step - 1 > -1 ? step - 1 : 0)}
		/>
	);

	let displayBtn = [];

	// display next step
	if (skipnextstep.indexOf(step) < 0 && step >= minstep && step < maxStep) {
		displayBtn = [...displayBtn, nextstepFormGroupControl];
	}

	// display prev step
	if (skipprevstep.indexOf(step) < 0 && step > minstep && step <= maxStep) {
		displayBtn = [...displayBtn, prevstepFormGroupControl];
	}

	const app = step >= minstep && (
		<Form.Group className={`formGroupControl ${formGroupClassName}`}>
			{displayBtn.length === 1 && (
				<div className="text-center pt-3">{displayBtn[0]}</div>
			)}

			{displayBtn.length === 2 && (
				<>
					<div className="float-start pt-3 mx-2">
						{prevstepFormGroupControl}
					</div>
					<div className="float-end pt-3 mx-2">{nextstepFormGroupControl}</div>
				</>
			)}
		</Form.Group>
	);
	return app;
}

export default NavigationStepBtnFormGroupControl;
