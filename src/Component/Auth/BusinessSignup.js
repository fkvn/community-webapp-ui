import { Button, Checkbox, Col, Form, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imageSuccess } from "../../Assest/Asset";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import {
	COMPANY_INDUSTRY_LIST,
	COMPANY_INDUSTRY_PROP,
	COMPANY_NAME_PROP,
	EMAIL_PROP,
	FORWARD_SUCCESS,
	LOCATION_OBJ,
	NAME_PROP,
	PHONE_PROP,
	PROFILE_OBJ,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import useAddress from "../Hook/FormHook/useAddress";
import useAutocomplete from "../Hook/FormHook/useAutocomplete";
import useEmail from "../Hook/FormHook/useEmail";
import usePhone from "../Hook/FormHook/usePhone";
import useUrl from "../Hook/FormHook/useUrl";
import useUsername from "../Hook/FormHook/useUsername";
import useImage from "../Hook/useImage";
import useRegister from "../Hook/useRegister";
import useUrls from "../Hook/useUrls";

function BusinessSignup() {
	const navigate = useNavigate();

	const { forwardUrl } = useUrls();

	const [form] = Form.useForm();

	const [register, setRegister] = useState(false);

	const [registering, setRegistering] = useState(false);

	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(thainowReducer);

	const [hasLocation, setHasLocation] = useState(true);

	const title = (
		<Row justify="center">
			<Col className="text-center">
				<Typography.Title level={2}>
					Register a <span style={{ color: "#E94833" }}>Business</span> Profile
				</Typography.Title>
				<Typography.Title level={4}>
					{" "}
					Hi, <strong>{profile?.info?.[`${NAME_PROP}`]} </strong>
				</Typography.Title>

				<p style={{ fontSize: "1rem", paddingTop: "1rem" }}>
					Please enter your business information
				</p>
			</Col>
		</Row>
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

	const name = useUsername({
		itemProps: { name: COMPANY_NAME_PROP, label: "Business Name" },
		inputProps: { placeholder: "" },
	});

	const industry = useAutocomplete({
		itemProps: {
			name: COMPANY_INDUSTRY_PROP,
			label: "Business Industry",
		},
		inputProps: {
			filterOption: (inputValue, option) =>
				option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
		},
		options: COMPANY_INDUSTRY_LIST.reduce(
			(res, item) => [...res, { value: item }],
			[]
		),
		required: true,
		errorMessage: "Please provide a business industry",
	});

	const address = useAddress({
		itemProps: {
			label: hasLocation ? "Business Location" : "Business Service Area",
			...(!hasLocation && {
				extra: (
					<div className="py-2 text-danger">
						<small>
							If no service area is selected, people hardly search for business
						</small>
					</div>
				),
			}),
			shouldUpdate: true,
		},
		inputProps: {
			prefix: false,
			placeholder: "",
		},
		required: hasLocation,
	});

	const email = useEmail({
		itemProps: {
			label: "Business Email",
		},
		inputProps: {
			placeholder: "",
		},
		required: false,
	});

	const phone = usePhone({
		itemProps: { label: "Business Phone Number " },
		inputProps: {
			placeholder: "",
		},
	});

	const website = useUrl({
		inputProps: {
			placeholder: "",
		},
	});

	const { businessRegister } = useRegister();

	const onRegister = () => {
		setRegistering(true);
		form
			.validateFields()
			.then(() =>
				form
					.validateFields()
					.then(() =>
						businessRegister(fetchRegisterInfo()).then(() => setRegister(true))
					)
			)
			.finally(() => setRegistering(false));
	};

	const renderForm = (
		<Space direction="vertical" className="my-2 w-100" size={20}>
			{title}
			{name}
			{industry}
			{!hasLocation && phone}
			{address}
			<Checkbox
				onChange={() => {
					form.validateFields();
					setHasLocation(!hasLocation);
				}}
				style={{
					margin: ".5rem 0",
					fontSize: "1rem",
				}}
			>
				My business doesn’t have a physical location
			</Checkbox>
			{!hasLocation && email}
			{!hasLocation && website}
			<Form.Item className="my-2">
				<Button
					type="primary"
					disabled={registering}
					onClick={onRegister}
					block
					style={{
						fontSize: "1rem",
						marginTop: "1rem",
						padding: "1.4rem",
						borderRadius: "1rem",
					}}
				>
					Register
				</Button>
			</Form.Item>
		</Space>
	);

	const { image } = useImage();

	const registedSuccess = register && (
		<Space direction="vertical" className="text-center">
			{image({
				src: imageSuccess,
				width: 200,
				className: "rounded-circle my-3",
			})}

			<Typography.Title level={2}>
				Thanks, {profile?.info?.[`${NAME_PROP}`]}
			</Typography.Title>

			<p style={{ fontSize: "1rem" }}>
				Now, your Business{" "}
				<strong>{form.getFieldValue(COMPANY_NAME_PROP)} </strong> Registration
				is currently <span className="text-danger">"Waiting For Review"</span>,
				we will contact you soon!
			</p>

			<Button
				type="primary"
				block
				className="p-4 my-4"
				onClick={() => forwardUrl(FORWARD_SUCCESS)}
				style={{
					fontSize: "1rem",
					padding: "1.2rem",
					borderRadius: "1rem",
				}}
			>
				Continue
			</Button>

			<div className="text-center tedkvn-center" style={{ fontSize: "1rem" }}>
				Need Help?{" "}
				<Button
					type="link"
					className="border-0"
					onClick={() => navigate("/helpcenter")}
					style={{ fontSize: "1rem" }}
				>
					Contact Us
				</Button>
			</div>
		</Space>
	);

	const app = (
		<Row id="business-signup" justify="center" className="py-5 px-2">
			<Col>
				<Form
					form={form}
					layout="vertical"
					className="mx-2 mx-xl-5"
					autoComplete="off"
				>
					<Row justify="center">
						<Col>
							<Space direction="vertical" size={20}>
								{!register ? renderForm : registedSuccess}
							</Space>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);

	return app;
}

export default BusinessSignup;
