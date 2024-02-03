import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Empty, Flex, Image, Skeleton } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../../Assest/Asset";
import {
	GUIDE_BOOK_NEW_POST_PATH,
	GUIDE_BOOK_PATH,
	REDIRECT_URI,
	USER_REDUCER,
} from "../../../../Util/ConstVar";
import { formatTime } from "../../../../Util/Util";
import BreadcrumbContainer from "../../../Breadcrumb/BreadcrumbContainer";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import useHorizontalScroll from "../../../Hook/useHorizontalScroll";
import FlexPostLayout from "../../../Layout/FlexPostLayout";

function GuideBookDetail() {
	const contentMaxWidth = "100rem";
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { fetchGuideBookPost, fetchGuideBookPosts } = useGuideBookPost();
	const { scrollContainer, scroll } = useHorizontalScroll();
	const { id } = useParams();
	const newPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
		"GUIDEBOOK_CREATE",
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

	const isProfileAllowedCreateNewPost = () =>
		(profile?.authorities || []).some((v) => newPostAuthorities.includes(v));

	const formatItem = (item = {}) => {
		return {
			id: item?.id || "",
			owner: {
				id: item?.owner?.accountId || "",
				avatarUrl: item?.postAsAnonymous
					? svgThaiNowLogoWithWords
					: item?.owner?.details?.avatarUrl || "",
				username: item?.postAsAnonymous
					? t("anonymous_msg")
					: item?.owner?.details?.username || "",
			},
			title: item?.details?.title || "",
			category: item?.details?.category || "",
			bannerUrl: item?.details?.bannerUrl || "",
			description: item?.details?.description || "",
			updatedOn: item?.updatedOn || "",
		};
	};

	const fetchItem = (id) =>
		fetchGuideBookPost(id).then((res = {}) => {
			const formattedItem = formatItem(res);
			setItem(formattedItem);
			fetchMoreItem(res);
		});

	const fetchMoreItem = (rootItem = {}) =>
		fetchGuideBookPosts({
			category: rootItem?.details?.category || "",
		}).then((res = {}) => {
			const formattedItem =
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
			setMoreItems(formattedItem);
		});

	useEffect(() => {
		fetchItem(id);
	}, [id]);

	const extraCrumbs = {
		title: t(`${item?.category.toLowerCase()}_msg`) || "",
	};

	const MoreItemSection = () => (
		<Flex
			className="p-5 p-lg-5 w-100"
			align="center"
			vertical
			style={{
				background: "#ECEFFA",
				paddingTop: "2rem",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: "90rem",
				}}
				vertical
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
					<FlexPostLayout
						items={moreItems}
						wrap=""
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
			className="p-5 p-lg-5 bg-white"
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
				className="text-start m-0 p-0"
				href={`${GUIDE_BOOK_PATH}?category=${item?.category}`}
			>
				{t(`${item?.category.toLowerCase()}_msg`) || ""}
			</Button>

			<Title className="c-primary-important">{item.title}</Title>

			<Flex gap={20}>
				<Image
					width={50}
					src={item.owner.avatarUrl}
					fallback={svgThaiNowLogoWithWords}
					preview={false}
				/>
				<Title level={5}>
					{item.owner.username}
					<span
						className="text-secondary"
						style={{
							fontSize: "0.8rem",
						}}
					>
						{` - ${formatTime(item.updatedOn)}`}
					</span>
				</Title>
			</Flex>

			<Content
				className="my-5"
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
				<Flex justify="space-between" align="center">
					<BreadcrumbContainer extra={true} extraCrumbs={extraCrumbs} />
					{isProfileAllowedCreateNewPost() && (
						<Button
							type="primary"
							size="large"
							onClick={() => {
								navigate(
									`${GUIDE_BOOK_NEW_POST_PATH}?${REDIRECT_URI}=${GUIDE_BOOK_PATH.slice(
										1
									)}%2F${id}`
								);
							}}
						>
							New Post
						</Button>
					)}
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
		</Flex>
	);
	return <App />;
}

export default GuideBookDetail;
