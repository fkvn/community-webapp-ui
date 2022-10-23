import { Button, Checkbox, Form, Space } from "antd";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { imageSuccess } from "../../Assest/Asset";
import {
	COMPANY_INDUSTRY_LIST,
	COMPANY_INDUSTRY_PROP,
	COMPANY_NAME_PROP,
	EMAIL_PROP,
	FORWARD_SUCCESS,
	LOCATION_OBJ,
	NAME_PROP,
	PHONE_PROP,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import useAddress from "../Hook/FormHook/useAddress";
import useAutocomplete from "../Hook/FormHook/useAutocomplete";
import useEmail from "../Hook/FormHook/useEmail";
import usePhone from "../Hook/FormHook/usePhone";
import useUrl from "../Hook/FormHook/useUrl";
import useUsername from "../Hook/FormHook/useUsername";
import useImage from "../Hook/useImage";
import useProfile from "../Hook/useProfile";
import useRegister from "../Hook/useRegister";
import useUrls from "../Hook/useUrls";

function BusinessSignup() {
	const navigate = useNavigate();

	const { forwardUrl } = useUrls();

	const [form] = Form.useForm();

	const [register, setRegister] = useState(false);

	const [registering, setRegistering] = useState(false);

	const { profile } = useProfile();

	const [hasLocation, setHasLocation] = useState(true);

	const title = (
		<div className="w-100 text-center">
			<p className="fs-2">
				Register a <span style={{ color: "#E94833" }}>Business</span> Profile
			</p>
			<p className="fs-5">
				Hi <strong>{profile?.info?.[`${NAME_PROP}`]}</strong>
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

	const name = useUsername({
		itemProps: { name: COMPANY_NAME_PROP, label: "Business Name" },
		inputProps: { placeholder: "Enter your business name" },
	});

	const industry = useAutocomplete(
		{ name: COMPANY_INDUSTRY_PROP, label: "Business Industry" },
		{
			filterOption: (inputValue, option) =>
				option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
			placeholder: "Enter your business Industry",
		},
		COMPANY_INDUSTRY_LIST.reduce((res, item) => [...res, { value: item }], []),
		true,
		"Please provide a business industry"
	);

	const address = useAddress({
		itemProps: {
			label: hasLocation
				? "Business Location"
				: "Business Service Area (Optional)",
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
		required: hasLocation,
	});

	const email = useEmail({
		itemProps: {
			label: "Business Email",
		},
		required: false,
	});

	const phone = usePhone({
		itemProps: { label: "Business Phone Number " },
	});

	const website = useUrl({ label: "Business Website Address" });

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
				>
					Register
				</Button>
			</Form.Item>
		</Space>
	);

	const { image } = useImage();

	const registedSuccess = register && (
		<Space direction="vertical" className="my-2 text-center w-100">
			{image({
				src: imageSuccess,
				width: 200,
				className: "rounded-circle my-3",
			})}

			<p className="fs-4 fw-bold">Thanks {profile?.info?.[`${NAME_PROP}`]}</p>
			<p>
				Now, your Business{" "}
				<strong>{form.getFieldValue(COMPANY_NAME_PROP)} </strong> registration
				is currently under <span className="text-danger">review</span>, we will
				contact you soon!
			</p>

			<Button
				type="primary"
				block
				className="p-4 my-4"
				onClick={() => forwardUrl(FORWARD_SUCCESS)}
			>
				Continue
			</Button>

			<div className="text-center tedkvn-center">
				Need Help?{" "}
				<Button
					type="link"
					className="border-0"
					onClick={() => navigate("/helpcenter")}
				>
					Contact Us
				</Button>
			</div>
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
					{!register ? renderForm : registedSuccess}
				</Space>
			</Form>
		</Stack>
	);

	return app;
}

export default BusinessSignup;
