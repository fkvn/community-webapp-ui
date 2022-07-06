import * as constVar from "../Util/ConstVar";

import ThaiNowLogo from "./Image/Brand/thainowLogo.png";
import emailIconBlack from "./Image/Icon/email-icon-black.png";
import locationIcon from "./Image/Icon/location-icon.png";
import phoneIconBlack from "./Image/Icon/phone-icon-black.png";
import searchIconWhite from "./Image/Icon/search-icon-white.png";
import searchIcon from "./Image/Icon/search-icon.png";
import userReaderIcon from "./Image/Icon/users-reader-icon.png";

export const images = {
	[`${constVar.IMAGE_THAINOW_LOGO}`]: ThaiNowLogo,
};

export const icons = {
	[`${constVar.ICON_USER_READER}`]: userReaderIcon,
	[`${constVar.ICON_LOCATION}`]: locationIcon,
	[`${constVar.ICON_SEARCH}`]: searchIcon,
	[`${constVar.ICON_SEARCH_WHITE}`]: searchIconWhite,
	[`${constVar.ICON_EMAIL_BLACK}`]: emailIconBlack,
	[`${constVar.ICON_PHONE_BLACK}`]: phoneIconBlack,
};
