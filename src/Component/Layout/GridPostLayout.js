import { Card, Flex, Image } from "antd";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../Assest/Asset";
import { formatString } from "../../Util/Util";

/**
 *
 * @items [{category: "", cover: "", title: ""}]
 * @returns
 */
function GridPostLayout({ items = [] }) {
	return (
		<Flex wrap="wrap" justify="space-between" className="w-100" gap={40}>
			{items.map((i, index) => (
				<Card
					className="border-0"
					style={{
						width: "23%",
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

export default GridPostLayout;
