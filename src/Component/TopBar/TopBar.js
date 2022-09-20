import { Image } from "antd";
import { Button, Navbar, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";

function TopBar({ keywords = "" }) {
	const navigate = useNavigate();

	const app = (
		<Stack direction="horizontal" className="mx-4 mx-lg-5 w-100" gap={4}>
			<Navbar.Brand>
				<Image
					width={45}
					src="https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fconfig%2Fimg-logo-round.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef"
					preview={false}
					onClick={() => navigate("/")}
				/>
			</Navbar.Brand>
			<div className="ms-auto w-100 mx-5 ">
				<Search defaultKeywords={keywords} direction="horizontal" />
			</div>

			<Button variant="outline-danger">Reset</Button>
		</Stack>
	);

	return app;
}

export default TopBar;
