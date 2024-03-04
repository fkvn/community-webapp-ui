import { RightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Flex, Grid, Image, Skeleton } from "antd";
import Link from "antd/es/typography/Link";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
	imageAds,
	imageThaiHelpThaiBanner,
	svgThaiNowLogoWithWords,
} from "../../../../../Asset/Asset";
import { GUIDE_BOOK_PATH } from "../../../../../Util/ConstVar";
import useGuideBookPost from "../../../../Hook/PostHook/useGuideBookPost";
import FivePostSection from "../../../Section/FivePostSection";
import FlexPostSection from "../../../Section/FlexPostSection";
import GallerySection from "../../../Section/GallerySection";

/**
 *
 * @param {*} param0
 * @guideBookItems [{category: "", cover: "", title: ""}]
 * @returns
 */

function Home() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { fetchGuideBooks } = useGuideBookPost();
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const carouselContentStyle = {
		minHeight: screens.xxl ? "55rem" : screens.xs ? "20rem" : "40rem",
		maxHeight: "100rem",
		lineHeight: "160px",
		textAlign: "center",
	};

	const [guideBookItems, setGuideBookItems] = useState([]);
	const [adItems] = useState([]);

	const fetchGuideBooksHandle = () =>
		fetchGuideBooks().then((res) => {
			const formattedGuideBookItems =
				res?.fetchResult?.reduce(
					(res, i) => [
						...res,
						{
							category: i?.details?.category || "",
							categoryKey: i?.details?.category || "",
							categoryLinkTo: GUIDE_BOOK_PATH,
							title: i?.details?.title || "",
							cover: i?.details?.bannerUrl || "",
							onClick: () => navigate(`${GUIDE_BOOK_PATH}/${i?.id}`),
						},
					],
					[]
				) || [];

			setGuideBookItems(formattedGuideBookItems);
		});

	useEffect(() => {
		fetchGuideBooksHandle();
	}, []);

	const CarouselBanner = () => (
		<Carousel autoplay>
			<div>
				<Flex
					style={{
						...carouselContentStyle,
						backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%,rgba(0, 0, 0, 0.8) 100%), url(${imageThaiHelpThaiBanner || svgThaiNowLogoWithWords})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundColor: "#E9E9E9",
						backgroundSize: "cover",
						// minHeight: "60rem",
					}}
					justify="center"
					align="center"
				>
					<Flex vertical gap={20}>
						<Title
							className="text-white m-0 p-0"
							{...(screens.xs
								? {
										style: {
											fontSize: "2rem",
										},
									}
								: {})}
						>
							CONNECTING THAI OVERSEAS
						</Title>
						<Title
							className="text-white m-0 p-0"
							level={3}
							{...(screens.xs
								? {
										style: {
											fontSize: "2rem",
										},
									}
								: {})}
						>
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
					// margin: `${screens.xs ? "1.5rem" : "3rem"} 0`,
					border: 0,
				}}
				cover={
					<Image
						alt={`Sponsored`}
						src={adItems[0]?.cover}
						fallback={imageAds}
						style={{
							// default width and height to display the fallback photo
							width: "100%",
							minHeight: screens.xs || screens.sm ? "10rem" : "15rem",
							// image attr
							maxHeight: "25rem",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				}
				styles={{
					body: {
						margin: 0,
						padding: 0,
					},
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

	const contentMaxWidth = "120rem";

	const GuideBookSection = () => (
		<Flex
			justify="center"
			align="center"
			className=" bg-white"
			style={{
				padding: screens.xxl ? "4rem" : screens.md ? "2rem" : "2rem 1rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: contentMaxWidth,
				}}
				vertical
				gap={screens.xxl ? 80 : screens.xs ? 20 : 50}
			>
				{/* Header */}
				<Flex justify="space-between" className="w-100" align="center">
					<Title
						level={2}
						className="m-0 p-0"
						{...(screens.xs
							? {
									style: {
										fontSize: "2rem",
									},
								}
							: {})}
					>
						{t("thai_guide_book_msg")}
					</Title>
					<Button
						type="link"
						href={GUIDE_BOOK_PATH}
						className="custom-center m-0 p-0"
					>
						<span className="d-none d-lg-block">
							{t("thai_guide_book_msg_more")}{" "}
						</span>
						<RightOutlined className="text-decorated" />
					</Button>
				</Flex>
				{/* Body */}
				<FivePostSection items={guideBookItems} />
				{/* Ads */}
				<FirstAdsSection />
			</Flex>
		</Flex>
	);

	const PostListSection = () => (
		<Flex
			className="w-100"
			align="center"
			vertical
			style={{
				background: "#ECEFFA",
				paddingTop: "2rem",
				minHeight: "20rem",
				padding: screens.xxl ? "4rem" : screens.md ? "2rem" : "2rem 1rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: contentMaxWidth,
				}}
				vertical
			>
				<Title
					style={{
						margin: `${screens.md ? "2rem" : "2rem"} 0`,
						...(screens.xs && { fontSize: "2rem" }),
					}}
				>
					{t("thai_now_headline_msg")}
				</Title>
				{guideBookItems.length > 0 ? (
					<FlexPostSection
						items={guideBookItems}
						// justify="space-start"
						cardStyle={
							{
								// margin: `${screens.sm ? "2rem" : "1rem"} 0 `,
							}
						}
						bodyStyle={{
							padding: `1rem 1rem`,
						}}
					/>
				) : (
					<Skeleton active />
				)}
			</Flex>
		</Flex>
	);

	const App = () => (
		<>
			<CarouselBanner />
			<GuideBookSection />
			<PostListSection />
			<GallerySection contentMaxWidth={contentMaxWidth} background="white" />
		</>
	);
	return <App />;
}

export default Home;
