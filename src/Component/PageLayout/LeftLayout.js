import { Footer } from "antd/lib/layout/layout";
import { Stack } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function LeftLayout() {
	const searchRightBar = <div className="tedkvn-center"> Searching</div>;

	const landingPage = (
		<p>
			123 dasda sdas adas dadsad adasdasd adasd as dasdasd as dsadas dasda sdas
			adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd as dsadas dasda sdas adas
			dadsad adasdasd adasd as dasdasd as dsadas dasda sdas adas dadsad adasdasd
			adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd as 123 dasda sdas adas dadsad adasdasd adasd as dasdasd as
			dsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd as dsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd as dsadas dasda sdas adas
			dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd
			adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd
			as dasdasd asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd
			asdsadas dasda sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda
			sdas adas dadsad adasdasd adasd as dasdasd asdsadas dasda sdas adas dadsad
			adasdasd adasd as dasdasd as
		</p>
	);

	const app = (
		<Stack id="LeftLayout" direction="vertical" className="" gap={4}>
			<Routes>
				<Route path="/" element={landingPage} />
				<Route path="/search" element={searchRightBar} />
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
			<Footer id="footer"> </Footer>
		</Stack>
	);
	return app;
}

export default LeftLayout;
