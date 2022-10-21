import jwt_decode from "jwt-decode";
import { signinAxios } from "../Axios/axiosPromise";
import {
	getState,
	patchProfileInfoPromise,
	patchSigninUserInfoPromise,
} from "../redux-store/dispatchPromise";
import * as constVar from "./ConstVar";

export const isObjectEmpty = (object = {}) => JSON.stringify(object) === "{}";

export const loadScript = (url, async = true, defer = false) => {
	var index = window.document.getElementsByTagName("script")[0];

	var script = window.document.createElement("script");
	script.id = "google-autocomplete-api";
	script.src = url;
	script.async = async;
	script.defer = defer;
	index.parentNode.insertBefore(script, index);

	return script;
};

export const removeScript = (id) => {
	var scripts = window.document.getElementsByTagName("script");

	for (const script of scripts) {
		if (script.id === id) {
			script.parentNode.removeChild(script);
		}
	}
};

export const scrollToActiveElement = () => {
	const activeElement = document.activeElement;
	activeElement.scrollIntoView({
		behavior: "auto",
		block: "center",
		inline: "nearest",
	});
};

export const isValidEmailFormat = (email = "") => {
	if (
		email.length === 0 ||
		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
	) {
		return true;
	}

	return false;
};

export const isValidPasswordFormat = (password = "") => {
	let condition =
		password.length === 0 ||
		/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/.test(password);

	if (condition) return true;

	return false;
};

export const isValidUrl = (url = "") => {
	let condition =
		url.length === 0 ||
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
			url
		);

	if (condition) return true;

	return false;
};

