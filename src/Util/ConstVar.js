export const THAINOW_USER_OBJ = "thainow.user";
export const THAINOW_PROFILE_OBJ = "thainow.profile";
export const THAINOW_RECENT_SIGN_IN_OBJ = "thainow.recentSignin";
export const THAINOW_USER_SIGN_UP_OBJ = "thainow.user.signup.info";
export const THAINOW_COMPANY_SIGN_UP_OBJ = "thainow.company.signup.info";
export const THAINOW_SEARCH_OBJ = "thainow.search.info";
export const THAINOW_USER_SIGN_IN_OBJ = "thainow.user.signin.info";
export const THAINOW_OFF_CANVAS_OBJ = "thainow.offcanvas.info";
export const THAINOW_USER_PROFILE_OBJ = "thainow.user.profile";
export const THAINOW_COMPANY_PROFILE_OBJ = "thainow.company.profile";

export const THAINOW_REDUX_STORE_ROOT_OBJ = "reduxStoreObj";
export const THAINOW_REDUX_STORE_ROOT_OBJ_PROPS = "reduxStoreObjProps";

export const IMAGE_THAINOW_LOGO = "thainowLogo";
export const IMAGE_THAINOW_LOGO_ROUND = "thainowLogoRound";
export const IMAGE_GUEST_PROFILE = "guestProfile";
export const IMAGE_CLASSIC_PROFILE = "classicProfile";
export const IMAGE_BUSINESS_PROFILE = "businessProfile";
export const IMAGE_ADD_FRAME = "addFrameImage";
export const IMAGE_BLUR_THAINOW = "thainowBlurImage";

export const SHOW_OFF_CANVAS = "showOffCanvas";
export const ON_RETURN_URL = "onReturnURL";
export const ON_SUCCESS_URL = "onSuccessURL";
export const ON_CLOSE_URL = "onCloseURL";

export const ICON_USER_READER = "userReaderIcon";
export const ICON_LOCATION = "locationIcon";
export const ICON_SEARCH = "searchIcon";
export const ICON_SEARCH_WHITE = "searchIconWhite";
export const ICON_EMAIL_BLACK = "emailIconBlack";
export const ICON_PHONE_BLACK = "phoneIconBlack";
export const ICON_NOTIFICATION_BLACK = "notificationBlack";
export const ICON_THREE_BARS_BLACK = "3barsBlack";
export const ICON_US_PHONE = "usPhoneIcon";

export const LOCATION_OBJ = "location";
export const PLACEID_PROP = "placeid";
export const LAT_PROP = "lat";
export const LNG_PROP = "lng";

export const PROFILE_TYPE_PROP = "profileType";
export const PROFILE_GUEST_TYPE_PROP = "guestProfile";
export const PROFILE_USER_TYPE_PROP = "userProfile";
export const PROFILE_COMPANY_TYPE_PROP = "companyProfile";
export const PROFILE_URL_PROP = "profileUrl";
export const PROFILE_NAME_PROP = "name";

export const UPLOAD_PHOTO_HANDLER = "uploadPhotoHandler";
export const VISIT_MY_PROFILE_HANDLER = "visitMyProfileHandler";

export const ACCESS_TOKEN_PROP = "access_token";
export const USER_PROP = "user";
export const ID_PROP = "id";
export const NAME_PROP = "name";
export const USERNAME_PROP = "username";
export const FIRSTNAME_PROP = "firstname";
export const LASTNAME_PROP = "lastname";
export const EMAIL_PROP = "email";
export const EMAIL_VALIDATION = "isValidEmail";
export const PHONE_PROP = "phone";
export const SMS_PROP = "sms";
export const PHONE_VALIDATION = "isValidPhone";
export const PASSWORD_PROP = "password";
export const PASSWORD_VALIDATION = "isValidPassword";
export const CONFIRM_PASSWORD_VALIDATION = "isPasswordMatch";
export const ADDRESS_PROP = "address";
export const VERIFICATION_METHOD_PROP = "verifyMethod";
export const SIGNIN_METHOD_PROP = "channel";
export const OTP_PROP = "otp";
export const OTP_VALIDATION = "isValidOtp";
export const PRIVILEGES_PROP = "privileges";
export const POSITION_PROP = "administratorRole";
export const ROLE_PROP = "role";
export const PENDING_STATUS_PROP = "PENDING";
export const DISABLED_PROP = "disabled";
export const AGREEMENT_PROP = "agreement";
export const WEBSITE_PROP = "website";
export const PICTURE_PROP = "picture";

