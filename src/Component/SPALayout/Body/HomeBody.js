import { Carousel, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { imageThaiHelpThaiBanner } from "../../../Assest/Asset";

function HomeBody() {
	const carouselContentStyle = {
		height: "30rem",
		lineHeight: "160px",
		textAlign: "center",
	};

	const CarouselBanner = () => (
		<Carousel autoplay>
			<div>
				<Flex
					style={{
						...carouselContentStyle,
						backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%,rgba(0, 0, 0, 0.8) 100%), url(${imageThaiHelpThaiBanner})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundColor: "#E9E9E9",
						backgroundSize: "cover",
					}}
					justify="center"
					align="center"
				>
					<Flex vertical gap={20}>
						<Title className="text-white m-0 p-0">
							CONNECTING THAI OVERSEAS
						</Title>
						<Title className="text-white m-0 p-0" level={3}>
							เชื่อมโยงคนไทย ในต่างแดน{" "}
						</Title>
					</Flex>
				</Flex>
			</div>
		</Carousel>
	);

	const GuideBookSection = () => <></>;

	const PostListSection = () => <></>;

	const App = () => (
		<>
			<CarouselBanner />
			<GuideBookSection />
			<PostListSection />
		</>
	);
	return <App />;
}

export default HomeBody;
