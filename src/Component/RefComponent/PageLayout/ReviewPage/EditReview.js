import { Form, Modal, Rate, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { isEmptyObject } from "jquery";
import moment from "moment";
import { useState } from "react";
import {
	COMMENT_PROP,
	ID_PROP,
	INFO_PROP,
	PICTURE_PROP,
	PROFILE_ID_PROP,
	PROFILE_REVIEW_PROP,
	RATE_PROP,
	REVIEWER_ID_PROP,
	REVIEWER_PROP,
	SERVICE_ID_PROP,
	SERVICE_REVIEW_PROP,
	TYPE_PROP,
	UPDATED_ON_PROP,
} from "../../../Util/ConstVar";
import useTextarea from "../../Hook/FormHook/useTextarea";
import useImage from "../../Hook/useImage";
import useReview from "../../Hook/useReview";

function EditReview({
	type = "",
	revieweeId = "",
	profile = {},
	open = false,
	review: {
		[`${REVIEWER_PROP}`]: { [`${ID_PROP}`]: reviewerId = null } = {},
		...review
	} = {},

	editing = true,
	onOk = () => {},
	onCancel = () => {},
	zIndex = 1000,
} = {}) {
	const [form] = useForm();

	const [confirmLoading, setConfirmLoading] = useState(false);

	const { avatar } = useImage();

	const { createReview, patchReview } = useReview();

	const dispatchReview = (info = {}, id = null) => {
		if (editing) return patchReview(id, info);
		else return createReview(info);
	};

	const handleOk = () =>
		form
			.validateFields()
			.then(() => {
				setConfirmLoading(true);

				const info = editing
					? {
							...review,
							[`${REVIEWER_ID_PROP}`]: reviewerId,
							...form.getFieldsValue(),
					  }
					: {
							[`${TYPE_PROP}`]: type,
							[`${REVIEWER_ID_PROP}`]: profile?.[`${ID_PROP}`],
							...(type === PROFILE_REVIEW_PROP
								? { [`${PROFILE_ID_PROP}`]: revieweeId }
								: type === SERVICE_REVIEW_PROP
								? {
										[`${SERVICE_ID_PROP}`]: revieweeId,
								  }
								: {}),
							...form.getFieldsValue(),
					  };

				dispatchReview(info, review?.[`${ID_PROP}`]).then((id) =>
					onOk({
						...info,
						[`${ID_PROP}`]: editing ? review?.[`${ID_PROP}`] : id,
						[`${UPDATED_ON_PROP}`]: moment(),
						[`${REVIEWER_PROP}`]: profile,
					})
				);
			})
			.finally(() => {
				setConfirmLoading(false);
			});

	const handleCancel = () => {
		setConfirmLoading(false);
		onCancel();
	};

	const app = (
		<Modal
			title={
				<div className="custom-center-left">
					{avatar({
						inputProps: {
							size: 35,
							src: profile?.[`${INFO_PROP}`]?.[`${PICTURE_PROP}`],
						},
					})}{" "}
					<Typography.Text ellipsis className="px-2">
						Rate your experience
					</Typography.Text>
				</div>
			}
			open={!isEmptyObject(profile) && open}
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			okButtonProps={{
				style: { display: "block !important" },
			}}
			cancelButtonProps={{ style: { display: "block !important" } }}
			okText="Submit Review"
			centered
			zIndex={zIndex}
		>
			<Form
				form={form}
				initialValues={{
					[`${RATE_PROP}`]: review?.[`${RATE_PROP}`] || 5,
					[`${COMMENT_PROP}`]: review?.[`${COMMENT_PROP}`] || "",
				}}
			>
				<Form.Item
					className="custom-center"
					name={RATE_PROP}
					rules={[
						{
							validator(_, value) {
								if (value < 0.5)
									return Promise.reject("Rate can't be less than 0.5");
								else return Promise.resolve();
							},
						},
					]}
				>
					<Rate
						allowHalf={false}
						allowClear={false}
						style={{
							backgroundColor: "gray !important",
							fontSize: "1.8rem",
						}}
						className="c-housing-important m-0"
					/>
				</Form.Item>
				{useTextarea({
					itemProps: {
						name: COMMENT_PROP,
					},
					inputProps: {
						placeholder: "Enter your comments (optional)",
					},
					showLabel: false,
				})}
			</Form>
		</Modal>
	);

	return app;
}

export default EditReview;
