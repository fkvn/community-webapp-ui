import { Button, Form } from "antd";
import { Stack } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { findCompany } from "../../Axios/axiosPromise";
import { patchLocationInfoPromise } from "../../redux-store/dispatchPromise";
import {
	ADDRESS_PROP,
	LOCATION_OBJ,
	PLACEID_PROP,
	SEARCH_BUSINESS,
	SEARCH_DEFAULT_LOCATION,
	SEARCH_KEYWORD,
} from "../../Util/ConstVar";
import useAddress from "../Hook/FormHook/useAddress";
import useSearch from "../Hook/FormHook/useSearch";
import useLocation from "../Hook/useLocation";
import { loadingMessage, successMessage } from "../Hook/useMessage";

function Search({ direction = "", gap = 4 }) {
	const navigate = useNavigate();

	const [form] = Form.useForm();

	const [searchParams] = useSearchParams();

	const keywords = searchParams.get("keywords") || "";

	const searchType = searchParams.get("type") || SEARCH_BUSINESS;

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

	const onSearch = () =>
		dispatchSearch(searchType).then(() =>
			successMessage(`done`, 1, { className: "d-none" }).then(() =>
				navigate(
					`/search?type=${searchType}&keywords=${form.getFieldValue(
						SEARCH_KEYWORD
					)}`
				)
			)
		);

	const keyword = useSearch({
		className: "w-100 m-0",
		initialValue: keywords,
	});

	const defaultOptions = [
		{
			value: SEARCH_DEFAULT_LOCATION[`${ADDRESS_PROP}`],
		},
	];

	const address = useAddress(
		{ style: { width: "50%" } },
		{},
		false,
		"",
		defaultOptions
	);

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
		>
			<Stack
				direction={direction === "horizontal" ? "horizontal" : "vertical"}
				gap={gap}
			>
				{keyword}
				{address}
				<Form.Item className="ms-auto m-0">
					<Button type="danger" onClick={onSearch}>
						Search
					</Button>
				</Form.Item>
			</Stack>
		</Form>
	);

	return app;
}

export default Search;
