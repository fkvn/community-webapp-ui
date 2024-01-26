import { Card, Flex, Image, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../Assest/Asset";

/**
 *
 * @items [{category: "", cover: "", title: ""}]
 * @itemsMaxHandleLength first 5 items
 * @returns
 */
function FivePostLayout({ items = [] }) {
	return items.length > 0 ? (
		<Flex
			className="w-100 my-5 "
			style={{
				minHeight: "40rem",
				maxHeight: "50rem",
				overflow: "hidden",
			}}
			gap={20}
		>
			{/* 1st main item */}
			<Flex
				className="p-4"
				style={{
					width: `${items.length > 1 ? "50" : "100"}%`,
					minHeight: "40rem",
					backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 60%,rgba(0, 0, 0, 0.8) 100%), url(${
						items[0].cover || svgThaiNowLogoWithWords
					})`,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundColor: "#E9E9E9",
					backgroundSize: "cover",
				}}
				align="flex-end"
			>
				<Flex vertical gap={20}>
					<Link
						href="https://ant.design"
						target="_blank"
						className="text-white "
						style={{
							fontSize: "1rem",
							textDecoration: "underline",
						}}
					>
						{items[0].category}
					</Link>
					<Title className="m-0 p-0 text-white" level={4}>
						{items[0].title}
					</Title>
				</Flex>
			</Flex>

			{/* sub-items - max items to display is 5 -> 4 here and 1 above */}
			{items.length > 1 && (
				<Flex
					style={{
						width: "50%",
						overflowY: "auto",
						overflowX: "hidden",
						maxHeight: "50rem",
					}}
					className="h-100"
					wrap="wrap"
					gap="1rem"
					justify="space-evenly"
					align="stretch"
				>
					{/* max 4 sub-items */}
					{items.slice(1, 5).map((i, index, items) => (
						<Card
							key={index}
							style={{
								width: `${
									items.length === 3 && index === 2
										? "100"
										: items.length <= 2
										  ? "100"
										  : "48"
								}%`,
								border: 0,
							}}
							cover={
								<Image
									alt="gallery"
									src={i.cover}
									height="15rem"
									className="rounded-0"
									preview={{ maskClassName: "rounded-0" }}
									fallback={svgThaiNowLogoWithWords}
								/>
								// <img
								// 	alt={`${i.category}`}
								// 	src={i.cover}
								// 	className="rounded-0"
								// 	style={{
								// 		// default width to display the fallback photo
								// 		width: "100%",
								// 		// set image min height
								// 		...(items.length === 1
								// 			? // when only 1 sub-item
								// 			  { minHeight: "35rem" }
								// 			: // default min height to display the fallback photo
								// 			  { minHeight: "15rem" }),
								// 		// set background to display the fallback photo
								// 		backgroundImage: `url(${svgThaiNowLogoWithWords})`,
								// 		backgroundPosition: "center",
								// 		backgroundRepeat: "no-repeat",
								// 		backgroundColor: "#E9E9E9",
								// 		backgroundSize: "cover",

								// 		// image attr
								// 		maxHeight: "15rem",
								// 		objectFit: "cover",
								// 		objectPosition: "center",
								// 	}}
								// />
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
								{i.category}
							</Link>
							<Title className="m-0 p-0 " ellipsis level={5}>
								{i.title}
							</Title>
						</Card>
					))}
				</Flex>
			)}
		</Flex>
	) : (
		<Skeleton active />
	);
}

export default FivePostLayout;
