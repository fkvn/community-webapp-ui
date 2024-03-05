import { Divider, Flex, Layout } from "antd";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderContainer from "./Header/HeaderContainer";

function MainLayout() {
	const { t } = useTranslation();
	const { Header } = Layout;

	const layout = (
		<Flex
			id="layout"
			justify="center"
			style={{
				backgroundColor: "#f6f6fb",
			}}
			vertical
		>
			<Header
				className=" p-0 bg-white"
				style={{
					position: "sticky",
					top: 0,
					zIndex: 1,
					maxHeight: "100px",
					overflow: "hidden",
				}}
			>
				<HeaderContainer />
				<Divider className="m-0 p-0" />
			</Header>
			{/* start main body outlet */}
			<Outlet />
			{/* end main body outlet */}
			<Footer />

			<CookieConsent
				location="bottom"
				buttonText={t("consent_msg")}
				cookieName="myAppCookieConsent"
				style={{ background: "#2B373B" }}
				buttonStyle={{ color: "#4e503b", fontSize: "1rem" }}
				expires={150}
			>
				{t("consent_content_msg")}
			</CookieConsent>
		</Flex>
	);

	const App = () => <>{layout}</>;

	return <App />;
}

export default MainLayout;
