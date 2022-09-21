import * as constVar from "../Util/ConstVar";

import thaiNowLogo from "./Image/Brand/thainowLogo.png";
import genwar from "./Image/Profile/genwar.jpg";
import businessProfile from "./Image/Profile/UserProfile_Business.png";
import classicProfile from "./Image/Profile/UserProfile_Classic.png";
import guestProfile from "./Image/Profile/UserProfile_Guest3.png";

import addFrameImage from "./Image/Others/Add.png";
import thainowBlurImage from "./Image/Others/img-blur-thainow.png";

import threeBarsIcon from "./Image/Icon/3bars-icon.png";
import emailIconBlack from "./Image/Icon/email-icon-black.png";
import locationIcon from "./Image/Icon/location-icon.png";
import notificationIcon from "./Image/Icon/noti-icon.png";
import phoneIconBlack from "./Image/Icon/phone-icon-black.png";
import searchIconWhite from "./Image/Icon/search-icon-white.png";
import searchIcon from "./Image/Icon/search-icon.png";
import usPhoneIcon from "./Image/Icon/us-phone-icon.png";
import userReaderIcon from "./Image/Icon/users-reader-icon.png";

export const images = {
	[`${constVar.IMAGE_THAINOW_LOGO}`]: thaiNowLogo,
	[`${constVar.IMAGE_GUEST_PROFILE}`]: guestProfile,
	[`${constVar.IMAGE_CLASSIC_PROFILE}`]: classicProfile,
	[`${constVar.IMAGE_BUSINESS_PROFILE}`]: businessProfile,
	[`${constVar.IMAGE_ADD_FRAME}`]: addFrameImage,
	[`${constVar.IMAGE_BLUR_THAINOW}`]: thainowBlurImage,
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
