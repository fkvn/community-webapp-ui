import Icon from "@ant-design/icons";
import { Space, Typography } from "antd";
import { isEmptyObject } from "jquery";
import { iconLocationWhite } from "../../Assest/Asset";
import { ADDRESS_PROP } from "../../Util/ConstVar";

function useCurrentLocation() {
	const displayLocation = (
		props = {
			onClick: () => {},
			width: 50,
			containerClassName: "text-white w-100",
			iconStyle: {},
		},
		location = {}
	) =>
		!isEmptyObject(location) && (
			<Space
				direction="horizontal"
				className={props.containerClassName}
				onClick={props.onClick}
			>
				<Icon
					component={() => iconLocationWhite(20)}
					width={props.width}
					className="tedkvn-center"
					style={props.iconStyle}
				/>
				<Typography.Text ellipsis className="text-white">
					{location?.[`${ADDRESS_PROP}`]}
				</Typography.Text>
			</Space>
		);

	return {
		displayLocation,
	};
}

export default useCurrentLocation;
