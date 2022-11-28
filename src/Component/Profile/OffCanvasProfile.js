import { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import RightLayout from "../PageLayout/RightLayout";

function OffCanvasProfile({ show = false, onHide = () => {} }) {
	const location = useLocation();

	useEffect(() => {
		onHide();
	}, [location]);

	const app = (
		<Offcanvas
			title="User Setting"
			placement="end"
			onHide={onHide}
			show={show}
			style={{ maxWidth: "100vw" }}
			className="p-0 m-0 border-0 "
		>
			<Offcanvas.Header closeButton className="border-0 px-4 bg-white">
				<Offcanvas.Title>User Setting</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="p-0 m-0">
				<RightLayout
					style={{ position: "relative", height: "100%" }}
					showSetting={true}
				/>
			</Offcanvas.Body>
		</Offcanvas>
	);
	return app;
}

export default OffCanvasProfile;
