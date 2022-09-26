import * as constVar from "../Util/ConstVar";

import thaiNowLogo from "./Image/Brand/thainowLogo.png";
import addFrameImage from "./Image/Others/Add.png";
import genwar from "./Image/Profile/genwar.jpg";
import businessProfile from "./Image/Profile/UserProfile_Business.png";
import classicProfile from "./Image/Profile/UserProfile_Classic.png";
import guestProfile from "./Image/Profile/UserProfile_Guest3.png";

import threeBarsIcon from "./Image/Icon/3bars-icon.png";
import emailIconBlack from "./Image/Icon/email-icon-black.png";
import locationIcon from "./Image/Icon/location-icon.png";
import notificationIcon from "./Image/Icon/noti-icon.png";
import phoneIconBlack from "./Image/Icon/phone-icon-black.png";
import searchIconWhite from "./Image/Icon/search-icon-white.png";
import searchIcon from "./Image/Icon/search-icon.png";
import usPhoneIcon from "./Image/Icon/us-phone-icon.png";
import userReaderIcon from "./Image/Icon/users-reader-icon.png";

const PRODUCTION_CDN_SOURCE_URL = "";
const LOCAL_SOURCE_URL =
	"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fconfig%2F";

const localEnv = true;

const SOURCE_URL = localEnv ? LOCAL_SOURCE_URL : PRODUCTION_CDN_SOURCE_URL;

export const imageThainowLogoRound = `${SOURCE_URL}img-logo-round.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageTopbarBg = `${SOURCE_URL}img-top-bar.png?alt=media&token=207d8aa7-a3a9-4b40-a8b9-6d24614c6332`;

export const imageGuestAvatar = `${SOURCE_URL}img-avatar-guest.png?alt=media&token=fba2745b-46fb-44ea-aa65-dcb6e008cccd`;

export const imageThainowBlur = `${SOURCE_URL}img-logo-blur.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageNoPhoto = `${SOURCE_URL}img-no-photo.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageSuccess = `${SOURCE_URL}img-success.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const images = {
	[`${constVar.IMAGE_THAINOW_LOGO}`]: thaiNowLogo,
	[`${constVar.IMAGE_GUEST_PROFILE}`]: guestProfile,
	[`${constVar.IMAGE_CLASSIC_PROFILE}`]: classicProfile,
	[`${constVar.IMAGE_BUSINESS_PROFILE}`]: businessProfile,
	[`${constVar.IMAGE_ADD_FRAME}`]: addFrameImage,
	genwar: genwar,
};

export const icons = {
	[`${constVar.ICON_USER_READER}`]: userReaderIcon,
	[`${constVar.ICON_LOCATION}`]: locationIcon,
	[`${constVar.ICON_SEARCH}`]: searchIcon,
	[`${constVar.ICON_SEARCH_WHITE}`]: searchIconWhite,
	[`${constVar.ICON_EMAIL_BLACK}`]: emailIconBlack,
	[`${constVar.ICON_PHONE_BLACK}`]: phoneIconBlack,
	[`${constVar.ICON_NOTIFICATION_BLACK}`]: notificationIcon,
	[`${constVar.ICON_THREE_BARS_BLACK}`]: threeBarsIcon,
	[`${constVar.ICON_US_PHONE}`]: usPhoneIcon,
};
