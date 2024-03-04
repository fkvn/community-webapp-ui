import { Divider, Flex, Grid, Image, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
	svgFacebookLogo,
	svgIgLogo,
	svgThainowLogoWhite,
	svgTiktokLogo,
	svgYoutubeLogo,
} from "../../../Asset/Asset";
import {
	GUIDE_BOOK_PATH,
	HELP_CENTER_PATH,
	SIGN_UP_PATH,
} from "../../../Util/ConstVar";

function Footer() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
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
			style={{
				padding: screens.lg
					? "5rem 10rem"
					: screens.md
						? "5rem 2rem"
						: "2rem 1rem",
				background: "#0C529C",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: "120rem",
				}}
				vertical
				{...(!screens.md && {
					justify: "center",
					align: "center",
				})}
				gap={20}
			>
				<Flex
					justify="space-start"
					wrap="wrap"
					{...(!screens.md && {
						vertical: true,
						gap: 20,
						justify: "center",
						align: "center",
					})}
				>
					<Flex
						vertical
						gap={30}
						align="flex-start"
						style={{
							width: screens.md ? "50%" : "100%",
						}}
						{...(!screens.md && {
							align: "center",
						})}
					>
						<Image
							src={svgThainowLogoWhite}
							height="5rem"
							className="text-white"
						/>
						<Text
							level={5}
							className="text-white "
							style={{
								fontSize: "1rem",
								...(!screens.md && {
									textAlign: "center",
								}),
							}}
						>
							{t("address_msg")}:{" "}
							<Link
								href="https://www.google.com/maps/place/Thai+Town,+Los+Angeles,+CA+90027/@34.1018091,-118.3087221,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bf571ef66c7f:0xf8f17d1d8988d668!8m2!3d34.1018097!4d-118.3035723!16zL20vMDNsajFy?entry=ttu"
								target="_blank"
								className="text-white"
								style={{ fontSize: "1rem" }}
							>
								Thai Town, Hollywood - Los Angeles
							</Link>
						</Text>
						<Text
							level={5}
							className="text-white"
							style={{
								fontSize: "1rem",
								...(!screens.md && {
									textAlign: "center",
								}),
							}}
						>
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
									<Image
										preview={false}
										src={i.src}
										height={screens.md ? "2.5rem" : "2.2rem"}
									/>
								</Link>
							))}
						</Flex>
					</Flex>
					<Flex
						vertical={screens.md}
						wrap={screens.md ? "" : "wrap"}
						gap={20}
						justify="space-around"
					>
						{[
							{ href: HELP_CENTER_PATH, title: t("help_center_msg") },
							{ href: GUIDE_BOOK_PATH, title: t("thai_guide_book_msg") },
							{ href: SIGN_UP_PATH, title: t("register_now_msg") },
							{
								href: "https://thaiconsulatela.thaiembassy.org/en/index",
								title: t("thai_consulate_news_msg"),
							},
						].map((l, idx) => (
							<Link
								key={idx}
								href={l.href}
								target="_blank"
								style={{
									color: "white",
									fontSize: "1rem",
									width: screens.md ? "100%" : "40%",
									textAlign: screens.md ? "left" : "center",
								}}
							>
								{l.title}
							</Link>
						))}
					</Flex>
				</Flex>
				<Flex vertical className="w-100">
					<Divider className="bg-white" />
					<Text
						style={{
							color: "white",
							fontSize: "1rem",
							textAlign: screens.md ? "left" : "center",
						}}
					>
						© ThaiNow, 2024. {t("all_right_reserved_msg")}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);

	return <App />;
}

export default Footer;
