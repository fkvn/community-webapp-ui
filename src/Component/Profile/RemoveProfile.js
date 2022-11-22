import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, List, Popconfirm, Typography } from "antd";
import { useState } from "react";
import {
	AGREEMENT_PROP,
	ID_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_NAME_PROP,
	PROFILE_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
} from "../../Util/ConstVar";
import useProfile from "../Hook/useProfile";

function RemoveProfile({ profile = {}, onRemoveProfile = async () => {} }) {
	const [form] = Form.useForm();

	const { profile: signedProfile } = useProfile();

	const [showRemoveConfirm, setShowRemoveConfirm] = useState({
		[`${ID_PROP}`]: -1,
		confirmLoading: false,
		consent: false,
	});

	const removeTerms =
		profile?.[`${PROFILE_TYPE_PROP}`] === PROFILE_BUSINESS_TYPE_PROP
			? [
					"This profile would be removed permanently.",
					"All information related to this profile would also be removed.",
					"Please review carefully before confirming.",
			  ]
			: profile?.[`${PROFILE_TYPE_PROP}`] === PROFILE_USER_TYPE_PROP
			? [
					"If you remove this profile, your account would also be removed permanently.",
					"All information and profiles (with its information) related to this account would also be removed.",
					"Please review carefully before confirming.",
			  ]
			: [];

	const removeTitle = (
		<>
			<div className="text-danger mb-3" style={{ fontSize: "1rem" }}>
				Remove <strong>{profile?.info?.[`${PROFILE_NAME_PROP}`]}</strong>{" "}
				Profile
			</div>
			{profile?.[`${PROFILE_TYPE_PROP}`] === PROFILE_USER_TYPE_PROP && (
				<Typography.Title level={4}>
					<span className="text-danger">ATTENTION:</span> REMOVE THIS PROFILE
					WOULD{" "}
					<span className="text-danger">
						REMOVE YOUR ACCOUNT AND OTHER PROFILES{" "}
					</span>
					AS WELL.
				</Typography.Title>
			)}
			{removeTerms.length > 0 && (
				<List
					dataSource={removeTerms}
					renderItem={(item, index) => (
						<List.Item>
							<Typography.Text mark>{`${index + 1}: ${item}`}</Typography.Text>
						</List.Item>
					)}
				/>
			)}
			<Form form={form}>
				<Form.Item
					name={profile?.[`${ID_PROP}`] + AGREEMENT_PROP}
					valuePropName="checked"
					rules={[
						{
							validator: (_, value) =>
								value
									? Promise.resolve()
									: Promise.reject(new Error("MUST accept agreement")),
						},
					]}
				>
					<Checkbox>I understant and confirm to remove this account</Checkbox>
				</Form.Item>
			</Form>
		</>
	);

	const app = (
		<Popconfirm
			title={removeTitle}
			icon={<QuestionCircleOutlined className="text-danger mt-1" />}
			open={showRemoveConfirm[`${ID_PROP}`] === profile?.[`${ID_PROP}`]}
			onConfirm={() => {
				form
					.validateFields()
					.then(() => {
						setShowRemoveConfirm({
							...showRemoveConfirm,
							confirmLoading: true,
						});
						onRemoveProfile(profile).then(() =>
							setShowRemoveConfirm({
								...showRemoveConfirm,
								[`${ID_PROP}`]: undefined,
							})
						);
					})
					.catch(() => {})
					.finally(() =>
						setShowRemoveConfirm({
							...showRemoveConfirm,
							confirmLoading: false,
						})
					);
			}}
			okText="Yes, remove please"
			cancelText="No, thanks"
			okButtonProps={{
				type: "danger",
				loading: showRemoveConfirm.confirmLoading,
			}}
			onCancel={() =>
				setShowRemoveConfirm({
					...showRemoveConfirm,
					[`${ID_PROP}`]: undefined,
					confirmLoading: false,
				})
			}
		>
			<Button
				type="link"
				className="text-danger"
				onClick={() =>
					setShowRemoveConfirm({
						...showRemoveConfirm,
						[`${ID_PROP}`]: profile?.[`${ID_PROP}`],
					})
				}
				disabled={signedProfile?.[`${ID_PROP}`] === profile?.[`${ID_PROP}`]}
			>
				Remove Profile
			</Button>
		</Popconfirm>
	);

	return app;
}

export default RemoveProfile;
