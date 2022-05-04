import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LandingPage from "../Component/LandingPage/LandingPage";

import * as constVar from "../Util/ConstVar";

function LandingPageContainer() {
	const [user, setUser] = useState();

	useEffect(() => {
		const thaiNowObj = window.sessionStorage.getItem(
			constVar.THAINOW_USER_STORRAGE_OBJ
		);

		console.log(thaiNowObj && !user);

		if (thaiNowObj && !user) setUser(JSON.parse(thaiNowObj));
	});

	const app = <LandingPage user={user} />;

	return app;
}

export default LandingPageContainer;
