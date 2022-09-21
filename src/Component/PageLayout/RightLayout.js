import { Button, Card, Image, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as asset from "../../Assest/Asset";
import { IMAGE_BLUR_THAINOW } from "../../Util/ConstVar";

function RightLayout() {
	const navigate = useNavigate();

	const app = (
		<Stack
			id="RightLayout"
			direction="vertical"
			className="px-4 py-3 w-100"
			gap={4}
		>
			<Button
				type="outline-primary"
				block
				onClick={() => navigate("/register")}
			>
				Register ThaiNow Account
			</Button>

			<Card className="w-100 text-center" bodyStyle={{ paddingTop: 0 }}>
				<Space direction="vertical" className="w-100" size={15}>
					<Space direction="vertical" className="w-100 tedkvn-center">
						{" "}
						<Image
							src={`https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fconfig%2Fimg-avatar-guest.png?alt=media&token=fba2745b-46fb-44ea-aa65-dcb6e008cccd`}
							width={100}
							placeholder={
								<Image
									preview={false}
									src={asset.images[`${IMAGE_BLUR_THAINOW}`]}
									width={100}
									className="fluid"
								/>
							}
						/>
						<Meta title="Hi Welcome" description="ThaiNow" />
					</Space>
					<Button type="outline-primary" block>
						Sign In
					</Button>
				</Space>
			</Card>
		</Stack>
	);
	return app;
}

export default RightLayout;
