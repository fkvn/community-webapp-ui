import { Form, Radio } from "antd";
import {
	PRIVATE_POST_STATUS_PROP,
	PUBLIC_POST_STATUS_PROP,
	STATUS_PROP,
} from "../../../Util/ConstVar";

function usePostStatus({
	required = true,
	requiredMessage = "Must choose",
} = {}) {
	const app = (
		<Form.Item
			name={STATUS_PROP}
			label="Service Status"
			className="m-0"
			rules={[{ required: required, message: requiredMessage }]}
			shouldUpdate
		>
			<Radio.Group>
				<Radio value={PUBLIC_POST_STATUS_PROP}>Public</Radio>
				<Radio value={PRIVATE_POST_STATUS_PROP}>Only Me</Radio>
			</Radio.Group>
		</Form.Item>
	);
	return app;
}

export default usePostStatus;
