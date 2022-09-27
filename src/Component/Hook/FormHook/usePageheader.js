import { CloseOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { imageThainowLogoRound } from "../../../Assest/Asset";
import useUrls from "../useUrls";

export default function usePageHeader() {
	const { forwardUrl } = useUrls();
	const navigate = useNavigate();

	console.log("page layout");

	const pageHeader = (props = {}, onClose = async () => {}) =>
		((props = {}) => <PageHeader {...props} />)({
			className: "form-title ",
			ghost: false,
			title: "ThaiNow Registration",
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
					onClick={() => onClose().then(() => forwardUrl())}
				></Button>
			),
			...props,
		});

	return pageHeader;
}
