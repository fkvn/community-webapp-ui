import React from "react";
import LandingPage from "../Component/LandingPage/LandingPage";

function LandingPageContainer({ user }) {
	const app = <LandingPage user={user} />;

	return app;
}

export default LandingPageContainer;
