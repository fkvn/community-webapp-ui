import { Card, Flex, Image } from "antd";
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

function GallerySection({ background = "#ECEFFA" }) {
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
			className="p-5 p-lg-5"
			vertical
			style={{
				background: background,
				minHeight: "35rem",
			}}
			align="center"
		>
			<Flex
				className="w-100 "
				style={{
					paddingTop: "2rem",
					maxWidth: "100rem",
				}}
				vertical
				gap={20}
			>
				<Title className="m-0 p-0 ">{t("do_for_thai_msg")}</Title>

				<ReactPlayer
					controls
					className="w-100 my-5 pt-5"
					height="45rem"
					url="https://www.youtube.com/watch?v=ETlr0LGl6kA&t=3s"
				/>

				<Flex gap={20} justify="space-evenly" className="w-100 my-5 ">
					<ReactPlayer controls url="https://youtu.be/lp35ZLQtu_Y" />
					<ReactPlayer controls url="https://youtu.be/v-p0WHpNKe4" />
					<ReactPlayer controls url="https://youtu.be/m3RZ7FINbNo" />
				</Flex>

				<Title className="m-0 p-0 mt-5 pt-5 ">{t("root_in_usa_msg")}</Title>
				<Image.PreviewGroup className="d-inline-block">
					<Card
						style={{
							margin: "4rem 0",
						}}
					>
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
