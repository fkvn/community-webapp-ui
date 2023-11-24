import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Flex } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../Assest/Asset";
import { REDIRECT_URI } from "../../../Util/constVar";
import useImage from "../../Hook/useImage";
import SwitchLanguage from "../../Locale/SwitchLanguage";

function FormPageHeader({
	props = {},
	onBeforeClose = () => Promise.resolve(),
}) {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const { image } = useImage();
	const redirectUri = params.get(REDIRECT_URI) || "";

	const App = () => (
		<>
			<Flex justify="space-between" align="center" className="my-1 mx-3">
				{image({
					src: svgThaiNowLogoWithWords,
					width: 50,
					className: "",
					onClick: () => navigate("/"),
					style: {
						cursor: "pointer",
					},
				})}
				<Flex justify="space-between" align="center">
					<SwitchLanguage />
					<Button
						className="border-0 pt-2 "
						icon={<CloseOutlined className="text-danger" />}
						onClick={() =>
							onBeforeClose().then(() => navigate(`/${redirectUri}`))
						}
					/>
				</Flex>
			</Flex>
			<Divider className="m-0 p-0" />
		</>
	);
	return <App />;
}

export default FormPageHeader;
