import { Button, Checkbox, Form, Space } from "antd";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import {
	COMPANY_INDUSTRY_LIST,
	COMPANY_INDUSTRY_PROP,
	COMPANY_NAME_PROP,
	EMAIL_PROP,
	LOCATION_OBJ,
	NAME_PROP,
	PHONE_PROP,
	THAINOW_USER_OBJ,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import { validateToken } from "../../Util/Util";
import BusinessSignupFormBody from "../Form/FormLayout/BusinessSignupFormBody";
import useAuth from "../Hook/useAuth";
import useFormControl from "../Hook/useFormControl";

function BusinessSignup({
	stepHandlers = [],
	onSelectVerifyMethod = () => {},
}) {
	const id = "businessSignup";

	const FormBody = {
		id: id,
		FormComponent: BusinessSignupFormBody,
		onSelectVerifyMethod: onSelectVerifyMethod,
	};

	const [form] = Form.useForm();

	const [register, setRegister] = useState(false);

	const [registering, setRegistering] = useState(false);

	const { profile } = useAuth();

	const { username, autoComplete, addressAutoComplete, phone, email, url } =
		useFormControl();

	const [hasLocation, setHasLocation] = useState(true);

	const title = (
		<div className="w-100 text-center">
			<p className="fs-2">
				Register a <span style={{ color: "#E94833" }}>Business</span> Profile
			</p>
			<p className="fs-5">
				Hi <strong>{profile.info[`${NAME_PROP}`]}</strong>
			</p>
			<p>Please enter your business information</p>
		</div>
	);

	const fetchRegisterInfo = () => {
		const name = form.getFieldValue(COMPANY_NAME_PROP);
		const industry = form.getFieldValue(COMPANY_INDUSTRY_PROP);
		const location = { ...form.getFieldValue(LOCATION_OBJ) };

		const extraInfo = {
			...(!hasLocation && {
				email: form.getFieldValue(EMAIL_PROP) || "",
				website: form.getFieldValue(WEBSITE_PROP) || "",
				phone: form.getFieldValue(PHONE_PROP),
				isInformal: true,
			}),
		};

		const registerInfo = {
			name: name,
			industry: industry,
			...location,
			...extraInfo,
		};

		return registerInfo;
	};

	const renderForm = () => (
		<Space direction="vertical" className="my-2 w-100" size={20}>
			{title}
			{username(
				{ name: COMPANY_NAME_PROP, label: "Business Name" },
				{ placeholder: "Enter your business name" }
			)}
			{autoComplete(
				{ name: COMPANY_INDUSTRY_PROP, label: "Business Industry" },
				{ placeholder: "Enter your business Industry" },
				COMPANY_INDUSTRY_LIST.reduce(
					(res, item) => [...res, { value: item }],
					[]
				),
				true,
				"Please provide a business industry"
			)}
			{!hasLocation && phone({ label: "Business Phone Number " })}
			{addressAutoComplete(
				{
					label: hasLocation
						? "Business Location"
						: "Business Service Area (Optional)",
					...(!hasLocation && {
						extra: (
							<div className="py-2 text-danger">
								<small>
									If no service area is selected, people hardly search for
									business
								</small>
							</div>
						),
					}),
					shouldUpdate: true,
				},
				{},
				hasLocation
			)}
			<Checkbox
				onChange={() => {
					form.validateFields();
					setHasLocation(!hasLocation);
				}}
			>
				My business doesn’t have a physical location
			</Checkbox>
			{!hasLocation && email({ label: "Business Email (Optional)" }, {}, false)}
			{!hasLocation && url({ label: "Business Website Address" })}
			<Form.Item className="my-2">
				<Button
					type="primary"
					disabled={registering}
					onClick={() =>
						form
							.validateFields()
							.then(() => {
								const thaiNowObj = localStorage.getItem(THAINOW_USER_OBJ) || {};
								let access_token = JSON.parse(thaiNowObj)["access_token"] || "";
								validateToken(access_token);

								// setRegistering(true);
								console.log("registered");
								console.log(fetchRegisterInfo());
							})
							.catch(() => {})
					}
					block
				>
					Register
				</Button>
			</Form.Item>
		</Space>
	);

	const app = (
		<Stack className="py-5  tedkvn-center mx-4">
			<Form
				form={form}
				layout="vertical"
				className="mx-2 mx-xl-5"
				autoComplete="off"
			>
				<Space direction="vertical" size={20}>
					{!register ? <>{renderForm()}</> : <>Register Success</>}
				</Space>
			</Form>
		</Stack>
	);

	return app;
}

export default BusinessSignup;
