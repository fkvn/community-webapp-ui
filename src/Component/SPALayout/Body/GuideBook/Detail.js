import { LeftCircleFilled } from "@ant-design/icons";
import { Button, Empty, Flex, Image, Skeleton } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../../Assest/Asset";
import { GUIDE_BOOK_PATH } from "../../../../Util/ConstVar";
import { GuideBookSample } from "../../../../Util/SampleDb";
import { formatString, formatTime } from "../../../../Util/Util";
import BreadcrumbContainer from "../../../Breadcrumb/BreadcrumbContainer";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import useHorizontalScroll from "../../../Hook/useHorizontalScroll";
import FlexPostLayout from "../../../Layout/FlexPostLayout";

function GuideBookDetail() {
	const contentMaxWidth = "100rem";
	const { t } = useTranslation();
	const { fetchGuideBookPost, fetchGuideBookPosts } = useGuideBookPost();
	const { scrollContainer, scroll } = useHorizontalScroll();
	const { id } = useParams();
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
	const [moreItems, setMoreItems] = useState([
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
		{
			category: "",
			title: "",
			cover: "",
		},
	]);

	const formatItem = (item = {}) => {
		return {
			id: item?.id || "",
			owner: {
				avatarUrl: item?.postAsAnonymous
					? svgThaiNowLogoWithWords
					: item?.owner?.details?.avatarUrl || "",
				username: item?.postAsAnonymous
					? t("anonymous_msg")
					: item?.owner?.details?.username || "",
			},
			title: item?.details?.title || "",
			category:
				formatString(
					item?.details?.category.replaceAll("_", " "),
					"sentencecase"
				) || "",
			bannerUrl: item?.details?.bannerUrl || "",
			description: item?.details?.description || "",
			updatedOn: item?.updatedOn || "",
		};
	};

	const fetchItem = (id) =>
		fetch(id).then((res = {}) => {
			const formattedItem = formatItem(res);
			setItem(formattedItem);
			fetchMoreItem(formattedItem);
		});

	const fetchMoreItem = (rootItem = {}) =>
		fetchGuideBookPosts({
			category: rootItem?.category || "",
		}).then((res = {}) => {
			const formattedItem =
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
			setMoreItems(formattedItem);
		});

	useEffect(() => {
		// fetchItem(id);
		setItem(formatItem(GuideBookSample));
	}, [id]);

	const extraCrumbs = {
		title: item.category,
	};

	const MoreItemSection = () => (
		<Flex
			className="p-5 p-lg-5 w-100"
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
					maxWidth: "90rem",
				}}
				vertical
				gap={30}
			>
				<Flex justify="space-between">
					<Title level={3} className="c-primary-important">
						{t("more_item_msg")}
					</Title>

					<Flex>
						<LeftCircleFilled
							className="scroll-LeftCircleFilled"
							// style={{ fontSize: "150% !important" }}
						/>
					</Flex>
				</Flex>
				{scrollContainer(
					<FlexPostLayout
						items={moreItems}
						wrap=""
						bodyStyle={{
							padding: "1.5rem",
						}}
						cardStyle={{ minWidth: "23%" }}
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
				href={`${GUIDE_BOOK_PATH}?category=${item?.category
					.replaceAll(" ", "_")
					.toUpperCase()}`}
			>
				{item.category}
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
					minHeight: "20rem",
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
				<BreadcrumbContainer extra={true} extraCrumbs={extraCrumbs} />
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
