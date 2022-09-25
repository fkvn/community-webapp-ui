import { Button, Card, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { guestAvatar } from "../../Assest/Asset";
import { THAINOW_PROFILE_OBJ } from "../../Util/ConstVar";
import { emptyProject } from "../../Util/Util";
import useImage from "../Hook/useImage";

function RightLayout() {
	const navigate = useNavigate();
	const { image } = useImage();

	const profile = useSelector(
		(state) => state.thainowReducer[`${THAINOW_PROFILE_OBJ}`] || {}
	);

	const { picture, name, description } = emptyProject(profile)
		? { picture: guestAvatar, name: "Hi Welcome", description: "ThaiNow" }
		: { ...profile.info, description: "" };

	const app = (
		<Stack
			id="RightLayout"
			direction="vertical"
			className="px-4 py-3 w-100"
			gap={4}
		>
			{emptyProject(profile) && (
				<Button
					type="default"
					className="p-2  fw-bold border-danger"
					block
					onClick={() => navigate("/register")}
				>
					Register ThaiNow Account
				</Button>
			)}

			<Card className="w-100 text-center" bodyStyle={{ paddingTop: 0 }}>
				<Space direction="vertical" className="w-100" size={15}>
					<Space direction="vertical" className="w-100 my-3 tedkvn-center">
						{image({
							src: picture,
							width: 100,
							className: "rounded-circle my-3",
						})}
						<Meta title={name} description={description} />
					</Space>
					<Button type="primary" block>
						Sign In
					</Button>
				</Space>
			</Card>
		</Stack>
	);
	return app;
}

export default RightLayout;
