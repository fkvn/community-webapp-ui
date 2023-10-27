import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const apiKey = "mPSjOV8um252gBUd-b0fqA";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",

		ns: ["default"],
		defaultNS: "default",

		supportedLngs: ["en", "th", "zh"],

		backend: {
			loadPath: loadPath,
		},
	});
