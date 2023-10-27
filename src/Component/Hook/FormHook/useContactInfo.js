import { Col, Form, Row } from "antd";
import { useState } from "react";
import {
	CONTACT_INFO_PROP,
	EMAIL_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	PHONE_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import useCheckBox from "./useCheckBox";
import useEmail from "./useEmail";
import usePhone from "./usePhone";
import useUrl from "./useUrl";

function useContactInfo({
	label = "Service Contact Information",
	info = {},
	required = true,
} = {}) {
	const [options, setOptions] = useState({
		[`${EMAIL_PROP}`]: info?.[`${EMAIL_PROP}`] ? true : false,
		[`${PHONE_PROP}`]: info?.[`${PHONE_PROP}`] ? true : false,
		[`${WEBSITE_PROP}`]: info?.[`${WEBSITE_PROP}`] ? true : false,
	});

	const emailOption = useCheckBox({
		itemProps: {
			name: IS_EMAIL_PUBLIC_PROP,
			initialValue: options?.[`${EMAIL_PROP}`] || false,
			rules: [
				{
					validator: (_, value) => {
						setOptions({ ...options, [`${EMAIL_PROP}`]: value });

						return Promise.resolve();
					},
				},
			],
		},
		title: "Email Address",
	});

	const email = useEmail({
		required: options?.[`${EMAIL_PROP}`],
		showLabel: false,
	});

	const emailContact = (
		<Row justify="start" gutter={[10, 10]} className="pb-2">
			<Col>{emailOption}</Col>
			{options?.[`${EMAIL_PROP}`] && <Col flex="auto">{email}</Col>}
		</Row>
	);

	const phoneOption = useCheckBox({
		itemProps: {
			name: IS_PHONE_PUBLIC_PROP,
			initialValue: options?.[`${PHONE_PROP}`] || false,
			rules: [
				{
					validator: (_, value) => {
						setOptions({ ...options, [`${PHONE_PROP}`]: value });
						return Promise.resolve();
					},
				},
			],
		},
		title: "Phone Number (US)",
	});

	const phone = usePhone({
		required: options?.[`${PHONE_PROP}`],
		showLabel: false,
	});

	const phoneContact = (
		<Row justify="start" gutter={[10, 10]} className="pb-2">
			<Col>{phoneOption}</Col>
			{options?.[`${PHONE_PROP}`] && <Col flex="auto">{phone}</Col>}
		</Row>
	);

	const webisteOption = useCheckBox({
		itemProps: {
			name: IS_WEBSITE_PUBLIC_PROP,
			initialValue: options?.[`${WEBSITE_PROP}`] || false,
			rules: [
				{
					validator: (_, value) => {
						setOptions({ ...options, [`${WEBSITE_PROP}`]: value });
						return Promise.resolve();
					},
				},
			],
		},
		title: "Website / Link",
	});

	const website = useUrl({
		required: options?.[`${WEBSITE_PROP}`],
		showLabel: false,
	});

	const websiteContact = (
		<Row justify="start" gutter={[10, 10]} className="pb-2">
			<Col>{webisteOption}</Col>
			{options?.[`${WEBSITE_PROP}`] && <Col flex="auto">{website}</Col>}
		</Row>
	);

	const app = (
		<Form.List
			name={CONTACT_INFO_PROP}
			dependencies={[IS_EMAIL_PUBLIC_PROP, IS_PHONE_PUBLIC_PROP]}
			rules={[
				{
					validator: async (_, value) => {
						const valid =
							value?.[`${IS_EMAIL_PUBLIC_PROP}`] ||
							value?.[`${IS_PHONE_PUBLIC_PROP}`] ||
							value?.[`${IS_WEBSITE_PUBLIC_PROP}`] ||
							false;

						if (!required || valid) {
							return Promise.resolve();
						} else
							return Promise.reject(
								new Error("Must provide at least one contact information")
							);
					},
				},
			]}
		>
			{(_, __, { errors }) => (
				<Form.Item
					className={`m-0 ${required ? "label-required" : ""}`}
					label={
						<span className={`${required ? "required" : ""}`}>{label}</span>
					}
					labelCol={{ span: 24 }}
				>
					{emailContact}
					{phoneContact}
					{websiteContact}
					<Form.ErrorList errors={errors} />
				</Form.Item>
			)}
		</Form.List>
	);

	return app;
}

export default useContactInfo;
