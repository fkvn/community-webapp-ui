export const localEnv = true;
export const devEnv = false;

export const PRODUCTION_CDN_STORAGE_SOURCE_URL =
	"/cdn/image/thainow-service-worker%2Fconfig%2F";
export const LOCAL_ENV_STORAGE_SOURCE_URL =
	"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fconfig%2F";

export const STORAGE_SOURCE_URL =
	localEnv || devEnv
		? LOCAL_ENV_STORAGE_SOURCE_URL
		: PRODUCTION_CDN_STORAGE_SOURCE_URL;
