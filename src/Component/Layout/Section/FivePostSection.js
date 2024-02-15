import { Card, Flex, Image, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../Asset/Asset";

/**
 *
 * @items [{category: "", cover: "", title: "", categoryKey: "", categoryLinkTo:"", onClick: () => {}}]
 * @itemsMaxHandleLength first 5 items
 * @returns
 */
function FivePostSection({ items = [] }) {
	const { t } = useTranslation();
	return items.length > 0 ? (
		<Flex
			className="w-100 my-5 "
			style={{
				minHeight: "auto",
				maxHeight: "60rem",
				overflow: "hidden",
			}}
			gap={20}
		>
			{/* 1st main item */}
			<Flex
				className={`${items.length === 1 ? "" : "p-4"}`}
				style={{
					width: `${items.length > 1 ? "50" : "100"}%`,
					backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 60%,rgba(0, 0, 0, 0.8) 100%), url(${
						items[0].cover || svgThaiNowLogoWithWords
					})`,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundColor: "#E9E9E9",
					backgroundSize: "cover",
					...(items.length === 1
						? {
								// ratio percentage of 16/9 if only 1 picture
								height: "0",
								paddingTop: "56.25%",
								paddingLeft: "2rem",
								paddingBottom: "2rem",
							}
						: {}),
					cursor: "pointer",
				}}
				align="flex-end"
				onClick={items[0]?.onClick}
			>
				<Flex vertical gap={20}>
					<Link
						className="text-white "
						style={{
							fontSize: "1rem",
							textDecoration: "underline",
						}}
					>
						{items[0]?.categoryKey
							? t(`${items[0]?.category.toLowerCase()}_msg`) || ""
							: items[0].category || ""}
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
									style={{
										cursor: "pointer",
									}}
									src={i.cover}
									height={items?.length === 1 ? "100%" : "15rem"}
									className="rounded-0"
									preview={false}
									fallback={svgThaiNowLogoWithWords}
									onClick={i?.onClick}
								/>
							}
							styles={{
								body: {
									margin: 0,
									padding: "1.5rem 0",
								},
							}}
						>
							<Link
								to={`${i?.categoryLinkTo}?category=${i?.category}`}
								reloadDocument
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
								onClick={i?.onClick}
								style={{
									cursor: "pointer",
								}}
							>
								{i?.title}
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

export default FivePostSection;
