import { Checkbox, Form } from "antd";

function AgreementFormControl({ withAdsAgreement = true }) {
	const app = (
		<>
			<Form.Item
				shouldUpdate
				name="agreement"
				valuePropName="checked"
				rules={[
					{
						validator: (_, value) =>
							value
								? Promise.resolve()
								: Promise.reject(
										new Error(
											"You must accept ThaiNow terms agreement and privacy policy to register!"
										)
								  ),
					},
				]}
			>
				<Checkbox>
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
				</Checkbox>
			</Form.Item>
			{/* {withAdsAgreement && (
				<Form.Item name="ads-agreement" valuePropName="checked">
					<Checkbox>
						By creating an account, you consent to receive SMS messages and
						emails, including new feature updates, events, and marketing
						promotions.
					</Checkbox>
				</Form.Item>
			)} */}
		</>
	);

	return app;
}

export default AgreementFormControl;
