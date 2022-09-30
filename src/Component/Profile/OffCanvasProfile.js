import { Offcanvas } from "react-bootstrap";
import RightLayout from "../PageLayout/RightLayout";

function OffCanvasProfile({ show = false, onHide = () => {} }) {
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
