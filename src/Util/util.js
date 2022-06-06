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

	console.log(scripts);

	for (const script of scripts) {
		if (script.id === id) {
			script.parentNode.removeChild(script);
		}
	}

	// var script = scripts.filter((s) => s.id === id)[0];

	// console.log(script);
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

export const formatPhoneNumber = (value = "") => {
	if (value.length < 16) {
		if (value.length === 0) return [value, 0];

		// clean the input for any non-digit values.
		const phoneNumber = value.replace(/[^\d]/g, "");

		// phoneNumberLength is used to know when to apply our formatting for the phone number
		const phoneNumberLength = phoneNumber.length;

		// US format - 10 digits max
		if (phoneNumberLength < 11) {
			// digits 0-4
			if (phoneNumberLength < 4) return ["(" + phoneNumber, phoneNumberLength];
			// digits 4-6
			else if (phoneNumberLength < 7) {
				return [
					`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`,
					phoneNumberLength,
				];
			}

			// digits 7-10
			else {
				return [
					`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
						3,
						6
					)}-${phoneNumber.slice(6, 10)}`,
					phoneNumberLength,
				];
			}
		}
	}

	return [];
};

export const formatOtpNumber = (value = "") => {
	if (value.length < 7) {
		if (value.length === 0) return [value, 0];

		// clean the input for any non-digit values.
		const otp = value.replace(/[^\d]/g, "");

		const otpNumberLength = otp.length;

		// US format - 10 digits max
		if (otpNumberLength === 1) {
			return [otp, otpNumberLength];
		} else if (otpNumberLength === 2) {
			return [`${otp.slice(0, 1)} ${otp.slice(1, 2)}`, otpNumberLength];
		} else if (otpNumberLength === 3) {
			return [
				`${otp.slice(0, 1)} ${otp.slice(1, 2)} ${otp.slice(2, 3)}`,
				otpNumberLength,
			];
		} else {
			return [
				`${otp.slice(0, 1)} ${otp.slice(1, 2)} ${otp.slice(2, 3)} ${otp.slice(
					3,
					4
				)}`,
				otpNumberLength,
			];
		}
	}

	const formattedValue = value.replace(/[^\d]/g, "");

	return [value, formattedValue.length];
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
