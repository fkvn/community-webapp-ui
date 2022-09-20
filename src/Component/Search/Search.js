import { AutoComplete, Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOCATION_OBJ } from "../../Util/ConstVar";
import useGoogleAutoComplete from "../AutoComplete/useGoogleAutoComplete";

function Search({ direction = "vertical", gap = 4, defaultKeywords = "" }) {
	const [form] = Form.useForm();
	const keywords = Form.useWatch("keywords", form);
	const navigate = useNavigate();

	const onFinish = () => {
		navigate("/search?keywords=" + keywords);
	};

	const location = useSelector(
		(state) => state.thainowReducer[`${LOCATION_OBJ}`] || {}
	);

	const { fetchPredictions } = useGoogleAutoComplete();

	const [locationOptions, setLocationOptions] = useState([]);

	const [searchLocation, setSearchLocation] = useState("");

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

	useEffect(() => {
		if (searchLocation !== "") {
		}
	}, [searchLocation]);

	const onSelect = (data, option) => {
		setSearchLocation(option.label);
		console.log(JSON.parse(data));
	};

	const onChange = (data) => {
		setSearchLocation(data);
	};

	const app = (
		<Form form={form} autoComplete="off" onFinish={onFinish}>
			<Stack direction={direction} gap={gap}>
				<Form.Item
					name="keywords"
					className="w-100 m-0"
					initialValue={defaultKeywords}
				>
					<Input />
				</Form.Item>
				<AutoComplete
					value={searchLocation}
					style={{ width: "50%" }}
					options={locationOptions}
					onSelect={onSelect}
					onSearch={onSearch}
					onChange={onChange}
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
