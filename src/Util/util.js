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
