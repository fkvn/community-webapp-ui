import { RiDeleteBin6Line } from "@remixicon/react";
import { Button, Popconfirm, Tooltip, Typography } from "antd";
import { Trans, useTranslation } from "react-i18next";

function DeleteBtn({
	popConfirmProps = {},
	btnProps = {},
	tooltipProps = {},
	iconProps = {},
	onConfirm = async () => {},
	customIcon,
}) {
	const { t } = useTranslation();
	const App = () => (
		<Popconfirm
			title={t("delete_record_msg")}
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
			onConfirm={onConfirm}
			okButtonProps={{
				className: "custom-center m-2 flex-end",
				style: {
					padding: ".8rem",
				},
			}}
			showCancel={false}
			okText={t("yes_msg")}
			{...popConfirmProps}
		>
			<Button type="default" className="border-0 " {...btnProps}>
				<Tooltip title={t("delete_record_msg")} {...tooltipProps}>
					{customIcon ? (
						<>{customIcon}</>
					) : (
						<RiDeleteBin6Line size={20} color="red" {...iconProps} />
					)}
				</Tooltip>
			</Button>
		</Popconfirm>
	);
	return <App />;
}

export default DeleteBtn;
