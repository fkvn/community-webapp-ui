import { RightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Flex, Image, Skeleton } from "antd";
import Link from "antd/es/typography/Link";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player/lazy";
import {
	imageAds,
	imageThaiHelpThaiBanner,
	imageThaiNow1,
	imageThaiNow2,
	imageThaiNow3,
	imageThaiNow4,
	imageThaiNow5,
	imageThaiNow6,
	imageThaiNow7,
	imageThaiNow8,
	svgThaiNowLogoWithWords,
} from "../../../../Assest/Asset";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";

/**
 *
 * @param {*} param0
 * @guideBookItems [{category: "", cover: "", title: ""}]
 * @returns
 */
function HomeBody() {
	const { t } = useTranslation();
	const { fetchGuideBookPost } = useGuideBookPost();

	const carouselContentStyle = {
		height: "30rem",
		lineHeight: "160px",
		textAlign: "center",
	};

	const [guideBookItems, setGuideBookItems] = useState([]);
	const [adItems, _] = useState([]);

	const fetchGuideBookPostHandle = () =>
		fetchGuideBookPost().then((res) => {
			const formattedGuideBookItems =
				res?.fetchResult?.reduce(
					(res, i) => [
						...res,
						{
							category: i?.details?.category || "",
							title: i?.details?.title || "",
							cover: i?.details?.bannerUrl || "",
						},
					],
					[]
				) || [];

			setGuideBookItems(formattedGuideBookItems);
		});

	useEffect(() => {
		fetchGuideBookPostHandle();
	}, []);

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

	const FirstAdsSection = () => (
		<>
			<Card
				style={{
					width: `100%`,
					border: 0,
				}}
				className="my-5"
				cover={
					<img
						alt={`${adItems[0]?.category || "Sponsored"}`}
						src={adItems[0]?.cover}
						className="rounded-0"
						style={{
							// default width and height to display the fallback photo
							width: "100%",
							minHeight: "20rem",
							// set background to display the fallback photo
							backgroundImage: `url(${imageAds})`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundColor: "#E9E9E9",
							backgroundSize: "cover",

							// image attr
							maxHeight: "15rem",
							objectFit: "cover",
							objectPosition: "center",
						}}
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
					{adItems[0]?.category}
				</Link>
				<Title className="m-0 p-0 " ellipsis level={5}>
					{adItems[0]?.title}
				</Title>
			</Card>
		</>
	);

	const GuideBookSection = () => (
		<Flex
			justify="center"
			align="center"
			className="p-5 p-lg-5 bg-white"
			vertical
			style={{
				minHeight: "35rem",
			}}
		>
			<Flex
				className="w-100 pt-5"
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
					<Flex
						className="w-100 my-5 "
						style={{
							minHeight: "40rem",
							maxHeight: "50rem",
							overflow: "hidden",
						}}
						gap={20}
					>
						{/* 1st main item */}
						<Flex
							className="p-4"
							style={{
								width: `${guideBookItems.length > 1 ? "50" : "100"}%`,
								minHeight: "40rem",
								backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 60%,rgba(0, 0, 0, 0.8) 100%), url(${
									guideBookItems[0].cover || svgThaiNowLogoWithWords
								})`,
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

						{/* sub-items - max items to display is 5 -> 4 here and 1 above */}
						{guideBookItems.length > 1 && (
							<Flex
								style={{
									width: "50%",
									overflowY: "auto",
									overflowX: "hidden",
									maxHeight: "50rem",
								}}
								className="h-100"
								wrap="wrap"
								gap="1rem"
								justify="space-evenly"
								align="stretch"
							>
								{/* max 4 sub-items */}
								{guideBookItems.slice(1, 5).map((i, index, items) => (
									<Card
										key={index}
										style={{
											width: `${
												items.length === 3 && index === 2
													? "100"
													: items.length <= 2
													  ? "100"
													  : "48"
											}%`,
											border: 0,
										}}
										cover={
											<img
												alt={`${i.category}`}
												src={i.cover}
												className="rounded-0"
												style={{
													// default width to display the fallback photo
													width: "100%",
													// set image min height
													...(items.length === 1
														? // when only 1 sub-item
														  { minHeight: "35rem" }
														: // default min height to display the fallback photo
														  { minHeight: "15rem" }),
													// set background to display the fallback photo
													backgroundImage: `url(${svgThaiNowLogoWithWords})`,
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													backgroundColor: "#E9E9E9",
													backgroundSize: "cover",

													// image attr
													maxHeight: "15rem",
													objectFit: "cover",
													objectPosition: "center",
												}}
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
								))}
							</Flex>
						)}
					</Flex>
				) : (
					<Skeleton active />
				)}
				<FirstAdsSection />
			</Flex>
		</Flex>
	);

	const galleryCardItems = [
		imageThaiNow1,
		imageThaiNow2,
		imageThaiNow3,
		imageThaiNow4,
		imageThaiNow5,
		imageThaiNow6,
		imageThaiNow7,
		imageThaiNow8,
	];

	const GallerySection = () => (
		<Flex
			justify="top"
			className="p-5 p-lg-5"
			vertical
			style={{
				background: "#ECEFFA",
				minHeight: "35rem",
			}}
			align="center"
		>
			<Flex
				className="w-100 "
				style={{
					paddingTop: "2rem",
					maxWidth: "90rem",
				}}
				vertical
				gap={20}
			>
				<Title className="m-0 p-0 text-center">{t("do_for_thai_msg")}</Title>

				<ReactPlayer
					controls
					className="w-100 my-5 pt-5"
					height="45rem"
					url="https://www.youtube.com/watch?v=ETlr0LGl6kA&t=3s"
				/>

				<Flex gap={20} justify="space-evenly" className="w-100 my-5 ">
					<ReactPlayer controls url="https://youtu.be/lp35ZLQtu_Y" />
					<ReactPlayer controls url="https://youtu.be/v-p0WHpNKe4" />
					<ReactPlayer controls url="https://youtu.be/m3RZ7FINbNo" />
				</Flex>
			</Flex>

			<Flex
				className="w-100 "
				style={{
					paddingTop: "2rem",
					maxWidth: "90rem",
				}}
				vertical
				gap={20}
			>
				<Title className="m-0 p-0 mt-5 pt-5 text-center ">
					{t("root_in_usa_msg")}
				</Title>
				<Image.PreviewGroup className="d-inline-block">
					<Card
						style={{
							margin: "4rem 0",
						}}
					>
						{galleryCardItems.map((url, idx) => (
							<Card.Grid
								key={idx}
								style={{
									width: "25%",
								}}
								className="p-0 rounded-0"
							>
								<Card
									cover={
										<Image
											alt="gallery"
											src={url}
											className="rounded-0"
											preview={{ maskClassName: "rounded-0" }}
											fallback={svgThaiNowLogoWithWords}
										/>
									}
								/>
							</Card.Grid>
						))}
					</Card>
				</Image.PreviewGroup>
			</Flex>
		</Flex>
	);

	const PostListSection = () => <></>;

	const App = () => (
		<>
			<CarouselBanner />
			<GuideBookSection />
			<GallerySection />
			<PostListSection />
		</>
	);
	return <App />;
}

export default HomeBody;
