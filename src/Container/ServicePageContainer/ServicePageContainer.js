import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Component/PageLayout/NotFoundPage";
import { SEARCH_DEAL } from "../../Util/ConstVar";
import DealPageContainer from "./DealPageContainer";

function ServicePageContainer() {
	const routes = (
		<Routes>
			<Route path={`/${SEARCH_DEAL}`} element={<DealPageContainer />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);

	const app = routes;
	return app;
}

export default ServicePageContainer;
