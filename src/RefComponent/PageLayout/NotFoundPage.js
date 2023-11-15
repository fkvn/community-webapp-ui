import React from "react";
import { useNavigate } from "react-router-dom";
import { image404 } from "../../Assest/Asset";

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="">
			<img
				src={image404}
				alt="not found"
				className="fluid "
				style={{ maxWidth: "100%", maxHeight: "100%" }}
				onClick={() => navigate("/")}
			/>
		</div>
	);
}
export default NotFoundPage;
