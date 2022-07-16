import { Form } from "react-bootstrap";

function AgreementFormControl({ withAdsAgreement = true }) {
	const app = (
		<>
			<Form.Check
				type="checkbox"
				label={
					<>
						By creating an account, you agree to ThaiNow's{" "}
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
			{withAdsAgreement && (
				<Form.Check
					type="checkbox"
					label={
						<>
							By creating an account, you consent to receive SMS messages and
							emails, including new feature updates, events, and marketing
							promotions.
						</>
					}
					defaultChecked="true"
					required
				/>
			)}
		</>
	);

	return app;
}

export default AgreementFormControl;
