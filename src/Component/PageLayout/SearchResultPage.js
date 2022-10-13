import { ArrowDownOutlined, CloseOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Divider,
	Dropdown,
	Grid,
	Menu,
	Row,
	Skeleton,
	Space,
	Tag,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_SORT,
	SEARCH_SORT_DATE,
	SEARCH_SORT_DISTANCE,
	SEARCH_TYPE_PROP,
} from "../../Util/ConstVar";
import BusinessBadge from "../Badge/BusinessBadge";
import DealBadge from "../Badge/DealBadge";
import HousingBadge from "../Badge/HousingBadge";
import JobBadge from "../Badge/JobBadge";
import MarketplaceBadge from "../Badge/MarketplaceBadge";
import useSearch from "../Hook/useSearch";
import BusinessCard from "../ServiceCard/BusinessCard";

function SearchResultPage() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { Title } = Typography;

	const [searchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || SEARCH_BUSINESS;
	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;

	const { searchResult, dispatchSearch } = useSearch();

	const { [`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults = [] } = searchResult;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			dispatchSearch();
			setLoading(false);
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

	const sortOptions = [
		{
			key: SEARCH_SORT_DATE,
			label: "Sort by Date",
		},
		{
			key: SEARCH_SORT_DISTANCE,
			label: "Sort by Distance",
		},
	];

	const sortOptionMenu = (
		<Menu
			items={sortOptions}
			onClick={({ key }) =>
				dispatchSearch(searchTypeParam, {
					[`${SEARCH_SORT}`]: key,
				})
			}
		/>
	);

	const sortBtn = (
		<Dropdown overlay={sortOptionMenu} placement="bottomRight">
			<Button typeof="ghost" icon={<ArrowDownOutlined />}>
				Sort By {sortParam}
			</Button>
		</Dropdown>
	);

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
				<Col
					order={screens?.xs && 2}
					{...(screens?.xs && { xs: 24, className: "mt-4" })}
				>
					<Title level={2}>
						All {keywordParam.length > 0 && `" ${keywordParam} "`} Results
					</Title>
				</Col>
				<Col>
					<Space direction="horizontal">
						{/* {filterBtn}  */}
						{sortBtn}
					</Space>
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
			{fetchResults.length > 0 && (
				<Row gutter={[50, 50]} className="mt-4">
					{fetchResults.map((rel, idx) => (
						<Col xs={24} md={12} key={idx}>
							{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_BUSINESS && (
								<BusinessCard card={rel} />
							)}
						</Col>
					))}
				</Row>
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
		<div className="m-4 overflow-hidden">
			{screens?.md && header}
			{loading ? skeletonCard : results}
		</div>
	);

	return app;
}

export default SearchResultPage;
