import { Outlet } from "react-router-dom";

function GuideBookRoute() {
	const App = () => (
		<>
			<Outlet />
		</>
	);
	return <App />;
}

export default GuideBookRoute;
