import { Card, Empty, Flex, Grid, Image, Skeleton } from "antd";
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
		justify = "space-start",
		className = "",
		showSkeleton = false,
		showEmpty = false,
		horizontalScroll = false,
	},
	ref
) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const { t } = useTranslation();

	const cardWidth = 30;

	return (
		<Flex
			wrap={horizontalScroll ? "" : "wrap"}
			justify={justify}
			className={` ${className}`}
			gap={"2.5%"}
			ref={ref}
			style={{
				width: horizontalScroll ? `${cardWidth * items?.length}rem` : "100%",
				minWidth: "100%",
				...(!screens.md && { minHeight: "5rem" }),
				...flexStyle,
			}}
			{...(horizontalScroll ? {} : screens.xs && { vertical: true })}
		>
			{items.map((i, index) => (
				<Card
					className="border-0"
					style={{
						width: horizontalScroll
							? `${cardWidth}rem`
							: screens.lg
								? "23%"
								: screens.md
									? "31%"
									: screens.xs
										? "100%"
										: "48%",
						margin: horizontalScroll ? "" : `${screens.xs ? "1rem" : "0"} 0 `,
						...cardStyle,
					}}
					key={index}
					cover={
						<Image
							alt="gallery"
							src={i.cover}
							height={screens.xxl || screens.xs ? "15rem" : "11.5rem"}
							className="rounded-0"
							style={{
								cursor: "pointer",
								objectPosition: "center",
								objectFit: "cover",
							}}
							onClick={i?.onClick}
							preview={false}
							fallback={svgThaiNowLogoWithWords}
						/>
					}
					styles={{
						body: {
							margin: 0,
							padding: `1.5rem 0`,
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
						className="m-0 p-0 mt-2 "
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
