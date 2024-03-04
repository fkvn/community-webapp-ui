import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Grid } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../../Asset/Asset";
import { REDIRECT_URI } from "../../../../Util/ConstVar";
import useImage from "../../../Hook/useImage";
import SwitchLanguage from "../../../Locale/SwitchLanguage";

function FormPageHeader({ onBeforeClose = () => Promise.resolve() }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";

	const { image } = useImage();

	const App = () => (
		<>
			<Flex
				justify="space-between"
				align="center"
				style={{
					margin: screens.md ? ".3rem 2rem" : ".3rem 1rem",
				}}
			>
				<Flex justify="space-between" align="center">
					{image({
						src: svgThaiNowLogoWithWords,
						width: 50,
						className: "",
						onClick: () => navigate("/"),
						style: {
							cursor: "pointer",
						},
					})}
				</Flex>

				<Flex justify="space-between" align="center" gap={20}>
					<SwitchLanguage />
					<Button
						type="primary"
						className="border-0 px-2 mx-2 custom-center bg-customRed"
						size="medium"
						icon={<CloseOutlined className="text-white" />}
						onClick={() =>
							onBeforeClose().then(() => navigate(`/${redirectUri}`))
						}
						style={{ fontSize: "1rem" }}
					/>
				</Flex>
			</Flex>
			<Divider className="m-0 p-0" />
		</>
	);
	return <App />;
}

export default FormPageHeader;
