// import thaiNowLogo from "./Image/Brand/thainowLogo.png";
// import addFrameImage from "./Image/Others/Add.png";
// import genwar from "./Image/Profile/genwar.jpg";
// import businessProfile from "./Image/Profile/UserProfile_Business.png";
// import classicProfile from "./Image/Profile/UserProfile_Classic.png";
// import guestProfile from "./Image/Profile/UserProfile_Guest3.png";

// import threeBarsIcon from "./Image/Icon/3bars-icon.png";
// import emailIconBlack from "./Image/Icon/email-icon-black.png";
// import locationIcon from "./Image/Icon/location-icon.png";
// import notificationIcon from "./Image/Icon/noti-icon.png";
// import phoneIconBlack from "./Image/Icon/phone-icon-black.png";
// import searchIconWhite from "./Image/Icon/search-icon-white.png";
// import searchIcon from "./Image/Icon/search-icon.png";
// import usPhoneIcon from "./Image/Icon/us-phone-icon.png";
// import userReaderIcon from "./Image/Icon/users-reader-icon.png";

export const localEnv = true;
export const devEnv = false;

const PRODUCTION_CDN_STORAGE_SOURCE_URL =
	"/cdn/image/thainow-service-worker%2Fconfig%2F";
const LOCAL_ENV_STORAGE_SOURCE_URL =
	"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fconfig%2F";

export const STORAGE_SOURCE_URL =
	localEnv || devEnv
		? LOCAL_ENV_STORAGE_SOURCE_URL
		: PRODUCTION_CDN_STORAGE_SOURCE_URL;
