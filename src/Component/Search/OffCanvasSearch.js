import { Offcanvas } from "react-bootstrap";
import Search from "./Search";

function OffCanvasSearch({ show = false, onHide = () => {} }) {
	const app = (
		<Offcanvas
			id="offcanvas-search"
			show={show}
			onHide={onHide}
			className="p-0 m-0 border-0 "
			scroll={true}
			backdrop={true}
			placement="end"
		>
			<Offcanvas.Header closeButton className="border-0 bg-white">
				<Offcanvas.Title>Search for Thai</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Search
					formProps={{
						className: "m-4",
					}}
					addressProps={{ style: { width: "100%" } }}
					itemProps={{ className: "w-100" }}
					buttonProps={{ block: true }}
					showRecentSearch={true}
					hideOffCanvas={onHide}
				/>
			</Offcanvas.Body>
		</Offcanvas>
	);
	return app;
}

export default OffCanvasSearch;
