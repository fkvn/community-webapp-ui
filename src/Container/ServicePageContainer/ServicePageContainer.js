import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { errorMessage } from "../../Component/Hook/useMessage";
import usePost from "../../Component/Hook/usePost";
import useUrls from "../../Component/Hook/useUrls";
import DealPage from "../../Component/PageLayout/ServicePage/DealPage";
import HousingPage from "../../Component/PageLayout/ServicePage/HousingPage";
import JobPage from "../../Component/PageLayout/ServicePage/JobPage";
import MarketplacePage from "../../Component/PageLayout/ServicePage/MarketplacePage";
import SkeletonCard from "../../Component/Skeleton/SkeletonCard";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import {
	DEAL_POST_TYPE_PROP,
	FORWARD_CLOSE,
	HOUSING_POST_TYPE_PROP,
	ID_PROP,
	JOB_POST_TYPE_PROP,
	MARKETPLACE_POST_TYPE_PROP,
	POST_OWNER_PROP,
	POST_TYPE_PROP,
	PROFILE_OBJ,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_MARKETPLACE,
	SEARCH_TYPE_PROP,
} from "../../Util/ConstVar";

function ServicePageContainer() {
	const { id = -1, [`${SEARCH_TYPE_PROP}`]: type = "" } = useParams();
	const requestId = Number(id);

	const { [`${PROFILE_OBJ}`]: { [`${ID_PROP}`]: ownerId = -1 } = {} } =
		useSelector(thainowReducer);

	const { findService: findPost } = usePost();

	const { forwardUrl } = useUrls();

	const [service, setService] = useState({});

	const fetchServiceType = () => {
		switch (type) {
			case SEARCH_DEAL:
				return DEAL_POST_TYPE_PROP;
			case SEARCH_JOB:
				return JOB_POST_TYPE_PROP;
			case SEARCH_HOUSING:
				return HOUSING_POST_TYPE_PROP;
			case SEARCH_MARKETPLACE:
				return MARKETPLACE_POST_TYPE_PROP;
			default:
				break;
		}
	};

	const renderServicePage = (props = {}) => {
		switch (type) {
			case SEARCH_DEAL:
				return <DealPage {...props} />;
			case SEARCH_JOB:
				return <JobPage {...props} />;
			case SEARCH_HOUSING:
				return <HousingPage {...props} />;
			case SEARCH_MARKETPLACE:
				return <MarketplacePage {...props} />;
			default:
				forwardUrl(FORWARD_CLOSE);
		}
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		findPost(requestId, ownerId, fetchServiceType()).then((res) => {
			fetchServiceType() === res?.[`${POST_TYPE_PROP}`]
				? setService(res)
				: errorMessage("Invalid Access");
		});
	}, [id, ownerId]);

	const app = (
		<>
			{!service?.[`${ID_PROP}`] ? (
				<SkeletonCard />
			) : (
				<>
					{renderServicePage({
						isOwner:
							service?.[`${POST_OWNER_PROP}`]?.[`${ID_PROP}`] === ownerId,
						service: service,
					})}
					{/* <Helmet>
						<title>Some Page</title>
					</Helmet> */}
				</>
			)}
		</>
	);
	return app;
}

export default ServicePageContainer;
