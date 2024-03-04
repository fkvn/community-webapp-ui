import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { RiEdit2Line } from "@remixicon/react";
import {
	Button,
	Carousel,
	Empty,
	Flex,
	Grid,
	Image,
	Skeleton,
	Tooltip,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../../../Asset/Asset";
import {
	GUIDE_BOOK_EDIT_POST_PATH,
	GUIDE_BOOK_PATH,
	USER_REDUCER,
} from "../../../../../Util/ConstVar";
import {
	formatString,
	formatTime,
	stripoutHTML,
	truncate,
} from "../../../../../Util/Util";
import BreadcrumbContainer from "../../../../Breadcrumb/BreadcrumbContainer";
import DeleteBtn from "../../../../Button/DeleteBtn";
import NewGuideBookPostFloatBtn from "../../../../Button/GuideBook/NewPostFloatBtn";
import useGuideBookPost from "../../../../Hook/PostHook/useGuideBookPost";
import useHorizontalScroll from "../../../../Hook/useHorizontalScroll";
import MetaTag from "../../../../SEO/MetaTag";
import Share from "../../../../Share/Share";
import FlexPostSection from "../../../Section/FlexPostSection";

function GuideBookDetail() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const contentMaxWidth = "100rem";
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { fetchGuideBook, fetchGuideBooks, deleteGuideBook } =
		useGuideBookPost();
	const { scrollContainer, scroll } = useHorizontalScroll();
	const { id } = useParams();

	const newPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
		"GUIDEBOOK_CREATE",
	];

	const editPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
	];

	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);

	const [item, setItem] = useState({
		id: "",
		owner: {
			avatarUrl: "",
			username: "",
		},
		title: "",
		category: "",
		bannerUrl: "",
		description: "",
		updatedOn: "",
	});
	const [moreItems, setMoreItems] = useState([]);

	const isUserAuthorizedCreateNewPost = () =>
		(profile?.authorities || []).some((v) => newPostAuthorities.includes(v));

	const isUserAuthorizedEditPost = (profileOwnerId) =>
		(profile?.authorities || []).some((v) => editPostAuthorities.includes(v)) &&
		profile?.id === profileOwnerId;

	const formatItem = ({ id, postAsAnonymous, owner, details }) => {
		return {
			id: id || "",
			owner: {
				id: owner?.id || "",
				avatarUrl: postAsAnonymous
					? svgThaiNowLogoWithWords
					: owner?.details?.avatarUrl || "",
				username: postAsAnonymous
					? t("anonymous_msg")
					: owner?.details?.username || "",
			},
			title: details?.title || "",
			category: details?.category || "",
			bannerUrl: details?.bannerUrl || "",
			description: details?.description || "",
			updatedOn: details?.updatedOn || "",
		};
	};

	const fetchItem = (id) =>
		fetchGuideBook(id).then((res = {}) => {
			const formattedItem = formatItem(res);
			setItem(formattedItem);
			fetchMoreItem(res);
		});

	const fetchMoreItem = (rootItem = {}) =>
		fetchGuideBooks({
			// category: rootItem?.details?.category || "",
		}).then((res = {}) => {
			const formattedItem =
				res?.fetchResult
					?.filter((p) => p?.id !== rootItem?.id)
					?.reduce(
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
			setMoreItems(formattedItem);
		});

	useEffect(() => {
		fetchItem(id).then(() => window.scrollTo(0, 0));
	}, [id]);

	const extraCrumbs = {
		title: item?.category.toLowerCase()
			? t(`${item?.category.toLowerCase()}_msg`)
			: "",
	};

	const MoreItemSection = () =>
		moreItems?.length > 0 && (
			<Flex
				className=" w-100"
				align="center"
				vertical
				style={{
					background: "#ECEFFA",
					padding: screens.xs ? "2rem" : "5rem",
				}}
			>
				<Flex
					className="w-100"
					style={{
						maxWidth: contentMaxWidth,
						minHeight: "16rem",
					}}
					vertical
					justify="space-between"
					gap={30}
				>
					<Flex justify="space-between">
						<Title level={3} className="c-primary-important">
							{t("more_item_msg")}
						</Title>

						<Flex gap={20}>
							<LeftCircleOutlined
								className="horizontal-scroll-icon"
								onClick={() => scroll(-50)}
							/>
							<RightCircleOutlined
								className="horizontal-scroll-icon"
								onClick={() => scroll(50)}
								onMouseDown={() => scroll(50)}
							/>
						</Flex>
					</Flex>
					{scrollContainer(
						<FlexPostSection
							items={moreItems}
							showEmpty={true}
							horizontalScroll={true}
							bodyStyle={{
								background: "#ECEFFA",
							}}
						/>
					)}
				</Flex>
			</Flex>
		);

	const PostDetailSection = () => (
		<Flex
			className=" bg-white "
			align="start-first"
			vertical
			style={{
				padding: "2rem .5rem",
				minHeight: "20rem",
			}}
			gap={20}
		>
			<Button
				type="link"
				className="text-start m-0 p-0 "
				href={`${GUIDE_BOOK_PATH}?category=${item?.category}`}
			>
				{t(`${item?.category.toLowerCase()}_msg`) || ""}
			</Button>

			<Title
				className="c-primary-important m-0"
				style={{
					// fontSize: "5rem",
					fontSize: screens.xl ? "5rem" : screens.xs ? "2rem" : "3rem",
					...(screens.xs && { fontSize: "2rem" }),
					...(screens.xl && { fontSize: "5rem" }),
				}}
			>
				{item.title}
			</Title>
			<Flex justify="space-between" align="center" wrap="wrap" sty>
				<Flex
					gap={10}
					align={screens.xl ? "center" : "flex-start"}
					style={{
						maxWidth: "60%",
						margin: screens.xl ? "3rem 0" : screens.xs ? "" : "1rem 0",
					}}
				>
					<Image
						width={screens.xl ? 55 : 40}
						src={item.owner.avatarUrl}
						fallback={svgThaiNowLogoWithWords}
						preview={false}
					/>
					<Flex vertical={!screens.xl}>
						<Title
							level={4}
							className="m-0"
							ellipsis
							style={{
								...(!screens.xl && { fontSize: "1rem" }),
							}}
						>
							{item.owner.username}
						</Title>
						<Title
							level={5}
							className=" text-secondary"
							style={{
								fontWeight: "lighter",
								marginTop: ".1rem",
							}}
						>
							{`${screens.xl ? "-" : ""} ${formatTime(item.updatedOn)}`}
						</Title>
					</Flex>
				</Flex>

				<Flex gap={screens.lg ? 20 : 10}>
					{isUserAuthorizedEditPost(item?.owner?.id) && (
						<>
							<Button
								type="ghost"
								size={screens.xl ? "large" : "medium"}
								className=" custom-center border-0 m-0 p-0"
								onClick={() =>
									navigate(
										`${GUIDE_BOOK_EDIT_POST_PATH}/${id}?redirectUri=${GUIDE_BOOK_PATH.slice(1)}/${id}`
									)
								}
							>
								<Tooltip title={t("edit_record_msg")}>
									<RiEdit2Line size={25} className="c-business-important" />
								</Tooltip>
							</Button>

							<DeleteBtn
								btnProps={{
									type: "ghost",
									size: screens.xl ? "large" : "medium",
									className: " custom-center border-0 m-0 p-0",
								}}
								iconProps={{
									size: "1.5rem",
								}}
								onConfirm={() =>
									deleteGuideBook(id).then(() => navigate(`${GUIDE_BOOK_PATH}`))
								}
							/>
						</>
					)}
					<Share
						title={item.title}
						buttonProps={{
							type: "ghost",
							className: "custom-center border-0 m-0 p-0",
							size: screens.xl ? "large" : "medium",
						}}
						iconProps={{
							size: "1.5rem",
							className: "c-primary-important",
						}}
						hashtag={`#ThaiNow-${item?.category?.replaceAll("_", "-")?.toLowerCase()}`}
						summary={stripoutHTML(item.description)}
						url={window.location.href}
					/>{" "}
				</Flex>
			</Flex>

			<Carousel autoplay className="w-100">
				<div className="w-100">
					<Image
						width="100%"
						style={{
							maxHeight: "50rem",
							// objectFit: "contain",
						}}
						src={item.bannerUrl}
						fallback={svgThaiNowLogoWithWords}
					/>
				</div>
			</Carousel>

			<Content
				className="iframe-w-100 rte"
				style={{
					minHeight: "30rem",
					margin: screens.lg ? "1rem 0" : "",
				}}
			>
				{item.description ? (
					parse(item.description)
				) : (
					<Empty description={<span>{t("no_infor_msg")}</span>} />
				)}
			</Content>
		</Flex>
	);

	const App = () => (
		<Flex
			className="bg-white"
			justify="center"
			align="center"
			vertical
			style={{
				minHeight: "20rem",
				padding: screens.sm ? "2rem" : "2rem 1rem",
			}}
		>
			<Flex
				className="w-100"
				style={{
					maxWidth: contentMaxWidth,
				}}
				vertical
			>
				<Flex
					justify="space-between"
					align="center"
					style={{
						position: "sticky",
					}}
				>
					<BreadcrumbContainer extra={true} extraCrumbs={extraCrumbs} />
				</Flex>
				{item?.id ? (
					<>
						<PostDetailSection />
					</>
				) : (
					<Skeleton
						active
						style={{
							minHeight: "37.7rem",
						}}
					/>
				)}
			</Flex>
			<MoreItemSection />
			{isUserAuthorizedCreateNewPost() && (
				<NewGuideBookPostFloatBtn
					redirectUri={`${GUIDE_BOOK_PATH.slice(1)}/${id}`}
				/>
			)}
			<MetaTag
				title={item.title}
				description={truncate(
					stripoutHTML(item.description?.replace("_", " "))
				)}
				siteName={`ThaiNow - ${formatString(item.category?.replace("_", " "), "capitalize")}`}
				imgUrl={item.bannerUrl}
				url={window.location.href}
			/>
		</Flex>
	);
	return (
		<>
			<App />
		</>
	);
}

export default GuideBookDetail;
