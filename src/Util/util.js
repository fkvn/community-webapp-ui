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

export const isValidEmailFormat = (email) => {
	if (
		email.length === 0 ||
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
	) {
		return true;
	}

	return false;
};
