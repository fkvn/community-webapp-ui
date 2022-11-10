import {
	Button,
	Col,
	Divider,
	Empty,
	Grid,
	Row,
	Space,
	Table,
	Tag,
	Typography,
} from "antd";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import {
	CREATE_PROP,
	EDIT_PROP,
	FORWARD_CONTINUE,
	ID_PROP,
	INFO_PROP,
	POST_OWNER_ID_PROP,
	PROFILE_OBJ,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_MARKETPLACE,
	SEARCH_PAGE_PROP,
	SEARCH_RESULT_OBJ,
	SEARCH_SERVICE,
	SEARCH_TOTAL_PAGE_PROP,
	SEARCH_TYPE_PROP,
	STATUS_PROP,
	TITLE_PROP,
	UPDATED_ON_PROP,
} from "../../../Util/ConstVar";
import BusinessBadge from "../../Badge/BusinessBadge";
import DealBadge from "../../Badge/DealBadge";
import HousingBadge from "../../Badge/HousingBadge";
import JobBadge from "../../Badge/JobBadge";
import MarketplaceBadge from "../../Badge/MarketplaceBadge";
import useSearch from "../../Hook/useSearch";
import useUrls from "../../Hook/useUrls";
import LoadMore from "../../Search/LoadMore";
import SearchOption from "../../Search/SearchOption";
import BusinessCard from "../../ServiceCard/BusinessCard";
import DealCard from "../../ServiceCard/DealCard";
import HousingCard from "../../ServiceCard/HousingCard";
import JobCard from "../../ServiceCard/JobCard";
import MarketplaceCard from "../../ServiceCard/MarketplaceCard";
import SkeletonCard from "../../Skeleton/SkeletonCard";
import RemoveService from "../EditService/RemoveService";

