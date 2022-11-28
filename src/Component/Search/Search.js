import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, List, Row, Space } from "antd";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { patchLocationInfoPromise } from "../../redux-store/dispatchPromise";
import { fetchStoredLocation } from "../../redux-store/reducer/thainowReducer";
import {
	ADDRESS_PROP,
	LOCATION_OBJ,
	PLACEID_PROP,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_DEFAULT_LOCATION,
	SEARCH_HOUSING,
	SEARCH_INPUT_PROP,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_OBJ,
	SEARCH_TYPE_PROP,
} from "../../Util/ConstVar";
import BusinessBadge from "../Badge/BusinessBadge";
import DealBadge from "../Badge/DealBadge";
import HousingBadge from "../Badge/HousingBadge";
import JobBadge from "../Badge/JobBadge";
import MarketplaceBadge from "../Badge/MarketplaceBadge";
import useAddress from "../Hook/FormHook/useAddress";
import useSearchKeyword from "../Hook/FormHook/useSearchKeyword";
import useSearch from "../Hook/useSearch";

function Search({
	direction = "",
	gap = 4,
	formProps = {},
	searchProps = {},
	addressProps = {},
	itemProps = {},
	buttonProps = {},
	showRecentSearch = false,
	// for offcanvas search
	hideOffCanvas = () => {},
}) {
	const navigate = useNavigate();

	const [form] = Form.useForm();

	const [searchParams] = useSearchParams();

	const [searchType, setSearchType] = useState(
		searchParams.get("type") || SEARCH_BUSINESS
	);

	const { dispatchSearch } = useSearch();

	const [recentSearch, setRecentSearch] = useState(
		JSON.parse(sessionStorage.getItem(SEARCH_OBJ)) || []
	);

	const [searching, setSearching] = useState(false);

	const fetchLocation = async () => {
		let addressValue = form.getFieldValue(LOCATION_OBJ)?.[`${ADDRESS_PROP}`];

		let placeidValue = form.getFieldValue(LOCATION_OBJ)?.[`${PLACEID_PROP}`];

		const validLocation = addressValue !== "" && placeidValue !== "";

		let location = {
			[`${ADDRESS_PROP}`]: addressValue,
			[`${PLACEID_PROP}`]: placeidValue,
		};

		if (!validLocation) {
			location = {
				...SEARCH_DEFAULT_LOCATION,
			};
		}

		return patchLocationInfoPromise(location, true).then(() => {
			sessionStorage.setItem([`${LOCATION_OBJ}`], JSON.stringify(location));
			return Promise.resolve(location);
		});
	};

	const addRecentSearch = (keyword = "") => {
		if (keyword !== "") {
			setRecentSearch([...recentSearch, keyword.toString()]);
			sessionStorage.setItem(
				SEARCH_OBJ,
				JSON.stringify([...recentSearch, keyword.toString()])
			);
		}
	};

	const clearRecentSearch = (all = false, index = -1) => {
		if (all) {
			sessionStorage.removeItem(SEARCH_OBJ);
			setRecentSearch([]);
		} else {
			const updatedRecentSearch = recentSearch.reduce(
				(res, key, idx) => (idx === index ? res : [...res, key]),
				[]
			);

			sessionStorage.setItem(SEARCH_OBJ, JSON.stringify(updatedRecentSearch));
			setRecentSearch(updatedRecentSearch);
		}
	};

	const fetchRecentSearch = () => {
		return recentSearch.map((key, idx) => {
			return { title: key, idx: idx };
		});
	};

	const routeLocation = useLocation();

	const onSearch = () =>
		((callBack = async () => {}) => {
			setSearching(true);
			callBack
				.then((params = "") => {
					hideOffCanvas();
					addRecentSearch(form.getFieldValue(SEARCH_INPUT_PROP));
					routeLocation?.pathname !== "/search" &&
						navigate(`/search?${params}`);
				})
				.finally(() => setSearching(false));
		})(
			fetchLocation().then((location = {}) =>
				routeLocation?.pathname === "/search"
					? dispatchSearch({
							type: searchType,
							params: {
								[`${SEARCH_KEYWORD}`]: form.getFieldValue(SEARCH_INPUT_PROP),
								...location,
							},
					  })
					: Promise.resolve(
							new URLSearchParams({
								[`${SEARCH_TYPE_PROP}`]: searchType,
								[`${SEARCH_KEYWORD}`]: form.getFieldValue(SEARCH_INPUT_PROP),
							}).toString()
					  )
			)
		);

	const keywordInput = useSearchKeyword(
		{
			className: "w-100 m-0",
			initialValue: searchParams.get("keywords") || "",
			...searchProps,
		},
		{ autoFocus: true }
	);

	const defaultLocationOptions = [
		{
			value: SEARCH_DEFAULT_LOCATION[`${ADDRESS_PROP}`],
		},
	];

	const address = useAddress({
		itemProps: { label: "", style: { width: "50%" }, ...addressProps },
		showLabel: false,
		options: defaultLocationOptions,
	});

	const tagItems = () => [
		(props = {}) => (
			<BusinessBadge
				type="tag"
				active={searchType === SEARCH_BUSINESS}
				onClick={() => setSearchType(SEARCH_BUSINESS)}
				{...props}
			/>
		),
		(props = {}) => (
			<DealBadge
				type="tag"
				active={searchType === SEARCH_DEAL}
				onClick={() => setSearchType(SEARCH_DEAL)}
				{...props}
			/>
		),
		(props = {}) => (
			<JobBadge
				type="tag"
				active={searchType === SEARCH_JOB}
				onClick={() => setSearchType(SEARCH_JOB)}
				{...props}
			/>
		),
		(props = {}) => (
			<HousingBadge
				type="tag"
				active={searchType === SEARCH_HOUSING}
				onClick={() => setSearchType(SEARCH_HOUSING)}
				{...props}
			/>
		),
		(props = {}) => (
			<MarketplaceBadge
				type="tag"
				active={searchType === SEARCH_MARKETPLACE}
				onClick={() => setSearchType(SEARCH_MARKETPLACE)}
				{...props}
			/>
		),
	];

	const onEnterSearch = (e) => {
		if (e.keyCode === 13) {
			onSearch();
		}
	};

	const app = (
		<Form
			form={form}
			id="search-off-canvas"
			autoComplete="off"
			initialValues={{
				[ADDRESS_PROP]:
					fetchStoredLocation()?.[`${ADDRESS_PROP}`] ||
					SEARCH_DEFAULT_LOCATION[`${ADDRESS_PROP}`],
				// [LOCATION_OBJ]: fetchStoredLocation(),
			}}
			onKeyDown={onEnterSearch}
			{...formProps}
		>
			<Stack
				direction={direction === "horizontal" ? "horizontal" : "vertical"}
				gap={gap}
			>
				{keywordInput}
				{address}
				<Divider className="text-muted m-0">Choose category to search </Divider>
				<Space direction="horizontal " wrap size={20} className="mt-2 mb-4">
					{tagItems().map((tag, idx) => (
						<React.Fragment key={idx}>
							{tag({
								style: {
									padding: "1rem !important",
								},
							})}
						</React.Fragment>
					))}
				</Space>

				<Form.Item className="ms-auto m-0" {...itemProps}>
					<Button
						className="form-submit-btn"
						type="danger"
						onClick={onSearch}
						{...buttonProps}
						disabled={searching}
						size="large"
					>
						Search
					</Button>
				</Form.Item>

				{showRecentSearch && (
					<>
						<List
							header={
								<Row justify="space-between" align="middle">
									<Col>
										<div className="tedkvn-center-left">Recent Search </div>
									</Col>
									<Col>
										<Button type="link" onClick={clearRecentSearch} key={0}>
											Clear all
										</Button>
									</Col>
								</Row>
							}
							itemLayout="horizontal"
							dataSource={fetchRecentSearch()}
							renderItem={(item) => (
								<List.Item style={{ borderBottom: "1px solid wheat" }}>
									<List.Item.Meta
										title={
											<Button
												type="link"
												className="m-0 p-0"
												// onClick={() => }
											>
												{item.title}
											</Button>
										}
									/>
									<div className="tedkvn-center h-100 px-2">
										<CloseOutlined
											onClick={() => clearRecentSearch(false, item.idx)}
										/>
									</div>
								</List.Item>
							)}
						/>
					</>
				)}
			</Stack>
		</Form>
	);

	return app;
}

export default Search;
