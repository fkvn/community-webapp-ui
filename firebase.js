const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/functions");
require("firebase/firestore");

const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: "",
};

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === "localhost") {
	console.log(
		"testing locally -- hitting local functions and firestore emulators"
	);
	firebase.functions().useFunctionsEmulator("http://localhost:5001");
}

export default firebase;
