import { useNavigate } from "react-router-dom";
import { image404 } from "../../Asset/Asset";
import FormPageHeader from "../Layout/MainLayout/Header/FormPageHeader";

function NotFound() {
	const navigate = useNavigate();

	const App = () => (
		<>
			<FormPageHeader />
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
	return <App />;
}

export default NotFound;
