import { useNavigate } from "react-router-dom";
import { oops } from "../../Asset/Asset";

function Oops() {
	const navigate = useNavigate();

	const App = () => (
		<>
			<img
				src={oops}
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

export default Oops;
