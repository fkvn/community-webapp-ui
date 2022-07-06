import LandingPage from "../../Component/LandingPage/LandingPage";
import TopBarNavigation from "../../Component/TopBarNavigation/TopBarNavigation";

function LayoutContainer({ user }) {
	const app = (
		<>
			<TopBarNavigation />
			<LandingPage user={user} />;
		</>
	);

	return app;
}

export default LayoutContainer;
