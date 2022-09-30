import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Form, List, Space, Tag } from "antd";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import global from "../../Assest/Style/scss/base/_global.scss";
import { findCompany } from "../../Axios/axiosPromise";
import { patchLocationInfoPromise } from "../../redux-store/dispatchPromise";
import {
	ADDRESS_PROP,
	LOCATION_OBJ,
	PLACEID_PROP,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_DEFAULT_LOCATION,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_OBJ,
} from "../../Util/ConstVar";
import useAddress from "../Hook/FormHook/useAddress";
import useSearch from "../Hook/FormHook/useSearch";
import useLocation from "../Hook/useLocation";
import { loadingMessage, successMessage } from "../Hook/useMessage";

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

	const keywords = searchParams.get("keywords") || "";

	const [searchType, setSearchType] = useState(
		searchParams.get("type") || SEARCH_BUSINESS
	);

	const { getStoredLocation } = useLocation();

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

	const dispatchSearch = async (type = "") => {
		loadingMessage(`Searching for ${searchType} in the area ...`, 0, {
			className: "",
			style: { marginTop: "8vh" },
		});

		switch (type) {
			case SEARCH_BUSINESS:
				return findCompany({
					keywords: form.getFieldValue(SEARCH_KEYWORD),
					...getLocation(),
				});
			default:
				return Promise.reject();
		}
	};

	const [recentSearch, setRecentSearch] = useState(
		JSON.parse(sessionStorage.getItem(SEARCH_OBJ)) || []
	);

	const addRecentSearch = (keyword = "") => {
		if (keyword !== "") {
			setRecentSearch([...recentSearch, keyword]);
			sessionStorage.setItem(
				SEARCH_OBJ,
				JSON.stringify([...recentSearch, keyword])
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

	const getRecentSearch = () => {
		return recentSearch.map((key, idx) => {
			return { title: key, idx: idx };
		});
	};

	const onSearch = () =>
		dispatchSearch(searchType).then(() => {
			hideOffCanvas();
			successMessage(`done`, 1, { className: "d-none" }).then(() => {
				addRecentSearch(form.getFieldValue(SEARCH_KEYWORD));
				navigate(
					`/search?type=${searchType}&keywords=${form.getFieldValue(
						SEARCH_KEYWORD
					)}`
				);
			});
		});

	const keyword = useSearch({
		className: "w-100 m-0",
		initialValue: keywords,
		...searchProps,
	});

	const defaultOptions = [
		{
			value: SEARCH_DEFAULT_LOCATION[`${ADDRESS_PROP}`],
		},
	];

	const address = useAddress(
		{ style: { width: "50%" }, ...addressProps },
		{},
		false,
		"",
		defaultOptions
	);

	const tagItems = [
		{
			name: SEARCH_BUSINESS,
			title: "Business",
			unCheckedColor: "#9CA3AF",
			color: global.businessColor,
			onClick: () => setSearchType("business"),
		},
		{
			name: SEARCH_DEAL,
			title: "Local Deal",
			unCheckedColor: "#9CA3AF",
			color: global.primaryColor,
		},
		{
			name: SEARCH_JOB,
			title: "Job Hiring",
			unCheckedColor: "#9CA3AF",
			color: global.jobColor,
		},
		{
			name: SEARCH_HOUSING,
			title: "Housing",
			unCheckedColor: "#9CA3AF",
			color: global.housingColor,
		},
		{
			name: SEARCH_MARKETPLACE,
			title: "Marketplace",
			unCheckedColor: "#9CA3AF",
			color: global.marketplaceColor,
		},
	];

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
			{...formProps}
		>
			<Stack
				direction={direction === "horizontal" ? "horizontal" : "vertical"}
				gap={gap}
			>
				{keyword}
				{address}
				<Divider className="text-muted m-0">Choose category to search </Divider>
				<Space direction="horizontal " wrap gap={3}>
					{tagItems.map((tag, idx) => (
						<Button
							type="ghost"
							key={idx}
							className="p-0 m-0 border-0 rounded lh-base"
						>
							<Tag
								color={tag.name === searchType ? tag.color : tag.unCheckedColor}
								onClick={() => setSearchType(tag.name)}
								className="p-1 px-3 m-0 rounded lh-base"
							>
								{tag.title}
							</Tag>
						</Button>
					))}
				</Space>

				<Form.Item className="ms-auto m-0" {...itemProps}>
					<Button type="danger" onClick={onSearch} {...buttonProps}>
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
							dataSource={getRecentSearch()}
							renderItem={(item) => (
								<List.Item style={{ borderBottom: "1px solid wheat" }}>
									<List.Item.Meta
										title={<a href="https://ant.design">{item.title}</a>}
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
