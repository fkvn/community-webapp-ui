import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Checkbox, Form, Input, PageHeader } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { imageThainowLogoRound } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AGREEMENT_PROP,
	EMAIL_PROP,
	LOCATION_OBJ,
	ON_CLOSE_URL,
	OTP_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	PLACEID_PROP,
	USERNAME_PROP,
	WEBSITE_PROP,
} from "../../Util/ConstVar";

import { formatOtpNumber, formatPhoneNumber } from "../../Util/Util";
import useGoogleAutoComplete from "./useGoogleAutoComplete";

function useFormControl() {
	const navigate = useNavigate();
	const location = useLocation();
	const onCloseUrl = location?.state?.[`${ON_CLOSE_URL}`] || "/";

	const pageHeader = (props = {}, onClose = async () => {}) =>
		((props = {}) => <PageHeader {...props} />)({
			className: "form-title ",
			ghost: false,
			title: "ThaiNow Registration",
			backIcon: false,
			avatar: {
				shape: "circle",
				size: "large",
				src: imageThainowLogoRound,
				onClick: () => navigate("/"),
			},
			extra: (
				<Button
					className="border-0 pt-2"
					icon={<CloseOutlined />}
					onClick={() => onClose().then(() => navigate(onCloseUrl))}
				></Button>
			),
			...props,
		});

	const facebook = {
		title: "Facebook",
		icon: (
			<svg
				width="1.5rem"
				viewBox="0 0 32 33"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="16" cy="16.5" r="14" fill="#0C82EE" />
				<path
					d="M21.2137 20.7816L21.8356 16.8301H17.9452V14.267C17.9452 13.1857 18.4877 12.1311 20.2302 12.1311H22V8.76699C22 8.76699 20.3945 8.5 18.8603 8.5C15.6548 8.5 13.5617 10.3929 13.5617 13.8184V16.8301H10V20.7816H13.5617V30.3345C14.2767 30.444 15.0082 30.5 15.7534 30.5C16.4986 30.5 17.2302 30.444 17.9452 30.3345V20.7816H21.2137Z"
					fill="white"
				/>
			</svg>
		),
	};

	const google = {
		title: "Google",
		icon: (
			<svg
				width="1.5rem"
				viewBox="0 0 24 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M22.5045 12.7326C22.5045 11.8693 22.433 11.2393 22.2783 10.5859H12.2188V14.4826H18.1235C18.0045 15.4509 17.3616 16.9093 15.933 17.8892L15.913 18.0197L19.0936 20.4344L19.314 20.4559C21.3377 18.6242 22.5045 15.9292 22.5045 12.7326Z"
					fill="#4285F4"
				/>
				<path
					d="M12.212 23.0015C15.1048 23.0015 17.5334 22.0682 19.3072 20.4582L15.9263 17.8914C15.0215 18.5098 13.8072 18.9414 12.212 18.9414C9.37874 18.9414 6.974 17.1098 6.11678 14.5781L5.99113 14.5886L2.68388 17.0969L2.64062 17.2148C4.4025 20.6448 8.02155 23.0015 12.212 23.0015Z"
					fill="#34A853"
				/>
				<path
					d="M6.119 14.5755C5.89281 13.9222 5.76191 13.2221 5.76191 12.4988C5.76191 11.7754 5.89281 11.0755 6.1071 10.4221L6.10111 10.283L2.75239 7.73438L2.64283 7.78545C1.91667 9.2088 1.5 10.8072 1.5 12.4988C1.5 14.1905 1.91667 15.7888 2.64283 17.2121L6.119 14.5755Z"
					fill="#FBBC05"
				/>
				<path
					d="M12.2121 6.05997C14.224 6.05997 15.5811 6.91163 16.3549 7.62335L19.3787 4.73C17.5216 3.03834 15.1049 2 12.2121 2C8.02158 2 4.40251 4.35665 2.64062 7.78662L6.1049 10.4233C6.97403 7.89166 9.37878 6.05997 12.2121 6.05997Z"
					fill="#EB4335"
				/>
			</svg>
		),
	};

	const apple = {
		title: "Apple",
		icon: (
			<svg
				width="1.5rem"
				viewBox="0 0 28 29"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M28 14.5C28 22.228 21.735 28.5 14 28.5C6.265 28.5 0 22.228 0 14.5C0 6.765 6.265 0.5 14 0.5C21.735 0.5 28 6.765 28 14.5Z"
					fill="#333333"
				/>
				<path
					d="M20.5621 10.9574C20.4857 11.002 18.6671 11.9425 18.6671 14.0279C18.7528 16.4061 20.9621 17.2401 21 17.2401C20.9621 17.2847 20.6665 18.3763 19.7907 19.5205C19.0956 20.5062 18.3242 21.5 17.1528 21.5C16.0385 21.5 15.6385 20.8431 14.3528 20.8431C12.972 20.8431 12.5813 21.5 11.5242 21.5C10.3528 21.5 9.52419 20.453 8.79127 19.4766C7.8391 18.1986 7.02978 16.1931 7.00121 14.2675C6.98195 13.2471 7.19189 12.244 7.72481 11.3921C8.47699 10.2026 9.81985 9.39524 11.2863 9.36862C12.4099 9.33331 13.4099 10.0875 14.0956 10.0875C14.7528 10.0875 15.9814 9.36862 17.3714 9.36862C17.9714 9.36919 19.5714 9.53762 20.5621 10.9574ZM14.0006 9.16488C13.8006 8.23303 14.3528 7.30119 14.8671 6.70677C15.5242 5.98792 16.5621 5.5 17.4571 5.5C17.5143 6.43185 17.1522 7.34575 16.505 8.01136C15.9242 8.73021 14.9242 9.27138 14.0006 9.16488Z"
					fill="white"
				/>
			</svg>
		),
	};

	const accessByFacebook = (buttonProps = {}, contentProps = {}) =>
		((props = {}, contentProps = {}) => (
			<Button {...props}>
				<div {...contentProps}>{facebook.title}</div>
			</Button>
		))(
			{
				type: "ghost",
				className: "tedkvn-center text-center bg-white p-3",
				shape: "round",
				icon: facebook.icon,
				size: "large",
				style: { lineHeight: "5rem" },
				...buttonProps,
			},
			{
				className: "d-none d-md-block mx-2",
				...contentProps,
			}
		);

	const accessByGoogle = (buttonProps = {}, contentProps = {}) =>
		((props = {}, contentProps = {}) => (
			<Button {...props}>
				<div {...contentProps}>{google.title}</div>
			</Button>
		))(
			{
				type: "ghost",
				className: "tedkvn-center text-center bg-white p-3",
				shape: "round",
				icon: google.icon,
				size: "large",
				style: { lineHeight: "5rem" },
				...buttonProps,
			},
			{
				className: "d-none d-md-block mx-2",
				...contentProps,
			}
		);

	const accessByApple = (buttonProps = {}, contentProps = {}) =>
		((props = {}, contentProps = {}) => (
			<Button {...props}>
				<div {...contentProps}>{apple.title}</div>
			</Button>
		))(
			{
				type: "ghost",
				className: "tedkvn-center text-center bg-white p-3",
				shape: "round",
				icon: apple.icon,
				size: "large",
				style: { lineHeight: "5rem" },
				...buttonProps,
			},
			{
				className: "d-none d-md-block mx-2",
				...contentProps,
			}
		);

	const username = (itemProps = {}, inputProps = {}) =>
		((props = {}, inputProps = {}) => (
			<Form.Item {...props}>
				<Input {...inputProps} />
			</Form.Item>
		))(
			{
				name: USERNAME_PROP,
				label: "What should we call you?",
				className: "m-0",
				rules: [{ required: true, message: "Name is required" }],
				...itemProps,
			},
			{
				placeholder: "Preferred Name",
				...inputProps,
			}
		);

	const password = (itemProps = {}, inputProps = {}) =>
		((props = {}, inputProps = {}) => (
			<Form.Item {...props}>
				<Input.Password {...inputProps} />
			</Form.Item>
		))(
			{
				label: "Password",
				name: PASSWORD_PROP,
				rules: [
					{ required: true, message: "Please input your password!" },
					{
						pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/,
						message:
							"Use 8 to 20 characters with 1 uppercase, 1 lowercase, and 1 number ",
					},
				],
				hasFeedback: true,
				shouldUpdate: true,
				...itemProps,
			},
			{
				placeholder: "Preferred Name",
				...inputProps,
			}
		);

	const agreement = () => (
		<>
			<Form.Item
				shouldUpdate
				name={AGREEMENT_PROP}
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

	const email = (itemProps = {}, inputProps = {}, required = true) =>
		((props = {}, inputProps = {}) => (
			<Form.Item {...props}>
				<Input {...inputProps} />
			</Form.Item>
		))(
			{
				name: EMAIL_PROP,
				label: "Email Address",
				className: "m-0",
				rules: [
					{
						type: "email",
						message: "The input is not valid E-mail!",
					},
					{
						required: required,
						message: "Please input your E-mail!",
					},
				],
				...itemProps,
			},
			{
				placeholder: "Enter your email address",
				...inputProps,
			}
		);

	const phone = (itemProps = {}, inputProps = {}) =>
		((props = {}, inputProps = {}) => (
			<Form.Item {...props}>
				<Input {...inputProps} />
			</Form.Item>
		))(
			{
				name: PHONE_PROP,
				label: "Phone Number (US)",
				className: "m-0",
				normalize: (value) => formatPhoneNumber(value),
				rules: [
					{ required: true, message: "Please input your phone number!" },
					{
						min: 14,
						max: 14,
						message: "Please input a valid US phone number",
					},
				],
				...itemProps,
			},
			{
				placeholder: "Enter your phone number",
				addonBefore: "+1",
				maxLength: 14,
				...inputProps,
			}
		);

	const otp = (itemProps = {}, inputProps = {}) =>
		((props = {}, inputProps = {}) => (
			<Form.Item {...props}>
				<Input {...inputProps} />
			</Form.Item>
		))(
			{
				name: OTP_PROP,
				label: "OTP Verofocatopn Code (4-digits)",
				className: "m-0",
				normalize: (value) => {
					const [formattedValue] = formatOtpNumber(value);
					return formattedValue;
				},
				rules: [
					{
						validator: (_, value) =>
							value.replace(/[^\d]/g, "").length === 4
								? Promise.resolve()
								: Promise.reject(
										new Error("Verification code must have 4-digits!")
								  ),
					},
				],
				...itemProps,
			},
			{
				placeholder: "Enter 4-digits OTP code",
				maxLength: 7,
				...inputProps,
			}
		);

	/* options = [{label: "", value: ""}] */
	const autoComplete = (
		{ rules = [], ...itemProps },
		inputProps = {},
		options = [],
		required = false,
		errorMessage = "Please input a value!"
	) =>
		((props = {}, inputProps = {}) => (
			<Form.Item {...props}>
				<AutoComplete {...inputProps} />
			</Form.Item>
		))(
			{
				className: "m-0",
				rules: [
					{
						required: required,
						message: errorMessage,
					},
					...rules,
				],
				...itemProps,
			},
			{
				style: { width: 200 },
				options: options,
				className: "w-100",
				placeholder: "Search here",
				filterOption: (inputValue, option) =>
					option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
				...inputProps,
			}
		);

	const { fetchPredictions } = useGoogleAutoComplete();
	const [address, setAddress] = useState({
		location: {
			[`${ADDRESS_PROP}`]: "",
			[`${PLACEID_PROP}`]: "",
		},
		predictions: [],
	});

	const addressAutoComplete = (
		{ rules = [], ...itemProps },
		inputProps = {},
		required = false,
		errorMessage = "Please enter a valid address"
	) => {
		const onSearch = (searchText = "") => {
			if (searchText !== "") {
				fetchPredictions(searchText).then(({ predictions }) => {
					setAddress({
						...address,
						predictions: predictions.map((prediction) => {
							return {
								label: prediction.description,
								value: prediction.description,
								location: prediction,
							};
						}),
					});
				});
			}
		};

		const onSelect = (_, option = {}) => {
			const location = {
				[`${ADDRESS_PROP}`]: option?.location?.description || "",
				[`${PLACEID_PROP}`]: option?.location?.place_id || "",
			};

			setAddress({ location: { ...location } });
		};

		const onBlur = () => {
			let addressValue = address.location?.[`${ADDRESS_PROP}`] || "";
			let placeidValue = address.location?.[`${PLACEID_PROP}`] || "";

			const validLocation =
				addressValue === "" || (addressValue !== "" && placeidValue !== "");

			if (!validLocation) {
				setAddress({
					value: "",
				});
			}
		};

		return (
			<>
				{/* this is to collect custom location object */}
				<Form.Item name={LOCATION_OBJ} hidden className="d-none">
					<Input value={address.location} />
				</Form.Item>

				{autoComplete(
					{
						name: ADDRESS_PROP,
						rules: [
							({ setFieldValue }) => ({
								validator(_, value) {
									const location = value === "" ? {} : address.location || {};
									setFieldValue(LOCATION_OBJ, location);

									if (required && value === "") return Promise.reject();
									else return Promise.resolve();
								},
							}),
							...rules,
						],
						...itemProps,
					},
					{
						children: (
							<Input
								className="rounded-0"
								allowClear={{
									clearIcon: <CloseCircleOutlined />,
								}}
							/>
						),
						options: address.predictions || [],
						onSelect: onSelect,
						onSearch: onSearch,
						onBlur: onBlur,
						placeholder: "street, city, zipcode, or state",
						...inputProps,
					},
					[],
					required,
					errorMessage
				)}
			</>
		);
	};

	const url = (
		{ rules = [], ...itemProps },
		inputProps = {},
		required = false
	) =>
		((props = {}, inputProps = {}) => (
			<Form.Item {...props}>
				<Input {...inputProps} />
			</Form.Item>
		))(
			{
				name: WEBSITE_PROP,
				className: "m-0 ",
				rules: [
					{ required: required, message: "Please input your password!" },
					{
						pattern:
							/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
						message: "Please provide a valid domain with http(s)://",
					},
				],
				shouldUpdate: true,
				...itemProps,
			},
			{
				className: "rounded-0",
				placeholder: "Enter a valid domain with http(s)://",
				...inputProps,
			}
		);

	return {
		pageHeader,
		accessByFacebook,
		accessByGoogle,
		accessByApple,
		username,
		password,
		agreement,
		email,
		phone,
		otp,
		autoComplete,
		addressAutoComplete,
		url,
	};
}

export default useFormControl;
