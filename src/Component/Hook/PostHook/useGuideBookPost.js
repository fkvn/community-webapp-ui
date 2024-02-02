import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
	svgBasicLivingIcon,
	svgBusinessInvestmentIcon,
	svgHealthIcon,
	svgKidsIcon,
	svgLearningsIcon,
	svgLivingPermanentlyIcon,
	svgMovingToUsIcon,
	svgThaiPrideIcon,
	svgTransferIcon,
	svgTravelIcon,
} from "../../../Assest/Asset";
import {
	fetchGuideBookAxios,
	fetchGuideBooksAxios,
} from "../../../Axios/guideBookAxios";
import useMessage from "../MessageHook/useMessage";

function useGuideBookPost() {
	const { t } = useTranslation();
	const [urlParams, setUrlParams] = useSearchParams();
	const { errorMessage } = useMessage();

	/**
	 *
	 * @param {Object} requestParams {key: value}
	 * @requestParamsKeyList profileId, requesterId, keywords, category, status,sortBy, sortByOrder, page, limit
	 */
	const fetchGuideBookPosts = async (requestParams = {}) => {
		return fetchGuideBooksAxios(requestParams)
			.then((res) => {
				// return search result
				return res;
			})
			.catch((e) => errorMessage(e));
	};

	const fetchGuideBookCategories = () => {
		return [
			{
				key: "BASIC_LIVING",
				title: t("basic_living_msg"),
				icon: svgBasicLivingIcon,
				background:
					"linear-gradient(0deg, #F9F2E7 0%, #F9F2E7 100%), linear-gradient(180deg, #F5FCEC 0%, #D8F4B3 100%)",
				color: "#C89340",
			},
			{
				key: "MOVING_TO_US",
				title: t("moving_to_us_msg"),
				icon: svgMovingToUsIcon,
				background:
					"linear-gradient(0deg, #FCEBE6 0%, #FCEBE6 100%), linear-gradient(180deg, #FFEDF2 0%, #FFCEDC 100%)",
				color: "#D15733",
			},
			{
				key: "LIVING_PERMANENTLY",
				title: t("living_permanently_msg"),
				icon: svgLivingPermanentlyIcon,
				background:
					"linear-gradient(0deg, #EDF5E6 0%, #EDF5E6 100%), linear-gradient(180deg, #FEF7E7 0%, #FFEEC7 100%)",
				color: "#89C157",
			},
			{
				key: "TRAVEL",
				title: t("travel_msg"),
				icon: svgTravelIcon,
				background:
					"linear-gradient(0deg, #E8F7F7 0%, #E8F7F7 100%), linear-gradient(180deg, #E5F7F9 0%, #B2F7FF 100%)",
				color: "#29A0A8",
			},
			{
				key: "LEARNING",
				title: t("learning_msg"),
				icon: svgLearningsIcon,
				background:
					"linear-gradient(0deg, #FAF0F8 0%, #FAF0F8 100%), linear-gradient(180deg, #E6FBFE 0%, #CEF9FF 100%)",
				color: "#B072AA",
			},
			{
				key: "TRANSFER",
				title: t("transfer_msg"),
				icon: svgTransferIcon,
				background:
					"linear-gradient(0deg, #F7F4DF 0%, #F7F4DF 100%), linear-gradient(180deg, #F6F4FF 0%, #E4DEFF 100%)",
				color: "#8B8450",
			},
			{
				key: "HEALTH",
				title: t("health_msg"),
				icon: svgHealthIcon,
				background:
					"linear-gradient(0deg, #E9F6EF 0%, #E9F6EF 100%), linear-gradient(180deg, #E0F3FF 0%, #BEE5FF 100%)",
				color: "#3D9C7F",
			},

			{
				key: "KIDS",
				title: t("kids_msg"),
				icon: svgKidsIcon,
				background:
					"linear-gradient(0deg, #FDEEF5 0%, #FDEEF5 100%), linear-gradient(180deg, #F6F4FF 0%, #E4DEFF 100%)",
				color: "#DC5A9A",
			},

			{
				key: "BUSINESS_AND_INVESTMENT",
				title: t("business_and_investment_msg"),
				icon: svgBusinessInvestmentIcon,
				background:
					"linear-gradient(0deg, #E6FBFE 0%, #E6FBFE 100%), linear-gradient(180deg, #E0F3FF 0%, #BEE5FF 100%)",
				color: "#35B7C7",
			},

			{
				key: "THAI_PRIDE",
				title: t("thai_pride_msg"),
				icon: svgThaiPrideIcon,
				background:
					"linear-gradient(0deg, #ECEFFA 0%, #ECEFFA 100%), linear-gradient(180deg, #F6F4FF 0%, #E4DEFF 100%)",
				color: "#2C69B9",
			},
		];
	};

	const fetchGuideBookPost = (id) =>
		fetchGuideBookAxios(id).catch((e) => errorMessage(e));

	return {
		fetchGuideBookPosts,
		fetchGuideBookPost,
		fetchGuideBookCategories,
	};
}
export default useGuideBookPost;
