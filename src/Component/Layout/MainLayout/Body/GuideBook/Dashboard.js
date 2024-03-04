import { Button, Flex, Grid, Image } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GUIDE_BOOK_PATH, USER_REDUCER } from "../../../../../Util/ConstVar";
import {
	extractExistingParams,
	numberWithCommas,
	scrollToActiveElement,
} from "../../../../../Util/Util";
import BreadcrumbContainer from "../../../../Breadcrumb/BreadcrumbContainer";
import NewGuideBookPostFloatBtn from "../../../../Button/GuideBook/NewPostFloatBtn";
import useGuideBookPost from "../../../../Hook/PostHook/useGuideBookPost";
import useHorizontalScroll from "../../../../Hook/useHorizontalScroll";
import FivePostSection from "../../../Section/FivePostSection";
import FlexPostSection from "../../../Section/FlexPostSection";

function GuideBookDashBoard() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	console.log(screens);
	const { scrollContainer } = useHorizontalScroll();

	const { t } = useTranslation(["Default"]);
	const contentMaxWidth = "90%";
	const { fetchGuideBooks, fetchGuideBookCategories } = useGuideBookPost();
	const [urlParams, setUrlParams] = useSearchParams();
	const [activeCategory, setActiveCategory] = useState(
		urlParams.get("category") || ""
	);
	const [postItems, setPostItems] = useState([]);
	const navigate = useNavigate();

	const newPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
		"GUIDEBOOK_CREATE",
	];

	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);

	const isUserAuthorizedCreateNewPost = () =>
		(profile?.authorities || []).some((v) => newPostAuthorities.includes(v));

	const fetchPostHandle = (searchParams = {}) =>
		fetchGuideBooks(searchParams).then((res) => {
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
		<Flex
			className=" bg-white"
			align="center"
			vertical
			style={{
				padding: screens.xxl ? "4rem" : screens.md ? "2rem" : "2rem 0",
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
				<BreadcrumbContainer />
			</Flex>
		</Flex>
	);

	const categoryItems = fetchGuideBookCategories();

	const CategorySection = () => (
		<Flex
			align="center"
			vertical
			style={{
				background: "#F8F8F9",
				paddingTop: "2rem",
				minHeight: "20rem",
				padding: screens.xxl ? "4rem" : screens.md ? "2rem" : "2rem 0",
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
				<Title
					style={{
						...(screens.xs && { fontSize: "2rem" }),
					}}
				>
					{t("thai_guide_book_msg")}
				</Title>
				{scrollContainer(
					<Flex
						wrap={screens.lg ? "wrap" : ""}
						justify="space-start"
						className="w-100"
						gap={screens.lg ? "1%" : "5%"}
					>
						{categoryItems.map((i) => (
							<Flex
								key={i.key}
								style={{
									...(screens.lg && { width: "19%" }),
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
										height: screens.lg ? "9.5rem" : "7rem",
									}}
									onClick={() => setActiveCategory(i.key)}
								>
									<Flex vertical justify="center" gap={screens.lg ? 20 : 10}>
										<Image
											src={i.icon}
											width={screens.lg ? 45 : 30}
											preview={false}
										/>
										<Title
											level={4}
											style={{
												color: i.color,
												textAlign: "left",
												...(!screens.md && {
													fontSize: "1.2rem",
												}),
											}}
											ellipsis
										>
											{i.title}
										</Title>
									</Flex>
								</Button>
							</Flex>
						))}
					</Flex>
				)}
			</Flex>
		</Flex>
	);

	const PostSection = () => (
		<Flex
			className="bg-white"
			align="center"
			vertical
			style={{
				paddingTop: "2rem",
				minHeight: "20rem",
				padding: screens.xxl ? "4rem" : screens.md ? "2rem" : "2rem 0",
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
					<Title
						className="m-0 text-primary"
						style={{
							...(screens.xs && { fontSize: "2rem" }),
						}}
					>
						{t(`${activeCategory.toLowerCase() || "all_category"}_msg`)}
					</Title>
					{activeCategory && (
						<Button
							type="link"
							className="mt-2"
							onClick={() => {
								scrollToActiveElement();
								setActiveCategory("");
							}}
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

				<FivePostSection items={postItems.slice(0, 6)} />

				<FlexPostSection items={postItems.slice(5)} />
			</Flex>
		</Flex>
	);

	const App = () => (
		<>
			<TopSection />
			<CategorySection />
			<PostSection />
			{isUserAuthorizedCreateNewPost() && (
				<NewGuideBookPostFloatBtn
					btnStyle={{
						maxWidth: "15rem",
					}}
					redirectUri={`${GUIDE_BOOK_PATH.slice(1)}?category=${activeCategory}`}
				/>
			)}
		</>
	);
	return <App />;
}

export default GuideBookDashBoard;
