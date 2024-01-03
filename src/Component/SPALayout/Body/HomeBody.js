import { RightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Col, Flex, Row, Skeleton } from "antd";
import Link from "antd/es/typography/Link";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { imageThaiHelpThaiBanner } from "../../../Assest/Asset";

function HomeBody() {
	const { t } = useTranslation();

	const carouselContentStyle = {
		height: "30rem",
		lineHeight: "160px",
		textAlign: "center",
	};

	const CarouselBanner = () => (
		<Carousel autoplay>
			<div>
				<Flex
					style={{
						...carouselContentStyle,
						backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%,rgba(0, 0, 0, 0.8) 100%), url(${imageThaiHelpThaiBanner})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundColor: "#E9E9E9",
						backgroundSize: "cover",
					}}
					justify="center"
					align="center"
				>
					<Flex vertical gap={20}>
						<Title className="text-white m-0 p-0">
							CONNECTING THAI OVERSEAS
						</Title>
						<Title className="text-white m-0 p-0" level={3}>
							เชื่อมโยงคนไทย ในต่างแดน{" "}
						</Title>
					</Flex>
				</Flex>
			</div>
		</Carousel>
	);

	const guideBookItems = [
		{
			category: "Moving to US",
			cover: imageThaiHelpThaiBanner,
			title:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		},
		{
			category: "Moving to US",
			cover: imageThaiHelpThaiBanner,
			title:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		},
		{
			category: "Moving to US",
			cover: imageThaiHelpThaiBanner,
			title:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		},
		{
			category: "Moving to US",
			cover: imageThaiHelpThaiBanner,
			title:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		},
		{
			category: "Moving to US",
			cover: imageThaiHelpThaiBanner,
			title:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		},
	];

	const scrollingWrapper = {
		overflowX: "scroll",
		overflowY: "hidden",
		whiteSpace: "nowrap",
		webkitOverflowScrolling: "touch",
	};

	const GuideBookSection = () => (
		<Flex
			justify="center"
			align="center"
			className="p-5 p-lg-5 bg-white"
			vertical
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: "90rem",
				}}
				vertical
				gap={20}
			>
				{/* Header */}
				<Flex justify="space-between" className="w-100">
					<Title level={2}> {t("thai_guide_book_msg")}</Title>
					<Button type="link" href="/aaa" className="custom-center m-0 p-0">
						<span className="d-none d-lg-block">
							{t("thai_guide_book_msg_more")}{" "}
						</span>
						<RightOutlined className="text-decorated" />
					</Button>
				</Flex>
				{/* Body */}
				{guideBookItems.length > 0 ? (
					<Row className="w-100">
						{/* left section */}
						<Col
							xs={24}
							md={12}
							style={{
								// Note: 40rem for desktop, 30rem for mobile
								minHeight: "35rem",
								maxHeight: "50rem",
							}}
						>
							<Flex
								className="h-100 p-4"
								style={{
									backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 60%,rgba(0, 0, 0, 0.8) 100%), url(${guideBookItems[0].cover})`,
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundColor: "#E9E9E9",
									backgroundSize: "cover",
								}}
								align="flex-end"
							>
								<Flex vertical gap={20}>
									<Link
										href="https://ant.design"
										target="_blank"
										className="text-white "
										style={{
											fontSize: "1rem",
											textDecoration: "underline",
										}}
									>
										{guideBookItems[0].category}
									</Link>
									<Title className="m-0 p-0 text-white" level={4}>
										{guideBookItems[0].title}
									</Title>
								</Flex>
							</Flex>
						</Col>
						{/* right section */}
						<Col
							xs={0}
							md={12}
							style={{
								padding: "0 0 0 2rem",
								maxHeight: "35rem !important",
							}}
						>
							<Flex
								className="h-100"
								wrap="wrap"
								gap={"1rem"}
								justify="space-between"
								align="stretch"
								// mobile only
								// style={{
								// 	maxWidth: "100%",
								// }}
								// className="scrolling-wrapper-flexbox"
							>
								{guideBookItems.map((i, index) =>
									index != 0 ? (
										<Card
											key={index}
											style={{
												width: "48%",
												border: 0,
											}}
											cover={
												<img
													alt={i.category}
													src={i.cover}
													className="rounded-0"
												/>
											}
											bodyStyle={{
												margin: 0,
												padding: "1.5rem 0",
											}}
										>
											<Link
												href="https://ant.design"
												target="_blank"
												className=""
												style={{
													fontSize: "1rem",
													textDecoration: "underline",
												}}
											>
												{i.category}
											</Link>
											<Title className="m-0 p-0 " ellipsis level={5}>
												{i.title}
											</Title>
										</Card>
									) : (
										<></>
									)
								)}
							</Flex>
						</Col>
					</Row>
				) : (
					<Skeleton active />
				)}
			</Flex>
		</Flex>
	);

	const PostListSection = () => <></>;

	const App = () => (
		<>
			<CarouselBanner />
			<GuideBookSection />
			<PostListSection />
		</>
	);
	return <App />;
}

export default HomeBody;
