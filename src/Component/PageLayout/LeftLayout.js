import React from "react";
import { Stack } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import EditProfileContainer from "../../Container/ProfilePanelContainer/EditProfileContainer";
import ProfilePageContainer from "../../Container/ServicePageContainer/ProfilePageContainer";
import ServicePageContainer from "../../Container/ServicePageContainer/ServicePageContainer";
import { SEARCH_PROFILE, SEARCH_SERVICE } from "../../Util/ConstVar";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import NotFoundPage from "./NotFoundPage";
import SearchResultPage from "./SearchResultPage";

function LeftLayout() {
	const app = (
		<Stack
			id="LeftLayout"
			direction="vertical"
			className="m-0 m-xl-2 mx-xl-4"
			gap={4}
		>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					path={`/${SEARCH_PROFILE}/:id`}
					element={<ProfilePageContainer />}
				/>
				<Route
					path={`/${SEARCH_PROFILE}/:id/edit-profile`}
					element={<EditProfileContainer />}
				/>
				<Route path="/search" element={<SearchResultPage />} />
				<Route path={`/${SEARCH_SERVICE}`} element={<ServicePageContainer />} />
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</Stack>
	);
	return app;
}

export default LeftLayout;
