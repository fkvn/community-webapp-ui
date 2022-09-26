import React from "react";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../../Assest/Image/404.png";

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="">
			<img
				src={PageNotFound}
				alt="not found"
				className="fluid vw-100 vh-100 "
				onClick={() => navigate("/")}
			/>
		</div>
	);
}
export default NotFoundPage;
