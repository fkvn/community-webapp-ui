import { CloseOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { imageThainowLogoRound } from "../../../Asset/env";
import { FORWARD_CLOSE } from "../../../Util/ConstVar";
import SwitchLanguage from "../../Locale/SwitchLanguage";
import useUrls from "../useUrls";

function usePageHeader(
	props = {},
	onClose = async () => {},
	forward = FORWARD_CLOSE
) {
	const { forwardUrl } = useUrls();
	const navigate = useNavigate();

	const pageHeader = (props = {}, onClose = async () => {}) =>
		((props = {}) => (
			<>
				<PageHeader {...props} style={{ height: "60px" }} />{" "}
				<hr className="m-0" />
			</>
		))({
			className: "form-title ",
			ghost: false,
			title: "ThaiNow",
			backIcon: false,
			avatar: {
				shape: "circle",
				size: "large",
				// src: imageThainowLogoRound,

				src: imageThainowLogoRound,
				onClick: () => navigate("/"),
			},
			extra: (
				<Flex>
					<SwitchLanguage
						bordered={false}
						selectionProps={{
							className: "mx-2",
						}}
					/>
					<Button
						className="border-0 pt-2"
						icon={<CloseOutlined className="text-danger" />}
						onClick={() => onClose().then(() => forwardUrl(forward))}
					></Button>
				</Flex>
			),
			...props,
		});

	return pageHeader(props, onClose);
}

export default usePageHeader;
