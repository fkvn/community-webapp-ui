import { CloseOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { imageThainowLogoRound } from "../../../Assest/Asset";
import { FORWARD_CLOSE } from "../../../Util/ConstVar";
import useUrls from "../useUrls";

function usePageHeader(
	props = {},
	onClose = async () => {},
	forward = FORWARD_CLOSE
) {
	const { forwardUrl } = useUrls();
	const navigate = useNavigate();

	const pageHeader = (props = {}, onClose = async () => {}) =>
		((props = {}) => <PageHeader {...props} />)({
			className: "form-title ",
			ghost: false,
			title: "ThaiNow",
			backIcon: false,
			avatar: {
				shape: "circle",
				size: "large",
				src: imageThainowLogoRound,
				onClick: () => navigate("/"),
			},
			extra: (
				<Button
					className="border-0 pt-2"
					icon={<CloseOutlined />}
					onClick={() => onClose().then(() => forwardUrl(forward))}
				></Button>
			),
			...props,
		});

	return pageHeader(props, onClose);
}

export default usePageHeader;
