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

const PRODUCTION_CDN_SOURCE_URL =
	"/cdn/image/thainow-service-worker%2Fconfig%2F";
const LOCAL_SOURCE_URL =
	"https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fconfig%2F";

export const localEnv = false;

const SOURCE_URL = localEnv ? LOCAL_SOURCE_URL : PRODUCTION_CDN_SOURCE_URL;

export const imageThainowLogoRound = `${SOURCE_URL}img-logo-round.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageTopbarBg = `${SOURCE_URL}img-top-bar.png?alt=media&token=207d8aa7-a3a9-4b40-a8b9-6d24614c6332`;

export const imageTopbarBgMobile = `${SOURCE_URL}img-top-bar-mobile.png?alt=media&token=207d8aa7-a3a9-4b40-a8b9-6d24614c6332`;

export const imageGuestAvatar = `${SOURCE_URL}img-avatar-guest.png?alt=media&token=fba2745b-46fb-44ea-aa65-dcb6e008cccd`;

export const imageThainowBlur = `${SOURCE_URL}img-logo-blur.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageNoPhoto = `${SOURCE_URL}img-no-photo.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageSuccess = `${SOURCE_URL}img-success.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageThainowLogo = `${SOURCE_URL}img-thainow-logo.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgThainowLogo = `${SOURCE_URL}svg-thainow-logo.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imagePlusGray = `${SOURCE_URL}img-plus.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageBannerBg = `${SOURCE_URL}img-banner-bg.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgAppleStoreBadgeBlack = `${SOURCE_URL}svg-apple-store-badge-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgGooglePlayBadgeBlack = `${SOURCE_URL}svg-google-play-badge-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgBusinessBadge = `${SOURCE_URL}svg-business-badge.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgBusinessIcon = `${SOURCE_URL}svg-business-icon.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgBusinessIconWhite = `${SOURCE_URL}svg-business-icon-white.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgDealBadge = `${SOURCE_URL}svg-deal-badge.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgDealIconWhite = `${SOURCE_URL}svg-deal-icon-white.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgDealIcon = `${SOURCE_URL}svg-deal-icon.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgJobBadge = `${SOURCE_URL}svg-job-badge.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgJobIconWhite = `${SOURCE_URL}svg-job-icon-white.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgJobIcon = `${SOURCE_URL}svg-job-icon.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgHousingBadge = `${SOURCE_URL}svg-housing-badge.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgHousingIconWhite = `${SOURCE_URL}svg-housing-icon-white.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgHousingIcon = `${SOURCE_URL}svg-housing-icon.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgMarketplaceBadge = `${SOURCE_URL}svg-marketplace-badge.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgMarketplaceIconWhite = `${SOURCE_URL}svg-marketplace-icon-white.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgMarketplaceIcon = `${SOURCE_URL}svg-marketplace-icon.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgFacebookLogo = `${SOURCE_URL}svg-logo-facebook.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgYoutubeLogo = `${SOURCE_URL}svg-logo-youtube.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgIgLogo = `${SOURCE_URL}svg-logo-ig.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgSearchWhiteIcon = `${SOURCE_URL}svg-search-icon-white.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgWifiIconBlack = `${SOURCE_URL}svg-wifi-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgWasherIconBlack = `${SOURCE_URL}svg-washer-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgRefrigeratorIconBlack = `${SOURCE_URL}svg-refrigerator-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgCookingIconBlack = `${SOURCE_URL}svg-cooking-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgAcIconBlack = `${SOURCE_URL}svg-ac-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgDryerIconBlack = `${SOURCE_URL}svg-dryer-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgMicrowaveIconBlack = `${SOURCE_URL}svg-microwave-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const svgPetAllowedIconBlack = `${SOURCE_URL}svg-pet-allowed-icon-black.svg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageDealSample = `${SOURCE_URL}img-deal-sample.jpeg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageJobSample = `${SOURCE_URL}img-employer-sample.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageHousingSample = `${SOURCE_URL}img-housing-sample.jpg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageMarketplaceSample = `${SOURCE_URL}img-marketplace-sample.jpg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageTestimonialSample1 = `${SOURCE_URL}img-testimonial-sample-1.jpg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageTestimonialSample2 = `${SOURCE_URL}img-testimonial-sample-2.jpg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageTestimonialSample3 = `${SOURCE_URL}img-testimonial-sample-3.jpg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageTestimonialSample4 = `${SOURCE_URL}img-testimonial-sample-4.jpg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const imageTestimonialSample5 = `${SOURCE_URL}img-testimonial-sample-5.jpg?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef`;

export const iconLocationBlack = (size = "1rem") => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 14 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.3283 9.43534 7.65339 9.3097 7.95671C9.18406 8.26002 8.99991 8.53562 8.76777 8.76777C8.53562 8.99991 8.26002 9.18406 7.95671 9.3097C7.65339 9.43534 7.3283 9.5 7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5ZM7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7C14 12.25 7 20 7 20C7 20 0 12.25 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0V0ZM7 2C5.67392 2 4.40215 2.52678 3.46447 3.46447C2.52678 4.40215 2 5.67392 2 7C2 8 2 10 7 16.71C12 10 12 8 12 7C12 5.67392 11.4732 4.40215 10.5355 3.46447C9.59785 2.52678 8.32608 2 7 2V2Z"
			fill="black"
		/>
	</svg>
);

export const iconLocationWhite = (size = "1rem") => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 14 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.3283 9.43534 7.65339 9.3097 7.95671C9.18406 8.26002 8.99991 8.53562 8.76777 8.76777C8.53562 8.99991 8.26002 9.18406 7.95671 9.3097C7.65339 9.43534 7.3283 9.5 7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5ZM7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7C14 12.25 7 20 7 20C7 20 0 12.25 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0ZM7 2C5.67392 2 4.40215 2.52678 3.46447 3.46447C2.52678 4.40215 2 5.67392 2 7C2 8 2 10 7 16.71C12 10 12 8 12 7C12 5.67392 11.4732 4.40215 10.5355 3.46447C9.59785 2.52678 8.32608 2 7 2Z"
			fill="white"
		/>
	</svg>
);

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
