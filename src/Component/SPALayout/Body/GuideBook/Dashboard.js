import { Button, Flex, Image } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { numberWithCommas } from "../../../../Util/Util";
import BreadcrumbContainer from "../../../Breadcrumb/BreadcrumbContainer";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import FivePostLayout from "../../../Layout/FivePostLayout";
import FlexPostLayout from "../../../Layout/FlexPostLayout";

import { GUIDE_BOOK_PATH } from "../../../../Util/ConstVar";
import { extractExistingParams } from "../../../../Util/Util";
function GuideBookDashBoard() {
	const { t } = useTranslation(["Default"]);
	const contentMaxWidth = "100rem";
	const { fetchGuideBookPosts, fetchGuideBookCategories } = useGuideBookPost();
	const [urlParams, setUrlParams] = useSearchParams();
	const [activeCategory, setActiveCategory] = useState(
		urlParams.get("category") || ""
	);
	const [postItems, setPostItems] = useState([]);
	const navigate = useNavigate();

	const fetchPostHandle = (searchParams = {}) =>
		fetchGuideBookPosts(searchParams).then((res) => {
			const formattedItems =
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

			setPostItems(formattedItems);
		});

	useEffect(() => {
		const params = {
			...extractExistingParams(urlParams),
			category: activeCategory,
		};
		setUrlParams(params);
		fetchPostHandle(params);
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

	const categoryItems = fetchGuideBookCategories();

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

				<Flex wrap="wrap" justify="space-start" className="w-100" gap={15}>
					{categoryItems.map((i) => (
						<Flex
							key={i.key}
							style={{
								minWidth: "19%",
							}}
							className="my-3"
							vertical
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

				<FlexPostLayout
					items={postItems.slice(5)}
					flexStyle={{
						minHeight: "10rem",
					}}
				/>
			</Flex>
		</Flex>
	);

	const App = () => (
		<>
			<TopSection />
			<CategorySection />
			<PostSection />
		</>
	);
	return <App />;
}

export default GuideBookDashBoard;
