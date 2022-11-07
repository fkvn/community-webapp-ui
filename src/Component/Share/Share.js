import { ShareAltOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Tooltip, Typography } from "antd";
import { useState } from "react";
import {
	FacebookShareButton,
	LineShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from "react-share";
import {
	svgCopyIconBlack,
	svgFacebookLogo,
	svgLineLogo,
	svgLinkedInLogo,
	svgTwitterLogo,
} from "../../Assest/Asset";
import useImage from "../Hook/useImage";
import { successMessage } from "../Hook/useMessage";
function Share({
	url = "https://mono-thainow.web.app",
	iconOnly = true,
	buttonText = "Share",
	zIndex = 1000,
	buttonProps = {},
	iconProps = {},
} = {}) {
	const [open, setOpen] = useState(false);

	const { avatar } = useImage();

	const socialMedias = [
		{
			node: LineShareButton,
			icon: svgLineLogo,
		},
		{
			node: FacebookShareButton,
			icon: svgFacebookLogo,
		},
		{
			node: LinkedinShareButton,
			icon: svgLinkedInLogo,
		},
		{
			node: TwitterShareButton,
			icon: svgTwitterLogo,
		},

		{
			node: Typography.Link,
			icon: svgCopyIconBlack,
			props: {
				onClick: () => {
					navigator.clipboard
						.writeText(url)
						.then(() => successMessage(`Copied Share Link Successfully`));
				},
			},
		},
	];

	const socialShares = (socials = []) =>
		socials.map((e, idx) => (
			<e.node url={url} key={idx} {...e?.props}>
				{avatar({
					inputProps: {
						src: e.icon,
						shape: "square",
					},
					withTooltip: false,
				})}
			</e.node>
		));

	const onShareHanlde = () => {
		try {
			navigator.share({
				url: url,
			});
		} catch (error) {
			setOpen(true);
		}
	};

	const desktopShare = (
		<Modal
			title={
				<Typography.Text ellipsis className="px-2">
					Share to your friends
				</Typography.Text>
			}
			open={open}
			destroyOnClose
			closable
			onCancel={() => setOpen(false)}
			cancelButtonProps={{ style: { display: "block !important" } }}
			footer={null}
			centered
			zIndex={zIndex}
			width={370}
		>
			<Space direction="horizontal" size={20} wrap>
				{socialShares(socialMedias)}
			</Space>
		</Modal>
	);

	const app = (
		<>
			<Tooltip title="Share">
				<Button
					shape="round"
					type="primary"
					className={`${iconOnly && " px-2 "}`}
					onClick={onShareHanlde}
					{...buttonProps}
				>
					{iconOnly ? (
						<ShareAltOutlined style={{ fontSize: "1rem" }} {...iconProps} />
					) : (
						buttonText
					)}
				</Button>
			</Tooltip>
			{desktopShare}
		</>
	);
	return app;
}

export default Share;
