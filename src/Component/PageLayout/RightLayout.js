import { Button, Card, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { imageGuestAvatar } from "../../Assest/Asset";
import { isObjectEmpty } from "../../Util/Util";
import useImage from "../Hook/useImage";
import useProfile from "../Hook/useProfile";

function RightLayout({ style = {} }) {
	const navigate = useNavigate();
	const { image } = useImage();

	const { profile } = useProfile();

	const { picture, name, description } = isObjectEmpty(profile)
		? { picture: imageGuestAvatar, name: "Hi Welcome", description: "ThaiNow" }
		: { ...profile.info, description: "" };

	const app = (
		<Stack
			id="RightLayout"
			direction="vertical"
			className="px-4 py-3 w-100"
			style={style}
			gap={4}
		>
			{isObjectEmpty(profile) && (
				<Button
					type="default"
					className="p-2  fw-bold border-danger"
					block
					onClick={() => navigate("/register/user")}
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
					{isObjectEmpty(profile) && (
						<Button type="primary" block onClick={() => navigate("/signin")}>
							Sign In
						</Button>
					)}
				</Space>
			</Card>
		</Stack>
	);
	return app;
}

export default RightLayout;
