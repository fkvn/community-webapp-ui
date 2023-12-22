import { Carousel } from "antd";

function HomeBody() {
	const contentStyle = {
		height: "200px",
		color: "#fff",
		lineHeight: "160px",
		textAlign: "center",
		background: "#364d79",
	};

	const Banner = () => (
		<Carousel autoplay>
			<div>
				<h3 style={contentStyle}>1</h3>
			</div>
		</Carousel>
	);

	const App = () => (
		<>
			<Banner />
		</>
	);
	return <App />;
}

export default HomeBody;
