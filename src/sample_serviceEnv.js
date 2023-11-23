export const localEnv = true;
export const devEnv = false;
// both false -> production

export const PRODUCTION_CDN_STORAGE_SOURCE_URL = "/cdn/image/";
export const LOCAL_ENV_STORAGE_SOURCE_URL =
	"https://firebasestorage.googleapis.com/v0/b/";

export const STORAGE_SOURCE_URL =
	localEnv || devEnv
		? LOCAL_ENV_STORAGE_SOURCE_URL
		: PRODUCTION_CDN_STORAGE_SOURCE_URL;

export const axiosConfig = {
	baseURL: localEnv
		? "http://"
		: devEnv
		? "https://"
		: // production env
		  "https://",
};

export const appleSignin = {
	clientId: "com.domain.projectname",
	// the redirectURI domain must the same as the domain when pop-up is render
	// if localhost, the pop-up would return the 403 error
	redirectURI: localEnv || devEnv ? "https://" : "https://",
};

export const googleSignin = {
	client_id:
		localEnv || devEnv
			? "f3fvrersft08ri99ai.apps.googleusercontent.com"
			: // production - client id
			  "6qrnu2p2ihish1npqcuoegfgn35.apps.googleusercontent.com",
};

export const lineSignin = {
	redirect_uri: new URL(
		localEnv ? "http://localhost:3000/signin" : devEnv ? "https://" : "https://"
	),
	client_id: "20014232253",
	client_secret: "eb28b8c4d70a46f2323123174a39b3b913be7096",
};

export const facebookSignin = {
	appId: "390523263217297",
};
