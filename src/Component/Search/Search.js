import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Form, List, Space } from "antd";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { patchLocationInfoPromise } from "../../redux-store/dispatchPromise";
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
import useCurrentLocation from "../Hook/useCurrentLocation";
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

	const { getStoredLocation } = useCurrentLocation();

	const [recentSearch, setRecentSearch] = useState(
		JSON.parse(sessionStorage.getItem(SEARCH_OBJ)) || []
	);

	const [searching, setSearching] = useState(false);

	const getLocation = () => {
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

		patchLocationInfoPromise(location, true).then(() => {
			sessionStorage.setItem([`${LOCATION_OBJ}`], JSON.stringify(location));
			return Promise.resolve();
		});

		return location;
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
			routeLocation?.pathname === "/search"
				? dispatchSearch(searchType, {
						[`${SEARCH_KEYWORD}`]: form.getFieldValue(SEARCH_INPUT_PROP),
						...getLocation(),
				  })
				: Promise.resolve(
						new URLSearchParams({
							[`${SEARCH_TYPE_PROP}`]: searchType,
							[`${SEARCH_KEYWORD}`]: form.getFieldValue(SEARCH_INPUT_PROP),
							...getLocation(),
						}).toString()
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

	const address = useAddress(
		{ style: { width: "50%" }, ...addressProps },
		{},
		false,
		"",
		defaultLocationOptions
	);

	const tagItems = [
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
			autoComplete="off"
			initialValues={{
				[ADDRESS_PROP]:
					getStoredLocation()?.[`${ADDRESS_PROP}`] ||
					SEARCH_DEFAULT_LOCATION[`${ADDRESS_PROP}`],
				[LOCATION_OBJ]: getStoredLocation(),
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
				<Space direction="horizontal " wrap gap={3}>
					{tagItems.map((tag, idx) => (
						<React.Fragment key={idx}>{tag()}</React.Fragment>
					))}
				</Space>

				<Form.Item className="ms-auto m-0" {...itemProps}>
					<Button
						type="danger"
						onClick={onSearch}
						{...buttonProps}
						disabled={searching}
					>
						Search
					</Button>
				</Form.Item>

				{showRecentSearch && (
					<>
						<List
							header={
								<div className="tedkvn-center-left">
									Recent Search{" "}
									<Button type="link" onClick={clearRecentSearch}>
										Clear all
									</Button>{" "}
								</div>
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
