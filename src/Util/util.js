export const isObjectEmpty = (object = {}) => JSON.stringify(object) === "{}";

export const getLanguageTitle = (code = "en") => {
	switch (code) {
		case "en":
			return "English";
		case "zh":
			return "中文";
		case "th":
			return "ภาษาไทย";
		default:
			return "Undefined";
	}
};

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const scrollToActiveElement = () => {
	const activeElement = document.activeElement;
	activeElement.scrollIntoView({
		behavior: "auto",
		block: "center",
		inline: "nearest",
	});
};

/**
 *
 * @param {Number} phone
 * @param {String} region Exact 2-characters
 * @returns
 */
export const isPhoneValid = (phone = "", region = "US") => {
	switch (region) {
		case "US":
			return isUSPhoneValid(phone);
		default:
			return phone;
	}
};

/**
 *
 * @param {Number} phone
 * @returns
 */
export const isUSPhoneValid = (phone) => {
	if (!phone || phone.toString().length === 0 || phone.toString().length === 10)
		return true;
	return false;
};

/**
 *
 * @param {Number} phone
 * @param {String} region Exact 2-characters
 * @returns
 */
export const formatPhoneNumber = (phone, region = "US") => {
	switch (region) {
		case "US":
			return formatUSPhoneNumber(phone);
		default:
			return phone;
	}
};

/**
 *
 * @param {Number} rawPhone
 * @returns
 */
export const formatUSPhoneNumber = (phone = "") => {
	const phoneString = phone.toString();
	const phoneLength = phoneString.length;

	if (phoneLength === 0) return phoneString;

	// digits 0-4
	if (phoneLength < 4) return "(" + phoneString;
	// digits 4-6
	else if (phoneLength < 7) {
		return `(${phoneString.slice(0, 3)}) ${phoneString.slice(3)}`;
	}

	// digits 7-10
	else {
		return `(${phoneString.slice(0, 3)}) ${phoneString.slice(
			3,
			6
		)}-${phoneString.slice(6, 10)}`;
	}
};

/**
 * My Function
 *
 * @param {String} format possible options: "lowercase", "uppercase", "capitalize", "sentencecase"
 */
export const formatString = (text = "", format = "") => {
	try {
		if (format === "lowercase") return text.toLowerCase();
		if (format === "uppercase") return text.toUpperCase();
		if (format === "capitalize")
			return text.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
		if (format === "sentencecase") {
			return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
		}

		return text;
	} catch (error) {
		return text;
	}
};

/**
 *
 * @param {URLSearchParams} searchParams
 * @returns
 */
export const extractExistingParams = (searchParams = {}) => {
	const entries = Array.from(searchParams.entries());
	return entries.reduce((res, keyValue) => {
		return { [`${keyValue[0]}`]: keyValue[1], ...res };
	}, {});
};

export const formatTime = (time = "") => {
	const timeObj = new Date(time);

	if (timeObj === "Invalid Date") return "";
	const month = timeObj.getMonth() + 1;
	const date = timeObj.getDate();
	const year = timeObj.getFullYear();

	const currentTimeObj = new Date();

	// get hours - less than 1hr -> just now
	const minsDiff = Math.abs(
		Math.round((timeObj.getTime() - currentTimeObj.getTime()) / 1000 / 60)
	);

	const hourDiff = Math.abs(
		Math.round((timeObj.getTime() - currentTimeObj.getTime()) / 1000 / 60 / 60)
	);

	const dayDiff = Math.abs(Math.round(hourDiff / 24));

	if (minsDiff < 1) {
		return " Just Now ";
	} else if (minsDiff < 60) {
		return minsDiff + "m ago ";
	} else if (hourDiff < 24) {
		return hourDiff + "h ago ";
	} else if (dayDiff < 10) {
		return dayDiff + "d ago ";
	} else {
		return month + "/" + date + "/" + year;
	}
};
