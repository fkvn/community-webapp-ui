import { Card, Flex, Grid, Image } from "antd";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player/lazy";
import {
	imageThaiNow1,
	imageThaiNow2,
	imageThaiNow3,
	imageThaiNow4,
	imageThaiNow5,
	imageThaiNow6,
	imageThaiNow7,
	imageThaiNow8,
	svgThaiNowLogoWithWords,
} from "../../../Asset/Asset";

function GallerySection({
	background = "#ECEFFA",
	contentMaxWidth = "120rem",
}) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const { t } = useTranslation();

	const galleryCardItems = [
		imageThaiNow1,
		imageThaiNow2,
		imageThaiNow3,
		imageThaiNow4,
		imageThaiNow5,
		imageThaiNow6,
		imageThaiNow7,
		imageThaiNow8,
	];

	const App = () => (
		<Flex
			justify="top"
			vertical
			style={{
				background: background,
				minHeight: "35rem",
				padding: screens.xxl ? "4rem" : screens.md ? "2rem" : "2rem 1rem",
			}}
			align="center"
		>
			<Flex
				className="w-100 "
				style={{
					paddingTop: "2rem",
					maxWidth: contentMaxWidth,
				}}
				vertical
				gap={50}
			>
				<Title
					className="m-0 p-0 "
					{...(screens.xs && {
						style: {
							fontSize: "2rem",
						},
					})}
				>
					{t("do_for_thai_msg")}
				</Title>

				<ReactPlayer
					controls
					className="w-100 "
					height={screens.xs ? "15rem" : screens.xl ? "50rem" : "30rem"}
					url="https://www.youtube.com/watch?v=ETlr0LGl6kA&t=3s"
				/>

				<Flex
					justify="space-evenly"
					className="w-100"
					gap={20}
					{...(screens.xs && {
						vertical: true,
						gap: 50,
					})}
				>
					{[
						"https://youtu.be/lp35ZLQtu_Y",
						"https://youtu.be/v-p0WHpNKe4",
						"https://youtu.be/m3RZ7FINbNo",
					].map((v, idx) => (
						<ReactPlayer
							key={idx}
							{...(!screens.xl && {
								height: "13rem",
								...(screens.xs && {
									height: "15rem",
									width: "100%",
								}),
							})}
							controls
							url={v}
						/>
					))}
				</Flex>

				<Title
					className={`m-0 p-0 ${screens.md && "mt-5"}`}
					style={{
						...(screens.xs && {
							fontSize: "2rem",
						}),
					}}
				>
					{t("root_in_usa_msg")}
				</Title>
				<Image.PreviewGroup className="d-inline-block">
					<Card>
						{galleryCardItems.map((url, idx) => (
							<Card.Grid
								key={idx}
								style={{
									width: "25%",
								}}
								className="p-0 rounded-0"
							>
								<Card
									cover={
										<Image
											alt="gallery"
											src={url}
											className="rounded-0"
											preview={{ maskClassName: "rounded-0" }}
											fallback={svgThaiNowLogoWithWords}
										/>
									}
								/>
							</Card.Grid>
						))}
					</Card>
				</Image.PreviewGroup>
			</Flex>
		</Flex>
	);

	return <App />;
}

export default GallerySection;
