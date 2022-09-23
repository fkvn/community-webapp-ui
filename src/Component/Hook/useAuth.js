import { saveProfileInfo, saveUserInfo } from "../../Util/Util";
import useMessage from "./useMessage";

function useAuth() {
	const { errorMessage } = useMessage();

	const thainowRegister = (registerInfo = {}) => Promise.resolve();
	// registerPromise("thainow", registerInfo).catch((e) => errorMessage(e));

	const thainowSignin = (signinInfo = {}) =>
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
		}).then((res) => {
			// save user

			saveUserInfo({
				access_token: res.access_token,
			});

			// save profile
			saveProfileInfo(res.profile);
		});

	return {
		thainowRegister,
		thainowSignin,
	};
}

export default useAuth;
