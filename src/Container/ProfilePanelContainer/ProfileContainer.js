import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { submitErrorHandlerPromise } from "../../redux-store/dispatchPromise";
import { THAINOW_PROFILE_OBJ } from "../../Util/ConstVar";

function ProfileContainer() {
	const navigate = useNavigate();
	const location = useLocation();
	const continueUrl = location.state?.continue || "/";

	const profile = useSelector(
		(state) => state.thainowReducer[`${THAINOW_PROFILE_OBJ}`] || {}
	);

	useEffect(() => {
		const storageProfile =
			JSON.parse(localStorage.getItem(THAINOW_PROFILE_OBJ)) || {};

		if (
			JSON.stringify(storageProfile) === "{}" &&
			JSON.stringify(profile) === "{}"
		) {
			submitErrorHandlerPromise(
				"Your credentials are incorrect or have expired  .... Please sign in again!"
			);

			setTimeout(() => {
				navigate("/signin", {
					state: {
						continue: continueUrl,
					},
				});
			}, 4000);
		}
	});

	const app = <></>;
	return app;
}

export default ProfileContainer;
