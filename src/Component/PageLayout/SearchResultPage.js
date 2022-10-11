import {
	ArrowDownOutlined,
	CloseOutlined,
	FilterOutlined,
} from "@ant-design/icons";
import {
	Button,
	Col,
	Divider,
	Dropdown,
	Grid,
	Menu,
	Row,
	Space,
	Tag,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
	SEARCH_BUSINESS,
	SEARCH_DEAL,
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

function SearchResultPage() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { Title } = Typography;

	const [searchParams, setSearchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";
	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;

	const { location } = useLocation();
	const { dispatchSearch } = useSearch();

	useEffect(() => {
		dispatchSearch();
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

	const [showSearchFilter, setShowSearchFilter] = useState(false);

	const filterBtn = (
		<Button typeof="ghost" icon={<FilterOutlined />}>
			{searchTypeParam === SEARCH_BUSINESS ? "Type Business" : "Add Filter"}
		</Button>
	);

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

	const resultHeader = (
		<>
			<Row justify="space-between" align="middle" className="my-0 my-md-4">
				{screens?.md && (
					<>
						<Col>
							<Title level={2}>
								All {keywordParam.length > 0 && `" ${keywordParam} "`} Results
							</Title>
						</Col>
						<Col>
							<Space direction="horizontal">
								{filterBtn} {sortBtn}
							</Space>
						</Col>
					</>
				)}
				{screens?.xs && (
					<>
						<Col span={24}>
							<Space direction="horizontal">
								{filterBtn} {sortBtn}
							</Space>
						</Col>
						<Col span={24}>
							<Title level={3} className="my-4">
								All {keywordParam.length > 0 && `" ${keywordParam} "`} Results
							</Title>
						</Col>{" "}
					</>
				)}
				{keywordParam.length > 0 && (
					<Col span={24}>
						<Tag className="">
							<div className="tedkvn-center">
								{keywordParam}
								<CloseOutlined
									className="mx-2 pt-1"
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
					</Col>
				)}
			</Row>
		</>
	);

	const results = <>{resultHeader}</>;

	const app = (
		<div className="m-4">
			{screens?.md && header}
			{results}
		</div>
	);
	return app;
}

export default SearchResultPage;
