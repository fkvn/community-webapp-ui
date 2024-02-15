import { RiShareLine } from "@remixicon/react";
import { Button, Flex, Image, Modal, Tooltip, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	FacebookMessengerShareButton,
	FacebookShareButton,
	LineShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from "react-share";
import {
	svgCopyIconBlack,
	svgFacebookLogo,
	svgFacebookMessengerIcon,
	svgLineLogo,
	svgLinkedInLogo,
	svgTwitterLogo,
} from "../../Asset/Asset";
import { facebookSignin } from "../../serviceEnv";
import useMessage from "../Hook/MessageHook/useMessage";

function Share({
	url = "https://mono-thainow.web.app",
	iconBtn = true,
	buttonText = "Share",
	zIndex = 1000,
	buttonProps = {},
	iconProps = {},
	hashtag = "",
	hashtags = [],
	redirectUri = "",
	title = "",
	summary = "",
	source = "",
} = {}) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const { successMessage } = useMessage();

	// const { avatar } = useImage();

	const socialMedias = [
		{
			node: LineShareButton,
			icon: svgLineLogo,
			props: {
				title: title,
				beforeOnClick: () => navigator.clipboard.writeText(url),
			},
		},
		{
			node: FacebookShareButton,
			icon: svgFacebookLogo,
			props: {
				hashtag: hashtag.includes("#") ? hashtag : `#${hashtag}`,
				beforeOnClick: () => navigator.clipboard.writeText(url),
			},
		},
		{
			node: FacebookMessengerShareButton,
			icon: svgFacebookMessengerIcon,
			props: {
				appId: facebookSignin?.appId,
				redirectUri: redirectUri || url,
				hashtag: hashtag,
				beforeOnClick: () => navigator.clipboard.writeText(url),
			},
		},
		{
			node: LinkedinShareButton,
			icon: svgLinkedInLogo,
			props: {
				title: title,
				summary: summary,
				source: source,
				beforeOnClick: () => navigator.clipboard.writeText(url),
			},
		},
		{
			node: TwitterShareButton,
			icon: svgTwitterLogo,
			props: {
				title: title,
				url: url,
				hashtags: hashtags.map((h) => (h.includes("#") ? h : `#${h}`)),
				beforeOnClick: () => navigator.clipboard.writeText(url),
			},
		},

		{
			node: Typography.Link,
			icon: svgCopyIconBlack,
			props: {
				disabled: true,
				onClick: () => {
					navigator.clipboard
						.writeText(url)
						.then(() => successMessage(`copied_link_success_msg`));
				},
			},
		},
	];

	const socialShares = (socials = []) => (
		<Flex
			align="center"
			wrap="wrap"
			gap={20}
			className="py-2"
			style={{
				minHeight: "5rem",
			}}
		>
			{socials.map((e, idx) => (
				<e.node url={url} key={idx} {...e?.props}>
					<Image src={e.icon} width={40} preview={false} />
				</e.node>
			))}
		</Flex>
	);

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
				<Title level={3} ellipsis className="">
					{t("share_with_your_friend_msg")}
				</Title>
			}
			open={open}
			destroyOnClose
			closable
			onCancel={() => setOpen(false)}
			cancelButtonProps={{ style: { display: "block !important" } }}
			footer={null}
			centered
			zIndex={zIndex}
			width={"30%"}
		>
			{socialShares(socialMedias)}
		</Modal>
	);

	const app = (
		<>
			<Tooltip title={t("share_msg")}>
				<Button
					type="primary"
					size="middle"
					className={`${iconBtn && "custom-center "}`}
					onClick={onShareHanlde}
					{...buttonProps}
				>
					{iconBtn ? <RiShareLine size={20} {...iconProps} /> : buttonText}
				</Button>
			</Tooltip>
			{desktopShare}
		</>
	);
	return app;
}

export default Share;
