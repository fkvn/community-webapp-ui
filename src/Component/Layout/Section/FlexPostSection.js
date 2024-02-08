import { Card, Empty, Flex, Image, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../Asset/Asset";

/**
 *
 * @items [{category: "", cover: "", title: "", onCick: () => {}, categoryLinkTo: ""}]
 * @returns
 */
function FlexPostSection(
	{
		items = [],
		bodyStyle = {},
		cardStyle = {},
		flexStyle = {},
		wrap = "wrap",
		justify = "space-start",
		className = "",
		showSkeleton = false,
		showEmpty = false,
	},
	ref
) {
	const { t } = useTranslation();

	return (
		<Flex
			wrap={wrap}
			style={{
				...flexStyle,
			}}
			justify={justify}
			className={`w-100 ${className}`}
			gap={items?.length > 3 ? 40 : 80}
			ref={ref}
		>
			{items.map((i, index) => (
				<Card
					className="border-0"
					style={{
						width: "23%",
						...cardStyle,
					}}
					key={index}
					cover={
						<Image
							alt="gallery"
							src={i.cover}
							height="15rem"
							className="rounded-0"
							style={{
								cursor: "pointer",
							}}
							onClick={i?.onClick}
							preview={false}
							fallback={svgThaiNowLogoWithWords}
						/>
					}
					styles={{
						body: {
							margin: 0,
							padding: "1.5rem 0",
							...bodyStyle,
						},
					}}
				>
					<Link
						to={`${i?.categoryLinkTo}?category=${i?.category}`}
						reloadDocument
						className=""
						style={{
							fontSize: "1rem",
							textDecoration: "underline",
						}}
					>
						{i?.categoryKey
							? t(`${i?.category.toLowerCase()}_msg`) || ""
							: i.category || ""}
					</Link>
					<Title
						className="m-0 p-0 "
						ellipsis
						level={5}
						style={{
							cursor: "pointer",
						}}
						onClick={i?.onClick}
					>
						{i?.title}
					</Title>
				</Card>
			))}

			{items?.length < 1 ? (
				showSkeleton ? (
					<Skeleton active />
				) : showEmpty ? (
					<Empty description={<span>{t("no_infor_msg")}</span>} />
				) : (
					<></>
				)
			) : (
				<></>
			)}

			{/* {items.length < 1 &&
				(showSkeleton ? (
					<Skeleton active />
				) : (
					<Empty description={<span>{t("no_infor_msg")}</span>} />
				))} */}

			<div></div>
		</Flex>
	);
}

export default React.forwardRef(FlexPostSection);
