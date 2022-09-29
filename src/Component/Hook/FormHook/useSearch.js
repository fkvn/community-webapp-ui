import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { SEARCH_KEYWORD } from "../../../Util/ConstVar";

const useSearch = (itemProps = {}, inputProps = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: SEARCH_KEYWORD,
			className: "m-0",
			...itemProps,
		},
		{
			allowClear: {
				clearIcon: <CloseCircleOutlined />,
			},
			placeholder: "Hi there, what are you looking for today?",
			prefix: <SearchOutlined className="mr-2" />,
			...inputProps,
		}
	);

export default useSearch;