export const formatPhoneNumber = (value = "") => {
	if (value.length < 16) {
		if (value.length === 0) return value;

		// clean the input for any non-digit values.
		const phoneNumber = value.replace(/[^\d]/g, "");

		// phoneNumberLength is used to know when to apply our formatting for the phone number
		const phoneNumberLength = phoneNumber.length;

		// US format - 10 digits max
		if (phoneNumberLength < 11) {
			// digits 0-4
			if (phoneNumberLength < 4) return "(" + phoneNumber;
			// digits 4-6
			else if (phoneNumberLength < 7) {
				return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
			}

			// digits 7-10
			else {
				return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
					3,
					6
				)}-${phoneNumber.slice(6, 10)}`;
			}
		}
	}

	return "";
};

export const formatOtpNumber = (value = "") => {
	if (value.length < 7) {
		if (value.length === 0) return [value, 0];

		// clean the input for any non-digit values.
		let otp = value.replace(/[^\d]/g, "");
		let formattedOtp = `_ _ _ _`;

		const otpLength = otp.length;

		// US format - 10 digits max
		if (otpLength === 1) formattedOtp = otp;
		else if (otpLength === 2)
			formattedOtp = `${otp.slice(0, 1)} ${otp.slice(1, 2)}`;
		else if (otpLength === 3)
			formattedOtp = `${otp.slice(0, 1)} ${otp.slice(1, 2)} ${otp.slice(2, 3)}`;
		else {
			formattedOtp = `${otp.slice(0, 1)} ${otp.slice(1, 2)} ${otp.slice(
				2,
				3
			)} ${otp.slice(3, 4)}`;
		}

		otp = formattedOtp.replace(/[^\d]/g, "");

		return [formattedOtp, otpLength, otp];
	}

	const formattedValue = value.replace(/[^\d]/g, "");

	return [value, formattedValue.length];
};

export const getNumberOfDigit = (value = "") => {
	return value.replace(/[^\d]/g, "").length;
};

export const updatePhoneCursorPostion = (ref = null, cursor = 0) => {
	if (ref.current) {
		const input = ref.current;

		let updatedCursor = cursor;

		if (updatedCursor === 1 || updatedCursor === 10) updatedCursor += 1;

		if (updatedCursor === 5) updatedCursor += 2;

		if (input) input.setSelectionRange(updatedCursor, updatedCursor);
	}
};

export const updateOtpCursorPostion = (ref = null, cursor = 0) => {
	if (ref.current) {
		const input = ref.current;

		let updatedCursor = cursor;

		if ([1, 2, 4, 6].indexOf(updatedCursor) > -1) updatedCursor += 1;

		if (input) input.setSelectionRange(updatedCursor, updatedCursor);
	}
};

export const getSessionStorageObj = (objName) => {
	return JSON.parse(sessionStorage.getItem(objName)) || {};
};

export const saveToSessionStore = (objName = "", prop = "", value = "") => {
	sessionStorage.setItem(
		objName,
		JSON.stringify({
			...(JSON.parse(sessionStorage.getItem(objName)) || {}),
			[`${prop}`]: value,
		})
	);
};

export const convertProfileInfo = ({ type = "", user = {}, company = {} }) => {
	let profile = {};

	profile[`${constVar.PROFILE_TYPE_PROP}`] =
		type || constVar.PROFILE_GUEST_TYPE_PROP;

	switch (type) {
		case constVar.PROFILE_USER_TYPE_PROP:
			profile[`${constVar.ID_PROP}`] = user.id;
			profile[`${constVar.PROFILE_PICTURE_PROP}`] = user.profileUrl;
			profile[`${constVar.PROFILE_NAME_PROP}`] = user.username;
			// profile[`${constVar.PROFILE_USER_TYPE_PROP}`] = { ...user };
			break;
		case constVar.PROFILE_BUSINESS_TYPE_PROP:
			profile[`${constVar.ID_PROP}`] = company.id;
			profile[`${constVar.PROFILE_PICTURE_PROP}`] = company.logoUrl;
			profile[`${constVar.PROFILE_NAME_PROP}`] = company.name;
			// profile[`${constVar.PROFILE_COMPANY_TYPE_PROP}`] = { ...company };
			break;
		default:
			break;
	}

	return profile;
};

export const saveProfileInfo = (profile = {}) => {
	localStorage.setItem(constVar.PROFILE_OBJ, JSON.stringify(profile));
	patchProfileInfoPromise(profile, true);
};

export const saveUserInfo = ({ access_token = "" }) => {
	// set current user to storage
	localStorage.setItem(
		constVar.THAINOW_USER_OBJ,
		JSON.stringify({
			[`${constVar.ACCESS_TOKEN_PROP}`]: access_token,
		})
	);
};

export const removeUserSigninInfo = () => {
	patchSigninUserInfoPromise(
		{
			[`${constVar.SIGNIN_METHOD_PROP}`]: constVar.EMAIL_PROP,
		},
		true
	);
	sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_IN_OBJ);
};

export const signInUserPromise = async (channel = "") => {
	// get signin object from redux store
	const signinInfo = getState()[`${constVar.THAINOW_USER_SIGN_IN_OBJ}`];

	const {
		[`${constVar.EMAIL_PROP}`]: email = "",
		[`${constVar.PHONE_PROP}`]: phone = "",
		[`${constVar.PASSWORD_PROP}`]: password = "",
	} = signinInfo;

	return signinAxios(channel, email, phone, password).then(
		({ access_token = "", user = {} }) => {
			// remove signin info
			removeUserSigninInfo();

			// save user
			saveUserInfo({
				access_token: access_token,
				user: user,
			});

			// save profile
			saveProfileInfo({
				type: constVar.PROFILE_USER_TYPE_PROP,
				user: { ...user },
			});
		}
	);
};

export const signoutUserPromise = async () => {
	localStorage.removeItem(constVar.THAINOW_USER_OBJ);
	localStorage.removeItem(constVar.PROFILE_OBJ);
	patchProfileInfoPromise({}, true);
	// window.location.href = "/";
};

export const validateToken = () => {
	const access_token =
		JSON.parse(localStorage.getItem(constVar.THAINOW_USER_OBJ))?.access_token ||
		"";

	if (access_token.length > 0) {
		try {
			if (jwt_decode(access_token).exp < Date.now() / 1000) {
				// token is still expired
				signoutUserPromise();
				return Promise.reject();
			} else {
				// token is still active
				return Promise.resolve();
			}
		} catch (e) {
			return Promise.reject();
		}
	}

	return Promise.reject();
};

export const forwardUrl = (
	customUrls = {},
	navigate = () => {},
	location = () => {}
) => {
	let closeUrl = location?.state?.[`${constVar.CONTINUE_URL}`] || "/";
	let continueUrl = location?.state?.[`${constVar.SUCCESS_URL}`] || "/";

	if (!isObjectEmpty(customUrls)) {
		closeUrl = customUrls?.[`${constVar.CONTINUE_URL}`] || "/";
		continueUrl = customUrls?.[`${constVar.SUCCESS_URL}`] || "/";
	}

	navigate(closeUrl.length > 1 ? closeUrl : continueUrl, {
		state: {
			...(closeUrl.length > 1 && {
				[`${constVar.SUCCESS_URL}`]: continueUrl,
			}),
		},
	});
};

export const getSearchParamsObj = (searchParams = {}) => {
	let currentParamsObj = {};
	for (const [key, value] of searchParams?.entries()) {
		currentParamsObj = { ...currentParamsObj, [`${key}`]: value };
	}

	return currentParamsObj;
};

export const formatTime = (time = "") => {
	const timeObj = new Date(time);

	if (timeObj == "Invalid Date") return "";
	const month = timeObj.getMonth() + 1;
	const date = timeObj.getDate();
	const year = timeObj.getFullYear();

	const currentTimeObj = new Date();

	// get hours - less than 1hr -> just now
	const hourDiff = Math.abs(
		Math.round((timeObj.getTime() - currentTimeObj.getTime()) / 1000 / 60 / 60)
	);

	const dayDiff = Math.abs(Math.round(hourDiff / 24));

	// if > 10 days -> display date
	if (dayDiff > 10) return month + "/" + date + "/" + year;
	//  if > 1 day -> display <dayDiff> "d"
	else if (dayDiff > 1) return dayDiff + "d ago";
	// if  > 1 hr -> display <hours>
	else if (hourDiff > 1) {
		return hourDiff + " hr ago";
	}

	// less than 1hr -> just now
	return "Just now";
};

export const formatLocation = (location = {}) => {
	const locality = location?.[`${constVar.LOCALITY_PROP}`] || "";
	const zipcode = location?.[`${constVar.ZIP_CODE_PROP}`] || "";
	const state = location?.[`${constVar.STATE_PROP}`] || "";

	let formattedLocation = "";

	if (locality.length > 0) formattedLocation += locality;

	if (state.length > 0 || zipcode > 0) formattedLocation += ", ";

	if (state.length > 0 && zipcode.length === 0) formattedLocation += state;
	else formattedLocation += state + " - " + zipcode;

	return formattedLocation;
};
