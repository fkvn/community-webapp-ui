import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPromise, signinPromise } from "../../Axios/axiosPromise";
import { patchProfileInfoPromise } from "../../redux-store/dispatchPromise";
import {
	ON_RETURN_URL,
	ON_SUCCESS_URL,
	THAINOW_PROFILE_OBJ,
} from "../../Util/ConstVar";
import { emptyProject, saveProfileInfo, saveUserInfo } from "../../Util/Util";
import useMessage from "./useMessage";

function useAuth() {
	const navigate = useNavigate();
	const location = useLocation();
	const continueURL = location?.state?.[`${ON_SUCCESS_URL}`] || "/";
	const returnURL = location.state?.[`${ON_RETURN_URL}`] || "";

	const { errorMessage } = useMessage();

	const storedProfile =
		JSON.parse(localStorage.getItem(THAINOW_PROFILE_OBJ)) || {};

	// load profile
	/* proifle format {
		id: 1,
		info: {
			picture: "url",
			name: "",
			picture: ""
		}
		avgRating: 0,
		totalReview: 0,
		type= "USER_PROFILE"
	} */
	const profile = useSelector(
		(state) => state.thainowReducer[`${THAINOW_PROFILE_OBJ}`] || {}
	);

	if (emptyProject(profile) && !emptyProject(storedProfile)) {
		patchProfileInfoPromise(storedProfile);
	}

	const thainowRegister = (registerInfo = {}, forward = false) =>
		registerPromise(registerInfo)
			.then(() =>
				forward
					? navigate(returnURL.length > 0 ? returnURL : continueURL, {
							state: {
								...(returnURL.length > 0 && {
									[`${ON_SUCCESS_URL}`]: continueURL,
								}),
							},
					  })
					: Promise.resolve()
			)
			.catch((e) => errorMessage(e));
	// ;

	/* return sample :
			Promise.resolve({
			access_token:
				"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODNiMmRlYy1lNGU2LTQzMTItODllYS0wNjU3Y2E3ODdmYTEiLCJpYXQiOjE2NjM4OTM5MDIsImV4cCI6MTY2Mzk4MDMwMn0.GtGchXovl6gsRtAIw7T3wl5-68VlmLh_lLMUQxXZPmUkHPzWfO-mBV5qL20qX79xvcSUgUnW2oedTMCVO1pzIA",

			profile: {
				id: 1139,
				info: {
					picture:
						"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2F0817531b-7c27-4a11-ae0a-c56b3d99abfd.png?alt=media",
					createdOn: "2022-08-22 15:03:57",
					name: "Kevin ssgggg55555",
				},
				totalReview: 0,
				avgRating: 0.0,
				type: "USER_PROFILE",
			},
		})
	
	*/
	const thainowSignin = (
		channel = "",
		value = "",
		password = "",
		forward = true
	) =>
		signinPromise(channel, value, password)
			.then((res) => {
				// save user
				saveUserInfo({
					access_token: res.access_token,
				});

				// save profile
				saveProfileInfo(res.profile);

				if (forward) {
					navigate(returnURL.length > 0 ? returnURL : continueURL, {
						state: {
							...(returnURL.length > 0 && {
								[`${ON_SUCCESS_URL}`]: continueURL,
							}),
						},
					});
				} else return Promise.resolve();
			})
			.catch((e) => errorMessage(e));

	return {
		storedProfile,
		profile,
		thainowRegister,
		thainowSignin,
	};
}

export default useAuth;