export const SEARCH_OBJ = "searchObj";
export const SEARCH_INPUT_PROP = "input";
export const SEARCH_LOCATION_ADDRESS = "address";
export const SEARCH_BUSINESS = "business";
export const SEARCH_DEAL = "deals";
export const SEARCH_JOB = "jobs";
export const SEARCH_HOUSING = "housings";
export const SEARCH_MARKETPLACE = "marketplaces";
export const SEARCH_KEYWORD = "keywords";
export const SEARCH_DEFAULT_LOCATION = {
	[`${ADDRESS_PROP}`]: "Thai Town, Los Angeles, CA 90027, USA",
	[`${PLACEID_PROP}`]: "ChIJf2z2Hle_woARaNaIiR198fg",
};

export const COMPANY_INDUSTRY_LIST = [
	"Aquarium & Pet",
	"Attorney",
	"Auto Service",
	"Bank",
	"Bar",
	"Bodyshop",
	"Book Store",
	"Bookkeeping",
	"Boxing",
	"Car Dealer",
	"Car Towing",
	"Chiropractic",
	"Clothing",
	"Community Service",
	"Construction",
	"Consulate",
	"Consultant",
	"Cosmetic",
	"Customer Service",
	"Credit Card Services",
	"Dance",
	"Dentist",
	"Doctor Clinic",
	"Drink & Dessert",
	"DVD, CD, Games",
	"Education",
	"Elderly Care",
	"Embassy",
	"Factory",
	"Florist",
	"Fusion Restaurant",
	"Gift Shop",
	"Hair Salon",
	"Handyman",
	"Insurance",
	"Information Technology",
	"Japanese Restaurant",
	"Jewelry & Watch",
	"Market",
	"Mobile",
	"Money Transfer",
	"Nail",
	"Newspaper",
	"Notary Public",
	"Optical",
	"Painter",
	"Personal Trainer",
	"Printing",
	"Real Estate",
	"School",
	"Shipping",
	"Tailor",
	"Tax",
	"Taxi",
	"Television",
	"Thai Church",
	"Thai Massage",
	"Thai Restaurant",
	"Thai Temple",
	"Trader",
	"Travel Agency",
	"Vegan Restaurant",
];
export const COMPANY_POSTION_LIST = [
	"Owner",
	"Manager",
	"Representative",
	"No Preference",
];
export const COMPANY_SIZE_LIST = [
	"Micro (1-10)",
	"Small (10-100)",
	"Medium (101-999)",
	"Large (1000+)",
	"No preference",
];

export const COMPANY_PROP = "company";
export const COMPANY_LIST = "companies";
export const COMPANY_INDUSTRY_PROP = "industry";
export const COMPANY_NAME_PROP = "name";
export const COMPANY_ADDRESS_PROP = "address";
export const COMPANY_INFORMAL_PROP = "informal";
export const COMPANY_EMAIL_PROP = "email";
export const COMPANY_EMAIL_VALIDATION = "isValidEmail";
export const COMPANY_PHONE_PROP = "phone";
export const COMPANY_PHONE_VALIDATION = "isValidPhone";
export const COMPANY_WEBSITE_PROP = "website";
export const COMPANY_WEBSITE_VALIDATION = "isValidWebsite";
export const COMPANY_SIZE_PROP = "size";
export const COMPANY_SUBMIT_EXTRA_INFO_VALIDATION = "isSummitExtraInfo";

export const COMPANY_STATUS_PROP = "status";

export const ERROR = "ERROR";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const ERROR_TYPE = "ERROR_STATUS";