function SearchResultPage({
	withBusiness = true,
	withOwner = false,
	ownerId = -1,
	withBrowsingText = true,
	withServiceTag = true,
	withCardTitle = true,
} = {}) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const serviceParams = [
		...(withBusiness ? [SEARCH_BUSINESS] : []),
		SEARCH_DEAL,
		SEARCH_JOB,
		SEARCH_HOUSING,
		SEARCH_MARKETPLACE,
	];

	const [searchParams] = useSearchParams();
	const searchTypeParam =
		serviceParams.indexOf(searchParams.get(SEARCH_TYPE_PROP)) >= 0
			? searchParams.get(SEARCH_TYPE_PROP)
			: SEARCH_DEAL;

	const { dispatchSearch } = useSearch();

	const {
		[`${PROFILE_OBJ}`]: profile = {},
		[`${SEARCH_RESULT_OBJ}`]: {
			[`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults = [],
			[`${SEARCH_TOTAL_PAGE_PROP}`]: totalPage = 1,
		} = {},
	} = useSelector(thainowReducer);

	const searchServiceHandle = ({ type = searchTypeParam, params = {} } = {}) =>
		dispatchSearch({
			type: type,
			params: {
				...(withOwner && {
					[`${POST_OWNER_ID_PROP}`]: ownerId,
				}),
				...params,
			},
			backToTop: false,
		});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			searchServiceHandle().then(() => setLoading(false));
		}
	}, []);

	useEffect(() => {
		try {
			$("#tag-bar").scrollLeft($(`#${searchTypeParam}`).offset()?.left - 50);
		} catch (error) {}
	});

	const serviceTagData = [
		...(withBusiness
			? [
					(props = {}) => (
						<BusinessBadge
							type="tag"
							active={searchTypeParam === SEARCH_BUSINESS}
							onClick={() =>
								dispatchSearch({
									type: SEARCH_BUSINESS,
									backToTop: false,
								})
							}
							{...props}
						/>
					),
			  ]
			: []),
		,
		(props = {}) => (
			<DealBadge
				type="tag"
				active={searchTypeParam === SEARCH_DEAL}
				onClick={() =>
					dispatchSearch({
						type: SEARCH_DEAL,
						backToTop: false,
					})
				}
				{...props}
			/>
		),
		(props = {}) => (
			<JobBadge
				type="tag"
				active={searchTypeParam === SEARCH_JOB}
				onClick={() =>
					dispatchSearch({
						type: SEARCH_JOB,
						backToTop: false,
					})
				}
				{...props}
			/>
		),
		(props = {}) => (
			<HousingBadge
				type="tag"
				active={searchTypeParam === SEARCH_HOUSING}
				onClick={() =>
					dispatchSearch({
						type: SEARCH_HOUSING,
						backToTop: false,
					})
				}
				{...props}
			/>
		),
		(props = {}) => (
			<MarketplaceBadge
				type="tag"
				active={searchTypeParam === SEARCH_MARKETPLACE}
				onClick={() =>
					dispatchSearch({
						type: SEARCH_MARKETPLACE,
						backToTop: false,
					})
				}
				{...props}
			/>
		),
	];

	const serviceHeader = (withOwner || (!screens.xs && screens.xl)) && (
		<>
			{withBrowsingText && (
				<Typography.Title level={1} ellipsis>
					Browsing{" "}
					{searchTypeParam.charAt(0).toUpperCase() + searchTypeParam.slice(1)}
				</Typography.Title>
			)}
			{withServiceTag && (
				<>
					<Space
						direction="horizontal"
						id="tag-bar"
						className="hideScrollHorizontal my-1 w-100"
						style={{
							position: "relative",
							overflowX: "scroll",
						}}
						size={20}
					>
						{serviceTagData.map((tag, idx) => (
							<React.Fragment key={idx}>
								{tag({
									tagProps: {
										style: {
											fontSize: ".8rem",
										},
									},
								})}
							</React.Fragment>
						))}
					</Space>
					<SearchOption />
					<Divider />
				</>
			)}
		</>
	);

	const { forwardUrl } = useUrls();
	const location = useLocation();

	const emptySection = withOwner ? (
		<Empty
			description={`This profile hasn't posted any ${searchTypeParam} yet`}
		/>
	) : (
		<Empty
			description={
				<>
					<Typography.Title level={3}>
						No results for {searchTypeParam} in the current map area yet.
					</Typography.Title>

					<Typography.Title level={3} type="success">
						Try to find better results with:{" "}
					</Typography.Title>

					<Space direction="vertical" size={20}>
						<Typography.Text strong>Try a larger search area</Typography.Text>

						<Typography.Text strong>Check spellings</Typography.Text>

						<Typography.Text strong>
							Search with a more general search, e.g. "Restaurant" instead of
							"Thai or Japanese Restaurant"`
						</Typography.Text>
					</Space>
				</>
			}
		/>
	);

	const resultHeader = (
		<>
			<Row justify="space-between" align="middle" className="my-0 my-md-4">
				<Col order={screens?.xs && 2} xs={24}>
					<Row justify="space-between" align="middle">
						<Col className="tedkvn-center" style={{ maxWidth: "70%" }}>
							<Typography.Title level={2} className="m-0" ellipsis>
								All Results
							</Typography.Title>
						</Col>
						{(!withOwner || ownerId === profile?.[`${ID_PROP}`]) &&
							searchTypeParam !== SEARCH_BUSINESS && (
								<Col className="tedkvn-center">
									<Button
										type="primary"
										className={`text-white ${
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
										onClick={() =>
											forwardUrl(
												FORWARD_CONTINUE,
												"",
												`/${CREATE_PROP}/${SEARCH_SERVICE}/${searchTypeParam}`,
												location?.pathname + location?.search || "/"
											)
										}
									>
										New Post
									</Button>
								</Col>
							)}
					</Row>
				</Col>
			</Row>
		</>
	);

	const tableServiceResultColumns = [
		{
			title: "Title",
			dataIndex: "title",
			render: ([id, title]) => (
				<Typography.Link
					onClick={() =>
						forwardUrl(
							FORWARD_CONTINUE,
							location?.pathname + location?.search || "/",
							`/${SEARCH_SERVICE}/${searchTypeParam}/${id}`,
							location?.pathname + location?.search || "/"
						)
					}
				>
					{title}
				</Typography.Link>
			),
			ellipsis: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (status) =>
				status === "AVAILABLE" ? (
					<Tag color="success">PUBLIC</Tag>
				) : (
					<Tag color="warning">{status}</Tag>
				),
			ellipsis: true,
		},
		{
			title: "Date",
			dataIndex: "date",
			// render: (time) => formatTime(time),
			ellipsis: true,
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (serviceId) => (
				<Space size="middle">
					<Button
						type="link"
						className="border-0 p-0"
						onClick={() =>
							forwardUrl(
								FORWARD_CONTINUE,
								"",
								`/${EDIT_PROP}/${SEARCH_SERVICE}/${searchTypeParam}/${serviceId}`,
								location?.pathname + location?.search || "/"
							)
						}
					>
						Edit
					</Button>
					<RemoveService
						ownerId={ownerId}
						serviceId={serviceId}
						forward={false}
					>
						<Button type="link" className="border-0 p-0 text-danger">
							Delete
						</Button>
					</RemoveService>
				</Space>
			),
			ellipsis: true,
		},
	];

	const cardServiceResult =
		fetchResults.length > 0 ? (
			<Row
				gutter={[
					{ xs: 15, sm: 50 },
					{ xs: 20, sm: 50 },
				]}
				className="mt-4"
			>
				{fetchResults.map((rel, idx) => (
					<Col xs={24} md={12} key={idx} id="service-card">
						{withBusiness && searchTypeParam === SEARCH_BUSINESS && (
							<BusinessCard card={rel} />
						)}
						{searchTypeParam === SEARCH_DEAL && (
							<DealCard card={rel} withCardTitle={withCardTitle} />
						)}

						{searchTypeParam === SEARCH_JOB && (
							<JobCard card={rel} withCardTitle={withCardTitle} />
						)}

						{searchTypeParam === SEARCH_HOUSING && (
							<HousingCard card={rel} withCardTitle={withCardTitle} />
						)}

						{searchTypeParam === SEARCH_MARKETPLACE && (
							<MarketplaceCard card={rel} withCardTitle={withCardTitle} />
						)}
					</Col>
				))}
			</Row>
		) : (
			emptySection
		);

	const tableServiceResultData = fetchResults.map((res, idx) => {
		return {
			key: idx,
			title: [res?.[`${ID_PROP}`], res?.[`${INFO_PROP}`]?.[`${TITLE_PROP}`]],
			status: res?.[`${INFO_PROP}`]?.[`${STATUS_PROP}`],
			date: res?.[`${INFO_PROP}`]?.[`${UPDATED_ON_PROP}`],
			action: res?.[`${ID_PROP}`],
		};
	});

	const tableServiceResult = (
		<Table
			columns={tableServiceResultColumns}
			dataSource={tableServiceResultData}
			pagination={{
				total: totalPage,
				pageSize: 20,
				responsive: true,
				onChange: (page) =>
					dispatchSearch({
						params: { [`${SEARCH_PAGE_PROP}`]: page },
						loadMore: true,
						backToTop: false,
					}),
			}}
			scroll={{ x: true, y: 240 }}
			className="my-3"
		/>
	);

	const app = (
		<Row id="search-result-page" justify="center" className="my-3 ">
			<Col xs={24}>
				{serviceHeader} {resultHeader}
				{withOwner && ownerId === profile?.[`${ID_PROP}`]
					? tableServiceResult
					: cardServiceResult}
				<LoadMore />
			</Col>{" "}
		</Row>
	);

	return loading ? <SkeletonCard cover={false} /> : app;
}

export default SearchResultPage;
