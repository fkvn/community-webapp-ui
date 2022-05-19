import React from "react";
import { Form } from "react-bootstrap";

function AgreementFormControl() {
	const app = (
		<Form.Check
			type="checkbox"
			label={
				<>
					By continuing, you agree to ThaiNow's{" "}
					<a
						href="https://terms.thainowapp.com/"
						target="_blank"
						className="text-decoration-none"
						rel="noreferrer"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="https://policy.thainowapp.com/"
						target="_blank"
						className="text-decoration-none"
						rel="noreferrer"
					>
						Privacy Policy
					</a>
				</>
			}
			defaultChecked="true"
			required
			className="pt-3"
		/>
	);

	return app;
}

export default AgreementFormControl;
