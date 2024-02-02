import { Card, Flex, Image } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Link } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../Assest/Asset";
import { formatString } from "../../Util/Util";

/**
 *
 * @items [{category: "", cover: "", title: ""}]
 * @returns
 */
function FlexPostLayout(
	{
		items = [],
		bodyStyle = {},
		cardStyle = {},
		flexStyle = {},
		wrap = "wrap",
		className = "",
	},
	ref
) {
	return (
		<Flex
			wrap={wrap}
			style={{
				...flexStyle,
			}}
			justify="space-between"
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
							preview={{ maskClassName: "rounded-0" }}
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
						href="https://ant.design"
						target="_blank"
						className=""
						style={{
							fontSize: "1rem",
							textDecoration: "underline",
						}}
					>
						{formatString(
							i.category.toLowerCase().replaceAll("_", " "),
							"sentencecase"
						)}
					</Link>
					<Title className="m-0 p-0 " ellipsis level={5}>
						{i.title}
					</Title>
				</Card>
			))}
		</Flex>
	);
}

export default React.forwardRef(FlexPostLayout);
