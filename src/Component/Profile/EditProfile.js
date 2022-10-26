import { Button, Col, Form, Row, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import {
	getState,
	patchProfileInfoPromise,
} from "../../redux-store/dispatchPromise";
import {
	COMPANY_INDUSTRY_LIST,
	COMPANY_INDUSTRY_PROP,
	COMPANY_NAME_PROP,
	COMPANY_SIZE_LIST,
	COMPANY_SIZE_PROP,
	DEFAULT_USER_INFO,
	DESCRIPTION_PROP,
	EMAIL_PROP,
	FIRSTNAME_PROP,
	ID_PROP,
	INFO_PROP,
	IS_COMPANY_INFORMAL_PROP,
	IS_DESCRIPTION_PUBLIC_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_LOCATION_PUBLIC,
	IS_PHONE_PUBLIC_PROP,
	IS_SIZE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LASTNAME_PROP,
	LOCATION_OBJ,
	LOCATION_PROP,
	NAME_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_OBJ,
	PROFILE_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
	SIZE_PROP,
	USERNAME_PROP,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import useAddress from "../Hook/FormHook/useAddress";
import useAutocomplete from "../Hook/FormHook/useAutocomplete";
import useCheckBox from "../Hook/FormHook/useCheckBox";
import useEmail from "../Hook/FormHook/useEmail";
import usePhone from "../Hook/FormHook/usePhone";
import usePictureWall from "../Hook/FormHook/UsePictureWall";
import useTextarea from "../Hook/FormHook/useTextarea";
import useUrl from "../Hook/FormHook/useUrl";
import useUsername from "../Hook/FormHook/useUsername";
import useImage from "../Hook/useImage";
import useProfile from "../Hook/useProfile";

function EditProfile({ profile = {} }) {
	const [form] = useForm();
	const {
		[`${ID_PROP}`]: id = -1,
		[`${PROFILE_TYPE_PROP}`]: type = "",
		[`${INFO_PROP}`]: info,
	} = {
		...profile,
		[`${INFO_PROP}`]: { ...DEFAULT_USER_INFO, ...profile?.[`${INFO_PROP}`] },
	};

	const [updating, setUpdating] = useState(false);

	const [picture, setPicture] = useState(info?.[`${PICTURE_PROP}`]);

	const { uploadProfileAvatar, patchUserProfile, patchBusinessProfile } =
		useProfile();

	const { avatar } = useImage();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	const header = (
		<Row justify="center" className="text-center">
			<Col>
				<Typography.Title level={5} type="danger">
					Please review carefully and click "Update and Save" after updating the
					profile information
				</Typography.Title>
			</Col>
		</Row>
	);

	const avatarRender = (
		<Row justify="center" className="mt-4">
			<Col>
				{avatar({
					inputProps: { src: picture, size: 180 },
					editable: true,
					uploadProps: {
						uploadIconStyle: {
							right: 20,
							bottom: 10,
						},
					},
					uploadPhotoOnClick: (formData = new FormData()) =>
						uploadProfileAvatar(id, formData).then((url) => setPicture(url)),
				})}
			</Col>
		</Row>
	);

	const username = useUsername({
		itemProps: {
			...(type === PROFILE_BUSINESS_TYPE_PROP && {
				label: "Business Name",
				name: COMPANY_NAME_PROP,
			}),
			initialValue: info?.[`${NAME_PROP}`] || "",
		},

		...(type === PROFILE_BUSINESS_TYPE_PROP && {
			inputProps: {
				placeholder: "Business name",
			},
		}),
	});

	const firstname = useUsername({
		itemProps: {
			name: FIRSTNAME_PROP,
			label: "First Name",
			initialValue: info?.[`${FIRSTNAME_PROP}`] || "",
		},
		inputProps: {
			placeholder: "First Name",
		},
		required: false,
	});

	const lastname = useUsername({
		itemProps: {
			name: LASTNAME_PROP,
			label: "Last Name",
			initialValue: info?.[`${LASTNAME_PROP}`] || "",
		},
		inputProps: {
			placeholder: "Last Name",
		},
		required: false,
	});

	const industry = useAutocomplete({
		itemProps: {
			name: COMPANY_INDUSTRY_PROP,
			label: "Business Industry",
			initialValue: info?.[`${COMPANY_INDUSTRY_PROP}`],
		},
		inputProps: {
			placeholder: "Enter your business Industry",
		},
		options: COMPANY_INDUSTRY_LIST.reduce(
			(res, item) => [...res, { value: item }],
			[]
		),
		required: true,
		errorMessage: "Please provide a business industry",
	});

	const coverPictures = usePictureWall({
		form: form,
		itemProps: {
			label:
				(type === PROFILE_BUSINESS_TYPE_PROP ? "Business " : "") +
				"Cover pictures",
		},
		[`${PICTURE_LIST_PROP}`]: (info?.[`${PICTURE_LIST_PROP}`] || []).map(
			(res) => {
				return { url: res };
			}
		),
		cropAspect: 16 / 9,
	});

	const isLocationPublic = useCheckBox({
		itemProps: {
			name: IS_LOCATION_PUBLIC,
			initialValue: info?.[`${IS_LOCATION_PUBLIC}`] || false,
		},
		title: "Public your address",
	});

	const address = (
		<Row justify="start" gutter={[50, 10]}>
			<Col {...(type === PROFILE_BUSINESS_TYPE_PROP && { xs: 24 })}>
				{useAddress({
					itemProps: {
						label:
							type === PROFILE_USER_TYPE_PROP
								? "Address"
								: "Business Address / Service Area",
						extra: (
							<Typography.Text type="danger" ellipsis>
								<small>
									{type === PROFILE_USER_TYPE_PROP
										? "The address would help the system to suggest better local services."
										: "If no address is selected, people hardly search for business"}
								</small>
							</Typography.Text>
						),
						shouldUpdate: true,
					},
					inputProps: { prefix: "" },
					required: false,
					defaultLocation: info?.[`${LOCATION_PROP}`] || {},
				})}
			</Col>
			{type === PROFILE_USER_TYPE_PROP &&
				!isEmptyObject(info?.[`${LOCATION_PROP}`]) && (
					<Col>{isLocationPublic}</Col>
				)}
		</Row>
	);

	const isEmailPublic = useCheckBox({
		itemProps: {
			name: IS_EMAIL_PUBLIC_PROP,
			initialValue: info?.[`${IS_EMAIL_PUBLIC_PROP}`] || false,
		},
		title: "Public email address",
	});

	const email = (
		<Row justify="start" gutter={[50, 10]}>
			<Col>
				{useEmail({
					itemProps: {
						label:
							(type === PROFILE_BUSINESS_TYPE_PROP ? "Business " : "") +
							"Email Address",
						initialValue: info?.[`${EMAIL_PROP}`] || "",
						extra: (
							<Typography.Text type="warning" ellipsis>
								<small>
									Each user profile requires at least one email or phone number
								</small>
							</Typography.Text>
						),
					},
					required: false,
				})}
			</Col>
			<Col>{info?.[`${EMAIL_PROP}`] && isEmailPublic}</Col>
		</Row>
	);

	const isPhonePublic = useCheckBox({
		itemProps: {
			name: IS_PHONE_PUBLIC_PROP,
			initialValue: info?.[`${IS_PHONE_PUBLIC_PROP}`] || false,
		},
		title: "Public phone number",
	});

	const phone = (
		<Row justify="start" gutter={[50, 10]}>
			<Col>
				{usePhone({
					itemProps: {
						label:
							(type === PROFILE_BUSINESS_TYPE_PROP ? "Business " : "") +
							"Phone Number",
						initialValue: info?.[`${PHONE_PROP}`] || "",
						extra: (
							<Typography.Text type="warning" ellipsis>
								<small>
									Each user profile requires at least one email or phone number
								</small>
							</Typography.Text>
						),
					},
					required: false,
				})}
			</Col>
			<Col>{info?.[`${PHONE_PROP}`] && isPhonePublic}</Col>
		</Row>
	);

	const isDescriptionPublic = useCheckBox({
		itemProps: {
			name: IS_DESCRIPTION_PUBLIC_PROP,
			initialValue: info?.[`${IS_DESCRIPTION_PUBLIC_PROP}`] || false,
		},
		title: "Public description",
	});

	const description = (
		<Row justify="start" gutter={[50, 10]}>
			<Col xs={24}>
				{useTextarea({
					itemProps: {
						label:
							(type === PROFILE_BUSINESS_TYPE_PROP ? "Business " : "") +
							"Profile Description",
						initialValue: info?.[`${DESCRIPTION_PROP}`] || "",
					},
				})}
			</Col>
			<Col>{info?.[`${DESCRIPTION_PROP}`] && isDescriptionPublic}</Col>
		</Row>
	);

	const isWebsitePublic = useCheckBox({
		itemProps: {
			name: IS_WEBSITE_PUBLIC_PROP,
			initialValue: info?.[`${IS_WEBSITE_PUBLIC_PROP}`] || false,
		},
		title: "Public website address",
	});

	const website = (
		<Row justify="start" gutter={[50, 10]}>
			<Col>
				{useUrl({
					itemProps: {
						label:
							(type === PROFILE_BUSINESS_TYPE_PROP ? "Business " : "") +
							"Website Address",
						initialValue: info?.[`${WEBSITE_PROP}`] || "",
					},
				})}
			</Col>
			<Col>{info?.[`${WEBSITE_PROP}`] && isWebsitePublic}</Col>
		</Row>
	);

	const isSizePublic = useCheckBox({
		itemProps: {
			name: IS_SIZE_PUBLIC_PROP,
			initialValue: info?.[`${IS_SIZE_PUBLIC_PROP}`] || false,
		},
		title: "Public company size",
	});

	const size = (
		<Row justify="start" gutter={[50, 10]}>
			<Col flex="auto">
				{useAutocomplete({
					itemProps: {
						name: COMPANY_SIZE_PROP,
						label: "Business Size",
						initialValue: info?.[`${COMPANY_SIZE_PROP}`],
					},
					inputProps: {
						placeholder: "Enter your business size",
					},
					options: COMPANY_SIZE_LIST.reduce(
						(res, item) => [...res, { value: item }],
						[]
					),
					required: false,
					errorMessage: "Please provide a business size ",
				})}
			</Col>
			<Col>{info?.[`${SIZE_PROP}`] && isSizePublic}</Col>
		</Row>
	);

	const submitHandle = () => {
		const info = {
			...form.getFieldsValue(),
			...form.getFieldValue(LOCATION_OBJ),
			...(isEmptyObject(form.getFieldValue(LOCATION_OBJ)) && {
				[`${IS_COMPANY_INFORMAL_PROP}`]: true,
			}),
		};

		form
			.validateFields()
			.then(() =>
				type === PROFILE_USER_TYPE_PROP
					? patchUserProfile(id, info)
					: type === PROFILE_BUSINESS_TYPE_PROP
					? patchBusinessProfile(id, info)
					: Promise.reject("Update profile failed")
			)
			.then(() => {
				let signedProfile = getState()?.[`${PROFILE_OBJ}`];

				if (signedProfile?.[`${ID_PROP}`] === Number(id)) {
					signedProfile[`${INFO_PROP}`][`${NAME_PROP}`] =
						type === PROFILE_USER_TYPE_PROP
							? form.getFieldValue(USERNAME_PROP)
							: type === PROFILE_BUSINESS_TYPE_PROP
							? form.getFieldValue(COMPANY_NAME_PROP)
							: "";

					patchProfileInfoPromise(signedProfile, true).then(() =>
						localStorage.setItem(PROFILE_OBJ, JSON.stringify(signedProfile))
					);
				}
			})
			.then(() => setUpdating(false));
	};

	const infoForm = (
		<Form
			className="my-4 "
			form={form}
			onFinish={submitHandle}
			onFieldsChange={() => setUpdating(true)}
		>
			<Space size={15} direction="vertical" className="w-100 my-2 my-xl-4 ">
				{username}
				{type === PROFILE_USER_TYPE_PROP && firstname}
				{type === PROFILE_USER_TYPE_PROP && lastname}
				{type === PROFILE_BUSINESS_TYPE_PROP && industry}
				{coverPictures}
				{address}
				{email}
				{phone}
				{description}
				{website}
				{type === PROFILE_BUSINESS_TYPE_PROP && size}
				<Row justify="center" className="mt-4">
					<Col>
						<Button
							type="primary"
							size="large"
							shape="round"
							block
							htmlType="submit"
							disabled={!updating}
						>
							Update and Save
						</Button>
					</Col>
				</Row>
			</Space>
		</Form>
	);

	const app = (
		<Row justify="center" className="m-4 m-xl-5">
			<Col>
				{header}
				{avatarRender}
				{infoForm}
			</Col>
		</Row>
	);
	return app;
}

export default EditProfile;
