import { Avatar, Card, Divider, Layout, List, Space, Typography } from "antd";
import {
	svgFacebookLogo,
	svgIgLogo,
	svgThainowLogo,
	svgYoutubeLogo,
} from "../../Assest/Asset";
import AppStoreBadge from "../Badge/AppStoreBadge";
import GooglePlayBadge from "../Badge/GooglePlayBadge";
import useImage from "../Hook/useImage";

function Footer() {
	const { Footer } = Layout;

	const { Title } = Typography;

	const { image } = useImage();

	const aboutusItems = [
		{
			title: "About Us",
			href: "/about-us",
		},
		{
			title: "Help Center",
			href: "/help-center",
		},
		{
			title: "Thai Consulate News",
			href: "https://thaiconsulatela.thaiembassy.org/en/index",
		},
	];

	const socialMediaItems = [
		{
			src: svgFacebookLogo,
			href: "https://www.facebook.com/AppThainow",
		},
		{
			src: svgIgLogo,
			href: "https://www.instagram.com/thainow.app/",
		},
		{
			src: svgYoutubeLogo,
			href: "https://www.youtube.com/channel/UCHD-8nHZxoMyrTqhXJHZ5xQ",
		},
	];

	const footerItems = [
		{
			title: (
				<div className="tedkvn-center-left">
					{image({
						width: "4rem",
						src: svgThainowLogo,
					})}
					<span className="px-3 fs-4">ThaiNow</span>
				</div>
			),
			children: (
				<>
					<Typography.Paragraph>
						5112 Hollywood Blvd Los Angeles, CA 90027
					</Typography.Paragraph>
					<Typography.Paragraph>
						<Typography.Link href="mailto:info@thainowapp.com">
							info@thainowapp.com
						</Typography.Link>
					</Typography.Paragraph>
				</>
			),
		},
		{
			title: "About Us",
			children: (
				<>
					{aboutusItems.map((item, idx) => (
						<Typography.Paragraph key={idx}>
							<Typography.Link href={item.href}>{item.title}</Typography.Link>
						</Typography.Paragraph>
					))}
				</>
			),
		},
		{
			title: "Social Media",
			children: (
				<>
					<Avatar.Group maxPopoverTrigger="click">
						{socialMediaItems.map((item, idx) => (
							<Avatar
								key={idx}
								size={40}
								src={item.src}
								onClick={() =>
									window.open(item.href, "_blank", "noopener,noreferrer")
								}
								className="p-1 border-0"
								style={{ marginRight: "2rem" }}
							/>
						))}
					</Avatar.Group>
					<Title level={5} className="my-2">
						Download Now
					</Title>
					<Space direction="horizontal" gap={20} className="py-2">
						<AppStoreBadge maxHeight="2.2rem" />
						<GooglePlayBadge maxHeight="2.2rem" />
					</Space>
				</>
			),
		},
	];

	const app = (
		<Footer className="p-4 pb-0 px-0">
			<Divider />
			<div className="w-100"></div>
			<List
				className="mt-4"
				grid={{
					gutter: 16,
					xs: 1,
					column: 3,
				}}
				dataSource={footerItems}
				renderItem={(item) => (
					<List.Item className="m-0">
						<Card
							headStyle={{ padding: "0", border: 0 }}
							title={
								<Typography.Title level={4}>{item.title}</Typography.Title>
							}
							style={{ backgroundColor: "transparent ", fontSize: "1rem" }}
							bordered={false}
							bodyStyle={{ padding: ".5rem 0" }}
						>
							{item.children}
						</Card>
					</List.Item>
				)}
			/>
		</Footer>
	);
	return app;
}

export default Footer;
