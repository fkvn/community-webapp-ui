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

		ns: ["Default"],
		defaultNS: "Default",

		supportedLngs: ["en", "th"],

		backend: {
			loadPath: loadPath,
		},
		// react config for Trans component, not pure t function
		react: {
			transEmptyNodeValue: "", // what to return for empty Trans
			transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
			transKeepBasicHtmlNodesFor: ["br", "strong", "i"], // don't convert to <1></1> if simple react elements
			transWrapTextNodes: "", // Wrap text nodes in a user-specified element.
			// i.e. set it to 'span'. By default, text nodes are not wrapped.
			// Can be used to work around a well-known Google Translate issue with React apps. See: https://github.com/facebook/react/issues/11538
			// (v11.10.0)
		},
	});

// i18next.services.formatter.add("string", (value, lng, options) => {
// 	console.log(options);
// 	console.log(value);
// 	console.log(i18next.t());
// 	if (options?.format === "lowercase") return value.toLowerCase();
// 	if (options?.format === "uppercase") return value.toUpperCase();
// 	if (options?.format === "capitalize")
// 		return value.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
// 	if (options?.format === "capfirstlettercase")
// 		return value.charAt(0).toUpperCase() + value.slice(1);
// 	return value;
// });
