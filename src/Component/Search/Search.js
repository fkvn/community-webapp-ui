import { CloseCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Form, Input } from "antd";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patchLocationInfoPromise } from "../../redux-store/dispatchPromise";
import { ADDRESS_PROP, LOCATION_OBJ, PLACEID_PROP } from "../../Util/ConstVar";
import useGoogleAutoComplete from "../AutoComplete/useGoogleAutoComplete";

function Search({ direction = "vertical", gap = 4, defaultKeywords = "" }) {
	const [form] = Form.useForm();
	const keywords = Form.useWatch("keywords", form);
	const navigate = useNavigate();

	const [searchType] = useState("companies");

	const onFinish = () => {
		navigate(`/search?type=${searchType}&keywords=${keywords}&submit=${true}`);
	};

	const location = useSelector(
		(state) => state.thainowReducer[`${LOCATION_OBJ}`] || {}
	);

	const { fetchPredictions } = useGoogleAutoComplete();

	const [locationOptions, setLocationOptions] = useState([]);

	const onSearch = (searchText = "") => {
		fetchPredictions(searchText).then(({ predictions }) => {
			setLocationOptions(
				predictions.map((prediction) => {
					return {
						label: prediction.description,
						value: JSON.stringify(prediction),
					};
				})
			);
		});
	};

	const onSelect = (data) => {
		console.log(data);

		const location = {
			[`${ADDRESS_PROP}`]: JSON.parse(data)?.description || "",
			[`${PLACEID_PROP}`]: JSON.parse(data)?.place_id || "",
		};

		patchLocationInfoPromise(location, true).then(() =>
			sessionStorage.setItem([`${LOCATION_OBJ}`], JSON.stringify(location))
		);
	};

	const onChange = (data) => {
		patchLocationInfoPromise({ [`${ADDRESS_PROP}`]: data }, true).then(() =>
			sessionStorage.setItem(
				[`${LOCATION_OBJ}`],
				JSON.stringify({
					[`${ADDRESS_PROP}`]: data,
				})
			)
		);
	};

	const onBlur = () => {
		let address = location?.[`${ADDRESS_PROP}`] || "";
		let placeid = location?.[`${PLACEID_PROP}`] || "";

		const validLocation = address === "" || (address !== "" && placeid !== "");

		if (!validLocation) {
			sessionStorage.removeItem([`${LOCATION_OBJ}`]);
			patchLocationInfoPromise({}, true);
		}
	};

	const app = (
		<Form form={form} autoComplete="off" onFinish={onFinish}>
			<Stack direction={direction} gap={gap}>
				<Form.Item
					name="keywords"
					className="w-100 m-0"
					initialValue={defaultKeywords}
				>
					<Input placeholder="Hi there, what are you looking for today?" />
				</Form.Item>
				<AutoComplete
					value={location[`${ADDRESS_PROP}`]}
					style={{ width: "50%" }}
					defaultActiveFirstOption={true}
					children={
						<Input
							allowClear={{
								clearIcon: <CloseCircleOutlined />,
							}}
						/>
					}
					options={locationOptions}
					onSelect={onSelect}
					onSearch={onSearch}
					onChange={onChange}
					onBlur={onBlur}
					placeholder="street, city, zipcode, or state"
				></AutoComplete>
				<Form.Item className="ms-auto m-0">
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Stack>
		</Form>
	);

	return app;
}

export default Search;
