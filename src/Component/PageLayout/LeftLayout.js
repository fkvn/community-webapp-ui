import React from "react";
import { Stack } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import NotFoundPage from "./NotFoundPage";
import SearchResultPage from "./SearchResultPage";

function LeftLayout() {
	const app = (
		<Stack id="LeftLayout" direction="vertical" className="" gap={4}>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/search" element={<SearchResultPage />} />
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</Stack>
	);
	return app;
}

export default LeftLayout;
