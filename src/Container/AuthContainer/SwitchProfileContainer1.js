import { useState } from "react";
import { findProfiles } from "../../Axios/axiosPromise";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import AuthContainer from "./AuthContainer";

function SwitchProfileContainer() {
	const [profiles, setProfiles] = useState([]);

	const getCompaniesPromise = async (user = {}) => findProfiles(user?.id);

	console.log("aaa");

	const app = (
		<AuthContainer returnUrl="/switch-profiles" continueUrl="/signin">
			<div id="switch-profiles">
				{usePageHeader()}
				<>Search Component</>{" "}
			</div>
		</AuthContainer>
	);
	return app;
}

export default SwitchProfileContainer;
