export const loadScript = (url, async = true, defer = false) => {
	var index = window.document.getElementsByTagName("script")[0];

	var script = window.document.createElement("script");
	script.src = url;
	script.async = async;
	script.defer = defer;
	index.parentNode.insertBefore(script, index);

	return script;
};
