import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import moment from "moment";
import { initReactI18next } from "react-i18next";

const apiKey = "mPSjOV8um252gBUd-b0fqA";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.on("languageChanged", function (lng) {
		moment.locale(lng);
	})
	.init({
		fallbackLng: "en",

		ns: ["default"],
		defaultNS: "default",

		supportedLngs: ["en", "th"],

		backend: {
			loadPath: loadPath,
		},
		// interpolation: {
		// 	format: function (value, format, lng) {
		// 		console.log(format);
		// 		if (format === "uppercase") return value.toUpperCase();
		// 		if (format === "lowercase") return value.toLowerCase();
		// 		if (value instanceof Date) return moment(value).format(format);
		// 		return value;
		// 	},
		// },
	});

// i18next.services.formatter.add("string", (value, lng, options) => {
// 	console.log(options);
// 	console.log(value);
// 	console.log(i18next.t());
// 	if (options?.format === "lowercase") return value.toLowerCase();
// 	if (options?.format === "uppercase") return value.toUpperCase();
// 	if (options?.format === "titlecase")
// 		return value.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
// 	if (options?.format === "capfirstlettercase")
// 		return value.charAt(0).toUpperCase() + value.slice(1);
// 	return value;
// });
