import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { RiEdit2Line } from "@remixicon/react";
import { Button, Carousel, Empty, Flex, Image, Skeleton, Tooltip } from "antd";
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
	const contentMaxWidth = "90%";
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
			category: rootItem?.details?.category || "",
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
					padding: "5rem 5rem",
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
					// gap={30}
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
							wrap=""
							showEmpty={true}
							bodyStyle={{
								background: "#ECEFFA",
								// padding: "1.5rem",
							}}
							justify="space-start"
						/>
					)}
				</Flex>
			</Flex>
		);

	const PostDetailSection = () => (
		<Flex
			className="p-5 p-lg-5 bg-white "
			align="start-first"
			vertical
			style={{
				paddingTop: "2rem",
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
					fontSize: "5rem",
				}}
			>
				{item.title}
			</Title>
			<Flex
				justify="space-between"
				align="center"
				wrap="wrap"
				className="my-2 mb-5"
			>
				<Flex
					gap={10}
					align="center"
					style={{
						maxWidth: "70%",
					}}
				>
					<Image
						width={30}
						src={item.owner.avatarUrl}
						fallback={svgThaiNowLogoWithWords}
						preview={false}
					/>
					<Flex vertical>
						<Title level={4} className="m-0">
							<Flex gap={5} align="center">
								<div
									className=" text-secondary"
									style={{
										fontWeight: "lighter",
										marginTop: ".1rem",
									}}
								>
									By
								</div>
								{item.owner.username}
								<div
									className=" text-secondary"
									style={{
										fontWeight: "lighter",
										marginTop: ".1rem",
									}}
								>
									{`- ${formatTime(item.updatedOn)}`}
								</div>
							</Flex>
						</Title>
					</Flex>
				</Flex>

				<Flex gap={20}>
					<Share
						title={item.title}
						buttonProps={{
							size: "large",
						}}
						hashtag={`#ThaiNow-${item?.category?.replaceAll("_", "-")?.toLowerCase()}`}
						summary={stripoutHTML(item.description)}
						url={window.location.href}
					/>{" "}
					{isUserAuthorizedEditPost(item?.owner?.id) && (
						<>
							<Button
								type="primary"
								size="large"
								className=" custom-center bg-warning"
								onClick={() =>
									navigate(
										`${GUIDE_BOOK_EDIT_POST_PATH}/${id}?redirectUri=${GUIDE_BOOK_PATH.slice(1)}/${id}`
									)
								}
							>
								<Tooltip title={t("edit_record_msg")}>
									<RiEdit2Line size={20} />
								</Tooltip>
							</Button>

							<DeleteBtn
								btnProps={{
									type: "primary",
									size: "large",
									className: " custom-center bg-danger",
								}}
								iconProps={{
									color: "white",
								}}
								onConfirm={() =>
									deleteGuideBook(id).then(() => navigate(`${GUIDE_BOOK_PATH}`))
								}
							/>
						</>
					)}
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
				className="my-5 iframe-w-100 rte"
				style={{
					minHeight: "30rem",
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
			align="center"
			vertical
			style={{
				paddingTop: "2rem",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100"
				style={{
					maxWidth: contentMaxWidth,
				}}
				vertical
				gap={30}
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
