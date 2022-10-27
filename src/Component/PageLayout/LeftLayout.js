import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import EditProfileContainer from "../../Container/ProfilePanelContainer/EditProfileContainer";
import ProfilePageContainer from "../../Container/ServicePageContainer/ProfilePageContainer";
import ServicePageContainer from "../../Container/ServicePageContainer/ServicePageContainer";
import {
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_MARKETPLACE,
	SEARCH_POST,
	SEARCH_PROFILE,
	SEARCH_TYPE_PROP,
} from "../../Util/ConstVar";
import Footer from "../PageLayout/Footer";
import LandingPage from "./DetailPage/LandingPage";
import SearchResultPage from "./DetailPage/SearchResultPage";
import NotFoundPage from "./NotFoundPage";

function LeftLayout() {
	const app = (
		<Row justify="center">
			<Col xs={24} className="px-3 px-md-5">
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
					<Route
						path={`/${SEARCH_POST}/:${SEARCH_TYPE_PROP}/:id`}
						validate={{
							serviceType:
								SEARCH_DEAL ||
								SEARCH_JOB ||
								SEARCH_HOUSING ||
								SEARCH_MARKETPLACE,
						}}
						element={<ServicePageContainer />}
					/>
					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
				<Footer />
			</Col>
		</Row>
	);
	return app;
}

export default LeftLayout;
