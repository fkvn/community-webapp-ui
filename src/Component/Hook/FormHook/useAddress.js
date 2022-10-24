import Icon, { CloseCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useState } from "react";
import { iconLocationBlack } from "../../../Assest/Asset";
import {
	ADDRESS_PROP,
	LOCATION_OBJ,
	PLACEID_PROP,
} from "../../../Util/ConstVar";
import useGoogleAutoComplete from "../useGoogleAutoComplete";
import useAutocomplete from "./useAutocomplete";

function useAddress({
	itemProps = {},
	inputProps = {},
	required = true,
	defaultLocation = {
		[`${ADDRESS_PROP}`]: "",
		[`${PLACEID_PROP}`]: "",
	},
	options = [],
	errorMessage = "Please enter a valid address",
}) {
	const { fetchPredictions } = useGoogleAutoComplete();
	const [address, setAddress] = useState({
		location: defaultLocation,
		predictions: options || [],
	});

	const autoComplete = useAutocomplete;

	const onSearch = (searchText = "") => {
		console.log(searchText);
		if (searchText !== "") {
			fetchPredictions(searchText).then(({ predictions }) => {
				setAddress({
					...address,
					predictions: predictions.map((prediction) => {
						return {
							label: prediction.description,
							value: prediction.description,
							location: prediction,
						};
					}),
				});
			});
		}
	};

	const onSelect = (_, option = {}) => {
		const location = {
			[`${ADDRESS_PROP}`]: option?.location?.description || "",
			[`${PLACEID_PROP}`]: option?.location?.place_id || "",
		};

		setAddress({ location: { ...location } });
	};

	const onBlur = () => {
		let addressValue = address.location?.[`${ADDRESS_PROP}`] || "";
		let placeidValue = address.location?.[`${PLACEID_PROP}`] || "";

		const validLocation =
			addressValue === "" || (addressValue !== "" && placeidValue !== "");

		if (!validLocation) {
			setAddress({
				value: "",
			});
		}
	};

	const addressAutoComplete = (
		{ rules = [], ...itemProps },
		{ prefix = true, ...inputProps },
		required = true,
		defaultLocation = {},
		options = [],
		errorMessage = "Please enter a valid address"
	) => (
		<>
			{/* this is to collect custom location object */}
			<Form.Item
				name={LOCATION_OBJ}
				initialValue={defaultLocation}
				hidden
				// className="d-none"
			>
				<Input value={address.location} />
			</Form.Item>

			{autoComplete(
				{
					name: ADDRESS_PROP,
					initialValue: defaultLocation?.[`${ADDRESS_PROP}`],
					rules: [
						({ setFieldValue }) => ({
							validator(_, value) {
								const location = value === "" ? {} : address?.location || {};
								setFieldValue(LOCATION_OBJ, location);

								if (required && value === "") return Promise.reject();
								else return Promise.resolve();
							},
						}),
						...rules,
					],
					...itemProps,
					...(itemProps?.label && {
						label: `${itemProps.label} ${required ? "" : "(Optional)"}`,
					}),
				},
				{
					children: (
						<Input
							className="rounded-0"
							allowClear={{
								clearIcon: <CloseCircleOutlined />,
							}}
							{...(prefix && {
								prefix: (
									<Icon
										component={() => iconLocationBlack()}
										className="mr-2 "
									/>
								),
							})}
						/>
					),
					options: address.predictions,
					onSelect: onSelect,
					onSearch: onSearch,
					onBlur: onBlur,
					placeholder: "street, city, zipcode, or state",
					...inputProps,
				},
				options,
				required,
				errorMessage
			)}
		</>
	);

	return addressAutoComplete(
		itemProps,
		inputProps,
		required,
		defaultLocation,
		options,
		errorMessage
	);
}

export default useAddress;
