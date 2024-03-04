import { Card, Flex, Grid, Image, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../Asset/Asset";
import useHorizontalScroll from "../../Hook/useHorizontalScroll";

/**
 *
 * @items [{category: "", cover: "", title: "", categoryKey: "", categoryLinkTo:"", onClick: () => {}}]
 * @itemsMaxHandleLength first 5 items
 * @returns
 */
function FivePostSection({ items = [] }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const { t } = useTranslation();
	const { scrollContainer } = useHorizontalScroll();

	console.log(items);

	const LeftLayout = ({ items = [] }) => (
		<Flex
			className={` ${items.length === 1 ? "" : "p-4"}`}
			style={{
				width: `${items?.length === 1 || !screens.xl ? "100" : "49"}%`,
				backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 60%,rgba(0, 0, 0, 0.8) 100%), url(${
					items[0]?.cover || svgThaiNowLogoWithWords
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
				minHeight: screens.xs ? "20rem" : !screens.xl ? "30rem" : "auto",
			}}
			// align="flex-end"
			justify="flex-end"
			vertical
			onClick={items[0]?.onClick}
		>
			<Link
				className="text-white "
				style={{
					fontSize: "1rem",
					textDecoration: "underline",
				}}
			>
				{items[0]?.categoryKey
					? t(`${items[0]?.category.toLowerCase()}_msg`) || ""
					: items[0]?.category || ""}
			</Link>
			<Title className="m-0 p-0 text-white" level={4}>
				{items[0]?.title}
			</Title>
		</Flex>
	);

	const RightLayOut = ({ items = [] }) => (
		<Flex
			justify="flex-start"
			gap={20}
			style={{
				width: screens.xl ? "49%" : `${20 * items.slice(1, 5).length}rem`,
				...(!screens.md && { minHeight: "5rem" }),
			}}
			{...(screens.xl && { wrap: "wrap" })}
		>
			{items?.slice(1, 5).map((i, index, items) => (
				<Card
					key={index}
					style={{
						...(screens.xl && {
							width: `${
								items.length === 3 && index === 2
									? "100%"
									: items.length <= 2
										? "100%"
										: "48%"
							}`,
						}),
						border: 0,
					}}
					cover={
						<Image
							alt="gallery"
							style={{
								cursor: "pointer",
								// maxHeight: "18rem",
							}}
							src={i.cover}
							height={
								items?.length === 1
									? "100%"
									: screens.xxl
										? "15rem"
										: screens.xl
											? "13rem"
											: "15rem"
							}
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
	);

	const App = () => (
		<Flex gap={screens.xl ? "2%" : 40} vertical={!screens.xl}>
			{items.length > 0 ? (
				<>
					<LeftLayout items={items} />
					{screens.xl ? (
						<RightLayOut items={items} />
					) : (
						scrollContainer(<RightLayOut items={items} />)
					)}
				</>
			) : (
				<Skeleton active />
			)}
		</Flex>
	);

	return <App />;
}

export default FivePostSection;
