import { CloseOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Divider,
	Empty,
	Grid,
	Row,
	Skeleton,
	Space,
	Tag,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import {
	CREATE_PROP,
	FORWARD_CONTINUE,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_RESULT_OBJ,
	SEARCH_SERVICE,
	SEARCH_SORT,
	SEARCH_SORT_DATE,
	SEARCH_TYPE_PROP,
} from "../../../Util/ConstVar";
import { formatSentenseCase } from "../../../Util/Util";
import BusinessBadge from "../../Badge/BusinessBadge";
import DealBadge from "../../Badge/DealBadge";
import HousingBadge from "../../Badge/HousingBadge";
import JobBadge from "../../Badge/JobBadge";
import MarketplaceBadge from "../../Badge/MarketplaceBadge";
import useSearch from "../../Hook/useSearch";
import useUrls from "../../Hook/useUrls";
import BusinessCard from "../../ServiceCard/BusinessCard";
import DealCard from "../../ServiceCard/DealCard";
import HousingCard from "../../ServiceCard/HousingCard";
import JobCard from "../../ServiceCard/JobCard";
import MarketplaceCard from "../../ServiceCard/MarketplaceCard";

function SearchResultPage() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const location = useLocation();
	const { forwardUrl } = useUrls();

	const { Title } = Typography;

	const [searchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || SEARCH_BUSINESS;
	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;

	const { dispatchSearch } = useSearch();

	const { [`${SEARCH_RESULT_OBJ}`]: searchResult = {} } =
		useSelector(thainowReducer);

	const { [`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults = [] } = searchResult;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading && searchTypeParam !== "") {
			dispatchSearch(searchTypeParam).then(() => setLoading(false));
		}
	}, []);

	const tagItems = [
		(props = {}) => (
			<BusinessBadge
				type="tag"
				active={searchTypeParam === SEARCH_BUSINESS}
				onClick={() => dispatchSearch(SEARCH_BUSINESS)}
				{...props}
			/>
		),
		(props = {}) => (
			<DealBadge
				type="tag"
				active={searchTypeParam === SEARCH_DEAL}
				onClick={() => dispatchSearch(SEARCH_DEAL)}
				{...props}
			/>
		),
		(props = {}) => (
			<JobBadge
				type="tag"
				active={searchTypeParam === SEARCH_JOB}
				onClick={() => dispatchSearch(SEARCH_JOB)}
				{...props}
			/>
		),
		(props = {}) => (
			<HousingBadge
				type="tag"
				active={searchTypeParam === SEARCH_HOUSING}
				onClick={() => dispatchSearch(SEARCH_HOUSING)}
				{...props}
			/>
		),
		(props = {}) => (
			<MarketplaceBadge
				type="tag"
				active={searchTypeParam === SEARCH_MARKETPLACE}
				onClick={() => dispatchSearch(SEARCH_MARKETPLACE)}
				{...props}
			/>
		),
	];

	const header = (
		<>
			<Title level={2} ellipsis>
				Browsing{" "}
				{searchTypeParam.charAt(0).toUpperCase() + searchTypeParam.slice(1)}
			</Title>
			<Space direction="horizontal" wrap>
				{tagItems.map((tag, idx) => (
					<React.Fragment key={idx}>
						{tag({
							tagClassName: "p-1 px-4 rounded lh-base",
						})}
					</React.Fragment>
				))}
			</Space>
			<Divider />
		</>
	);

	// const [showSearchFilter, setShowSearchFilter] = useState(false);

	// const filterBtn = (
	// 	<Button typeof="ghost" icon={<FilterOutlined />}>
	// 		{searchTypeParam === SEARCH_BUSINESS ? "Type Business" : "Add Filter"}
	// 	</Button>
	// );

	// const sortOptions = [
	// 	{
	// 		key: SEARCH_SORT_DATE,
	// 		label: "Sort by Date",
	// 	},
	// 	{
	// 		key: SEARCH_SORT_DISTANCE,
	// 		label: "Sort by Distance",
	// 	},
	// ];

	// const sortOptionMenu = (
	// 	<Menu
	// 		items={sortOptions}
	// 		onClick={({ key }) =>
	// 			dispatchSearch(searchTypeParam, {
	// 				[`${SEARCH_SORT}`]: key,
	// 			})
	// 		}
	// 	/>
	// );

	// const sortBtn = (
	// 	<Dropdown overlay={sortOptionMenu} placement="bottomRight">
	// 		<Button typeof="ghost" icon={<ArrowDownOutlined />}>
	// 			Sort By {sortParam}
	// 		</Button>
	// 	</Dropdown>
	// );

	const keywordTag = (
		<Tag>
			<div className="tedkvn-center">
				{keywordParam}
				<CloseOutlined
					className="mx-2"
					style={{
						cursor: "pointer",
					}}
					onClick={() =>
						dispatchSearch(searchTypeParam, {
							[`${SEARCH_KEYWORD}`]: "",
						})
					}
				/>
			</div>
		</Tag>
	);

	const resultHeader = (
		<>
			<Row justify="space-between" align="middle" className="my-0 my-md-4">
				<Col order={screens?.xs && 2} xs={24}>
					<Row justify="space-between" align="middle">
						<Col className="tedkvn-center" style={{ maxWidth: "70%" }}>
							<Title level={2} className="m-0">
								All {keywordParam.length > 0 && `" ${keywordParam} "`} Results
							</Title>
						</Col>
						<Col className="tedkvn-center">
							<Button
								type="primary"
								className={`mt-2 text-white ${
									searchTypeParam === SEARCH_DEAL
										? "bg-primary"
										: searchTypeParam === SEARCH_JOB
										? "bg-job"
										: searchTypeParam === SEARCH_HOUSING
										? "bg-housing"
										: searchTypeParam === SEARCH_MARKETPLACE
										? "bg-marketplace"
										: "bg-business"
								}`}
								shape="round"
								{...(screens.xs && { size: "small" })}
								onClick={() =>
									forwardUrl(
										FORWARD_CONTINUE,
										"",
										`/${CREATE_PROP}/${SEARCH_SERVICE}/${searchTypeParam}`,
										location?.pathname + location?.search || "/"
									)
								}
							>
								Create New {formatSentenseCase(searchTypeParam)}
							</Button>
						</Col>
					</Row>
				</Col>

				{keywordParam.length > 0 && (
					<Col xs={24} order={3}>
						{keywordTag}
					</Col>
				)}
			</Row>
		</>
	);

	const results = (
		<>
			{resultHeader}
			{fetchResults.length > 0 ? (
				<Row
					gutter={[
						{ xs: 15, sm: 50 },
						{ xs: 20, sm: 50 },
					]}
					className="mt-4"
				>
					{fetchResults.map((rel, idx) => (
						<Col
							xs={fetchResults?.length < 2 ? 24 : 12}
							sm={fetchResults?.length < 2 ? 24 : 12}
							md={fetchResults?.length < 2 ? 24 : 12}
							lg={12}
							key={idx}
							id="service-card"
						>
							{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_BUSINESS && (
								<BusinessCard card={rel} />
							)}

							{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_DEAL && (
								<DealCard card={rel} />
							)}

							{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_JOB && (
								<JobCard card={rel} />
							)}

							{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_HOUSING && (
								<HousingCard card={rel} />
							)}

							{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_MARKETPLACE && (
								<MarketplaceCard card={rel} />
							)}
						</Col>
					))}
				</Row>
			) : (
				<Empty
					description={
						<>
							<Typography.Title level={3}>
								No results for {searchResult?.[`${SEARCH_TYPE_PROP}`]} in the
								current map area yet.
							</Typography.Title>

							<Typography.Title level={3} type="success">
								Try to find better results with:{" "}
							</Typography.Title>

							<Space direction="vertical" size={20}>
								<Typography.Text strong>
									Try a larger search area
								</Typography.Text>

								<Typography.Text strong>Check spellings</Typography.Text>

								<Typography.Text strong>
									Search with a more general search, e.g. "Restaurant" instead
									of "Thai or Japanese Restaurant"`
								</Typography.Text>
							</Space>
						</>
					}
				/>
			)}
		</>
	);

	const skeletonCard = (
		<Card
			cover={
				<div className="tedkvn-center mt-5 " style={{ padding: "0 3.3rem" }}>
					<Skeleton.Avatar shape="circle" size={150} active={true} />
				</div>
			}
			className="m-4 overflow-hidden"
		>
			<Skeleton loading={loading} active />
		</Card>
	);

	const app = (
		<div className="m-2 m-md-4 overflow-hidden">
			{screens?.md && header}
			{loading ? skeletonCard : results}
		</div>
	);

	return app;
}

export default SearchResultPage;
