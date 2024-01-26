import { Button, Flex, Image } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	svgBasicLivingIcon,
	svgBusinessInvestmentIcon,
	svgHealthIcon,
	svgKidsIcon,
	svgLearningsIcon,
	svgLivingPermanentlyIcon,
	svgMovingToUsIcon,
	svgThaiPrideIcon,
	svgTransferIcon,
	svgTravelIcon,
} from "../../../../Assest/Asset";
import { numberWithCommas } from "../../../../Util/Util";
import BreadcrumbContainer from "../../../Breadcrumb/BreadcrumbContainer";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import FivePostLayout from "../../../Layout/FivePostLayout";
import GridPostLayout from "../../../Layout/GridPostLayout";

function GuideBook({}) {
	const { t } = useTranslation(["Default"]);
	const contentMaxWidth = "100rem";
	const [activeCategory, setActiveCategory] = useState("");
	const { fetchGuideBookPost } = useGuideBookPost();

	const [postItems, setPostItems] = useState([
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},

		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},

		{
			title: "g123123123",
			cover:
				"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Ffd1e7aba-fdbd-44f9-8ab8-7ca12c5ab346.png?alt=media",

			category: "BUSINESS_AND_INVESTMENT",
		},
	]);

	const fetchPostHandle = (params = {}) =>
		fetchGuideBookPost(params).then((res) => {
			const formattedItems =
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

			setPostItems(formattedItems);
		});

	useEffect(() => {
		fetchPostHandle({
			category: activeCategory,
		});
	}, [activeCategory]);

	const TopSection = () => (
		<Flex className="p-4 p-lg-4 bg-white" align="center" vertical>
			<Flex
				className="w-100 "
				style={{
					maxWidth: contentMaxWidth,
				}}
				vertical
				gap={20}
			>
				<BreadcrumbContainer />
			</Flex>
		</Flex>
	);

	const categoryItems = [
		{
			key: "BASIC_LIVING",
			title: t("basic_living_msg"),
			icon: svgBasicLivingIcon,
			background:
				"linear-gradient(0deg, #F9F2E7 0%, #F9F2E7 100%), linear-gradient(180deg, #F5FCEC 0%, #D8F4B3 100%)",
			color: "#C89340",
		},
		{
			key: "MOVING_TO_US",
			title: t("moving_to_us_msg"),
			icon: svgMovingToUsIcon,
			background:
				"linear-gradient(0deg, #FCEBE6 0%, #FCEBE6 100%), linear-gradient(180deg, #FFEDF2 0%, #FFCEDC 100%)",
			color: "#D15733",
		},
		{
			key: "LIVING_PERMANENTLY",
			title: t("living_permanently_msg"),
			icon: svgLivingPermanentlyIcon,
			background:
				"linear-gradient(0deg, #EDF5E6 0%, #EDF5E6 100%), linear-gradient(180deg, #FEF7E7 0%, #FFEEC7 100%)",
			color: "#89C157",
		},
		{
			key: "TRAVEL",
			title: t("travel_msg"),
			icon: svgTravelIcon,
			background:
				"linear-gradient(0deg, #E8F7F7 0%, #E8F7F7 100%), linear-gradient(180deg, #E5F7F9 0%, #B2F7FF 100%)",
			color: "#29A0A8",
		},
		{
			key: "LEARNING",
			title: t("learning_msg"),
			icon: svgLearningsIcon,
			background:
				"linear-gradient(0deg, #FAF0F8 0%, #FAF0F8 100%), linear-gradient(180deg, #E6FBFE 0%, #CEF9FF 100%)",
			color: "#B072AA",
		},
		{
			key: "TRANSFER",
			title: t("transfer_msg"),
			icon: svgTransferIcon,
			background:
				"linear-gradient(0deg, #F7F4DF 0%, #F7F4DF 100%), linear-gradient(180deg, #F6F4FF 0%, #E4DEFF 100%)",
			color: "#8B8450",
		},
		{
			key: "HEALTH",
			title: t("health_msg"),
			icon: svgHealthIcon,
			background:
				"linear-gradient(0deg, #E9F6EF 0%, #E9F6EF 100%), linear-gradient(180deg, #E0F3FF 0%, #BEE5FF 100%)",
			color: "#3D9C7F",
		},

		{
			key: "KIDS",
			title: t("kids_msg"),
			icon: svgKidsIcon,
			background:
				"linear-gradient(0deg, #FDEEF5 0%, #FDEEF5 100%), linear-gradient(180deg, #F6F4FF 0%, #E4DEFF 100%)",
			color: "#DC5A9A",
		},

		{
			key: "BUSINESS_AND_INVESTMENT",
			title: t("business_and_investment_msg"),
			icon: svgBusinessInvestmentIcon,
			background:
				"linear-gradient(0deg, #E6FBFE 0%, #E6FBFE 100%), linear-gradient(180deg, #E0F3FF 0%, #BEE5FF 100%)",
			color: "#35B7C7",
		},

		{
			key: "THAI_PRIDE",
			title: t("thai_pride_msg"),
			icon: svgThaiPrideIcon,
			background:
				"linear-gradient(0deg, #ECEFFA 0%, #ECEFFA 100%), linear-gradient(180deg, #F6F4FF 0%, #E4DEFF 100%)",
			color: "#2C69B9",
		},
	];

	const CategorySection = () => (
		<Flex
			className="p-5 p-lg-5"
			align="center"
			vertical
			style={{
				background: "#F8F8F9",
				paddingTop: "2rem",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: contentMaxWidth,
				}}
				vertical
				gap={20}
			>
				<Title>{t("thai_guide_book_msg")}</Title>

				<Flex wrap="wrap" justify="space-start" className="w-100" gap={20}>
					{categoryItems.map((i) => (
						<Flex
							key={i.key}
							style={{
								minWidth: "19%",
							}}
							className="my-3"
							vertical
							onClick={() => console.log("hey")}
						>
							<Button
								className="m-0 px-4 border-0 w-100"
								style={{
									background: i.background,
									boxShadow:
										"0px 20px 24px 0px rgba(20, 37, 63, 0.06), 0px 0px 1px 0px rgba(12, 26, 75, 0.10)",
									height: "9.5rem",
								}}
								onClick={() => setActiveCategory(i.key)}
							>
								<Flex vertical justify="center" gap={20}>
									<Image src={i.icon} width={45} preview={false} />
									<Title
										level={4}
										style={{ color: i.color, textAlign: "left" }}
									>
										{i.title}
									</Title>
								</Flex>
							</Button>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Flex>
	);

	const PostSection = () => (
		<Flex
			className="p-5 p-lg-5 bg-white"
			align="center"
			vertical
			style={{
				paddingTop: "2rem",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: contentMaxWidth,
				}}
				vertical
				gap={30}
			>
				<Flex align="center">
					<Title className="m-0 text-primary">
						{t(`${activeCategory.toLowerCase() || "all_category"}_msg`)}
					</Title>
					{activeCategory && (
						<Button
							type="link"
							className="mt-2"
							onClick={() => setActiveCategory("")}
						>
							<Title
								className="m-0 text-danger "
								style={{ fontSize: "1.2rem" }}
							>
								{t("clear_filter_msg")}
							</Title>
						</Button>
					)}
				</Flex>

				<Title className="m-0" level={5}>
					{t("result_count_msg", {
						result: numberWithCommas(postItems?.length || 0),
					})}
				</Title>

				<FivePostLayout items={postItems.slice(0, 6)} />

				<GridPostLayout items={postItems.slice(5)} />
			</Flex>
		</Flex>
	);

	const App = () => (
		<>
			{" "}
			<TopSection />
			<CategorySection />
			<PostSection />
		</>
	);
	return <App />;
}

export default GuideBook;
