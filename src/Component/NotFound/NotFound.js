import { useNavigate } from "react-router-dom";
import { image404 } from "../../Assest/Asset";
import TopPageHeader from "../Layout/Header/TopPageHeader";

function NotFound() {
	const navigate = useNavigate();

	const app = (
		<>
			<TopPageHeader />
			<img
				src={image404}
				alt="not found"
				className=" w-100"
				style={{
					objectFit: "cover",
					// 61px is the height of the header, minus footer if needed
					maxHeight: "calc(100vh - 70px)",
				}}
				onClick={() => navigate("/")}
			/>
		</>
	);
	return app;
}

export default NotFound;
