import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { USER_REDUCER } from "../../../Util/constVar";
import { isObjectEmpty } from "../../../Util/util";
import useAuth from "../../Hook/AuthHook/useAuth";
import DefaultHeader from "./DefaultHeader";

function HeaderContainer() {
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);
	const { signout } = useAuth();

	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (!isObjectEmpty(profile)) setIsLogin(true);
		else setIsLogin(false);
	}, [setIsLogin, profile]);

	// const { useBreakpoint } = Grid;
	// const screens = useBreakpoint();

	const App = () => (
		<Row>
			<Col xs={24}>
				<DefaultHeader isLogin={isLogin} profile={profile} signout={signout} />

				{/* {isEmptyObject(screens) ||
				(screens.xs === false && screens.xxl === true) ? (
					<DefaultTopBar />
				) : (
					<MobileTopBar />
				)} */}
			</Col>
		</Row>
	);

	return <App />;
}

export default HeaderContainer;
