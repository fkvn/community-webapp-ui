import { Button, Popconfirm } from "antd";
import { Typography } from "antd/lib";
import { Trans, useTranslation } from "react-i18next";

function SubmitBtnFormControl({
	type = "primary",
	title = "",
	className = "",
	style = {},
	disabled = false,
	popconfirm = false,
	onPopConfirm = () => {},
	loading = false,
	onClick = () => {},
	btnProps = {},
}) {
	const { t } = useTranslation(["Form", "Default"]);
	let btnTitle = title || t("form_submit_msg");

	const App = () => (
		<Popconfirm
			title={t("delete_record_msg", { ns: "Default" })}
			description={
				<Typography.Text>
					<Trans
						i18nKey={"delete_record_confirm_msg"}
						ns="Default"
						components={{
							danger: <div className="text-danger"></div>,
						}}
					/>
				</Typography.Text>
			}
			onConfirm={onPopConfirm}
			okButtonProps={{
				className: "custom-center m-2 flex-end",
				style: {
					padding: ".8rem",
				},
			}}
			disabled={!popconfirm}
			showCancel={false}
			okText={t("yes_msg", { ns: "Default" })}
		>
			<Button
				type={type}
				className={`my-2 bg-customRed custom-center ${className}`}
				style={{
					fontSize: "1rem",
					padding: ".7rem 2rem",
					borderRadius: ".5rem",
					...style,
				}}
				disabled={disabled}
				loading={loading}
				onClick={onClick}
				{...btnProps}
			>
				{btnTitle}
			</Button>
		</Popconfirm>
	);

	return <App />;
}

export default SubmitBtnFormControl;
