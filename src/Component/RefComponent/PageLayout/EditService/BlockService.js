import { CloseSquareFilled } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Col,
	Form,
	Modal,
	Row,
	Tooltip,
	Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { hideServiceAxios } from "../../../Axios/axiosPromise";
import AuthContainer from "../../../Container/AuthContainer/AuthContainer";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import { ID_PROP, PROFILE_OBJ } from "../../../Util/ConstVar";
import {
	errorMessage,
	loadingMessage,
	successMessage,
} from "../../Hook/useMessage";

function BlockService({
	serviceId = -1,
	buttonText = "Hide this post from me",
	buttonProps = {},
	iconOnly = true,
	iconProps = {},
	zIndex = 1000,
}) {
	const [form] = useForm();

	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(thainowReducer);

	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleOk = () => {
		setConfirmLoading(true);

		form
			.validateFields()
			.then(() => {
				loadingMessage("Processing .....", 0);

				hideServiceAxios(profile?.[`${ID_PROP}`], serviceId)
					.then(() =>
						successMessage("Post hidden successfully").then(() =>
							setOpen(false)
						)
					)
					.catch((e) => errorMessage(e));
			})
			.finally(() => setConfirmLoading(false));
	};

	const handleCancel = () => {
		setConfirmLoading(false);
		setOpen(false);
	};

	const blockForm = (
		<Form form={form}>
			<Form.Item
				name="agreement"
				valuePropName="checked"
				className="m-2"
				rules={[
					{
						validator: (_, value) =>
							value
								? Promise.resolve()
								: Promise.reject(new Error("Should accept agreement")),
					},
				]}
			>
				<Checkbox>I confirm to hide this post from my feed</Checkbox>
			</Form.Item>
		</Form>
	);

	const location = useLocation();

	const app = (
		<>
			<Tooltip title="Hide Post">
				<Button
					shape="round"
					type="danger"
					className={`${iconOnly && " px-2 "}`}
					onClick={() => setOpen(true)}
					{...buttonProps}
				>
					{iconOnly ? (
						<CloseSquareFilled style={{ fontSize: "1rem" }} {...iconProps} />
					) : (
						buttonText
					)}
				</Button>
			</Tooltip>
			{open && (
				<AuthContainer
					closeUrl={location?.pathname + location?.search || ""}
					successUrl={location?.pathname + location?.search || ""}
				>
					<Modal
						title={
							<>
								<Typography.Text ellipsis>Post Hidden</Typography.Text>
								<br />
								<small>
									<Typography.Text type="danger" ellipsis>
										Hidden posts won't appear in your feed in the future
									</Typography.Text>
								</small>
							</>
						}
						open={open}
						onOk={handleOk}
						confirmLoading={confirmLoading}
						onCancel={handleCancel}
						okButtonProps={{
							style: { display: "block !important" },
						}}
						cancelButtonProps={{ style: { display: "block !important" } }}
						okText="Hide Post"
						centered
						zIndex={zIndex}
						// style={{
						// 	maxWidth: "22rem",
						// }}
						bodyStyle={{
							padding: "0 1rem",
							paddingTop: "1rem",
						}}
					>
						<Row gutter={[20, 0]}>
							<Col xs={24}>{blockForm}</Col>
						</Row>
					</Modal>
				</AuthContainer>
			)}
		</>
	);
	return app;
}

export default BlockService;
