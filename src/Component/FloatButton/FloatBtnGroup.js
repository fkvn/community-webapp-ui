import { FloatButton } from "antd";

function FloatBtnGroup({ buttons = [] }) {
	const App = () => (
		<FloatButton.Group shape="circle" style={{ right: "2rem" }}>
			{[...buttons]}
			<FloatButton.BackTop visibilityHeight={0} />
		</FloatButton.Group>
	);
	return <App />;
}

export default FloatBtnGroup;
