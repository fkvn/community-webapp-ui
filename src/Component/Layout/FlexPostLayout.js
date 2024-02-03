import { Card, Flex, Image, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../Assest/Asset";

/**
 *
 * @items [{category: "", cover: "", title: "", onCick: () => {}, categoryLinkTo: ""}]
 * @returns
 */
function FlexPostLayout(
	{
		items = [],
		bodyStyle = {},
		cardStyle = {},
		flexStyle = {},
		wrap = "wrap",
		justify = "space-between",
		className = "",
		showSkeleton = false,
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
			gap={40}
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
					bodyStyle={{
						margin: 0,
						padding: "1.5rem 0",
						...bodyStyle,
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

			{showSkeleton && items.length < 1 && <Skeleton active />}

			<div></div>
		</Flex>
	);
}

export default React.forwardRef(FlexPostLayout);
