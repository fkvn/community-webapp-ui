import { CloseOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Button, Flex } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { imageThainowLogoRound } from "../../../Assest/Asset";
import { REDIRECT_URI } from "../../../Util/ConstVar";
import SwitchLanguage from "../../Locale/SwitchLanguage";

function TopPageHeader({
	props = {},
	onBeforeClose = () => Promise.resolve(),
}) {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";

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
							onClick={() =>
								onBeforeClose().then(() => navigate(`/${redirectUri}`))
							}
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
