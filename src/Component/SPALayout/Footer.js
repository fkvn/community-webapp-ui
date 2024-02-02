import { Divider, Flex, Image, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
	svgFacebookLogo,
	svgIgLogo,
	svgThainowLogoWhite,
	svgTiktokLogo,
	svgYoutubeLogo,
} from "../../Assest/Asset";
import { GUIDE_BOOK_PATH, HELP_CENTER_PATH } from "../../Util/ConstVar";

function Footer() {
	const { t } = useTranslation(["Default", "Email"]);
	const { Text, Link } = Typography;

	const socialMediaItems = [
		{
			src: svgFacebookLogo,
			url: "https://www.facebook.com/AppThainow",
		},
		{
			src: svgYoutubeLogo,
			url: "https://www.youtube.com/watch?v=wZEtqxfErfE&t=1s",
		},
		{
			src: svgIgLogo,
			url: "https://www.instagram.com/thainowapp/",
		},
		{
			src: svgTiktokLogo,
			url: "https://www.tiktok.com/@thainow?lang=en",
		},
	];

	const App = () => (
		<Flex
			justify="start"
			align="center"
			className="p-5 p-lg-5 "
			vertical
			style={{
				paddingTop: "2rem",
				background: "#0C529C",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: "100rem",
				}}
				vertical
				gap={20}
			>
				<Flex justify="space-start" wrap="wrap">
					<Flex vertical gap={30} align="flex-start" className="w-50">
						<Image
							src={svgThainowLogoWhite}
							height="5rem"
							className="text-white"
						/>
						<Text level={5} className="text-white" style={{ fontSize: "1rem" }}>
							{t("address_msg")}:{" "}
							<Link
								href="https://www.google.com/maps/place/Thai+Town,+Los+Angeles,+CA+90027/@34.1018091,-118.3087221,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bf571ef66c7f:0xf8f17d1d8988d668!8m2!3d34.1018097!4d-118.3035723!16zL20vMDNsajFy?entry=ttu"
								target="_blank"
								className="text-white"
								style={{ fontSize: "1rem" }}
							>
								Thai Town, Hollywood
							</Link>
						</Text>
						<Text level={5} className="text-white" style={{ fontSize: "1rem" }}>
							{t("email_address_msg", { ns: "Email" })}:{" "}
							<Link
								href="mailto:info@thainowapp.com"
								className="text-white"
								style={{ fontSize: "1rem" }}
							>
								info@thainowapp.com
							</Link>
						</Text>

						<Flex gap={30} className="my-3">
							{socialMediaItems.map((i, idx) => (
								<Link key={idx} href={i.url} target="_blank">
									<Image preview={false} src={i.src} height="3rem" />
								</Link>
							))}
						</Flex>
					</Flex>
					<Flex vertical justify="space-around">
						<Link
							href={HELP_CENTER_PATH}
							target="_blank"
							style={{ color: "white", fontSize: "1rem" }}
						>
							{t("help_center_msg")}
						</Link>
						<Link
							href={GUIDE_BOOK_PATH}
							style={{ color: "white", fontSize: "1rem" }}
							target="_blank"
						>
							{t("thai_guide_book_msg")}
						</Link>
						<Link
							href="/signup"
							style={{ color: "white", fontSize: "1rem" }}
							target="_blank"
						>
							{t("register_now_msg")}
						</Link>
						<Link
							href="https://thaiconsulatela.thaiembassy.org/en/index"
							style={{ color: "white", fontSize: "1rem" }}
							target="_blank"
						>
							{t("thai_consulate_news_msg")}
						</Link>
					</Flex>
				</Flex>
				<Flex vertical>
					<Divider className="bg-white" />
					<Text
						style={{
							color: "white",
							fontSize: "1rem",
						}}
					>
						© ThaiNow, 2021. {t("all_right_reserved_msg")}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);

	return <App />;
}

export default Footer;
