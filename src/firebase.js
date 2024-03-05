// Import the functions you need from the SDKs you need
import { getAnalytics, logEvent, setConsent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { firebaseConfig, localEnv } from "./serviceEnv";

// Initialize Firebase

const useFirebase = () => {
	let app = {};
	let analytics = {};

	if (!localEnv) {
		setConsent({
			ad_user_data: "granted",
			ad_personalization: "granted",
			ad_storage: "granted",
			analytics_storage: "granted",
		});
		app = initializeApp(firebaseConfig);
		analytics = getAnalytics(app);
		logEvent(analytics, "notification_received");
	}

	return { app, analytics };
};

export default useFirebase;
