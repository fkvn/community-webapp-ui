import { CloseOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { imageThainowLogoRound } from "../../../Assest/Asset";
import { FORWARD_CLOSE } from "../../../Util/ConstVar";
import useUrls from "../../Hook/useUrls";
import SwitchLanguage from "../../Locale/SwitchLanguage";

function TopPageHeader({
	props = {},
	onClose = () => Promise.resolve(),
	forward = FORWARD_CLOSE,
}) {
	const { forwardUrl } = useUrls();
	const navigate = useNavigate();

	const app = (
		<>
			<PageHeader
				className="form-title "
				ghost={false}
				title="ThaiNow"
				backIcon={false}
				avatar={{
					shap: "circle",
					size: "large",
					src: imageThainowLogoRound,
					onClick: () => navigate("/"),
				}}
				extra={
					<Flex>
						<SwitchLanguage
							bordered={false}
							selectionProps={{
								className: "mx-2",
							}}
						/>
						<Button
							className="border-0 pt-2 custom-center"
							icon={<CloseOutlined className="text-danger" />}
							onClick={() => onClose().then(() => forwardUrl(forward))}
						></Button>
					</Flex>
				}
				style={{ height: "60px" }}
				{...props}
			/>
			<hr className="m-0" />{" "}
		</>
	);
	return app;
}

export default TopPageHeader;
