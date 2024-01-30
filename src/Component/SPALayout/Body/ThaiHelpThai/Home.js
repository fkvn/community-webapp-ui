import { RightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Flex } from "antd";
import Link from "antd/es/typography/Link";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { imageAds, imageThaiHelpThaiBanner } from "../../../../Assest/Asset";
import { GUIDE_BOOK_PATH } from "../../../../Util/ConstVar";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import FiveItemLayout from "../../../Layout/FivePostLayout";
import GallerySection from "../../Section/GallerySection";

/**
 *
 * @param {*} param0
 * @guideBookItems [{category: "", cover: "", title: ""}]
 * @returns
 */
function Home() {
	const { t } = useTranslation();
	const { fetchGuideBookPosts } = useGuideBookPost();

	const carouselContentStyle = {
		height: "30rem",
		lineHeight: "160px",
		textAlign: "center",
	};

	const [guideBookItems, setGuideBookItems] = useState([]);
	const [adItems] = useState([]);

	const fetchGuideBookPostsHandle = () =>
		fetchGuideBookPosts().then((res) => {
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
		fetchGuideBookPostsHandle();
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
					maxWidth: "100rem",
				}}
				vertical
				gap={20}
			>
				{/* Header */}
				<Flex justify="space-between" className="w-100">
					<Title level={2}> {t("thai_guide_book_msg")}</Title>
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
				<FiveItemLayout items={guideBookItems} />
				{/* Ads */}
				<FirstAdsSection />
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

export default Home;
