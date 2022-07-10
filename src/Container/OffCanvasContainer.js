import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as asset from "../Assest/Asset";
import ImageFrame from "../Component/ImageFrame/ImageFrame";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";

function OffCanvasContainer({
	onClose = () => {},
	width = "100",
	className = "",
	placement = "end",
	scroll = true,
	backdrop = false,
	children = {},
}) {
	const offCanvas = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_OFF_CANVAS_OBJ}`] || {}
	);

	const onCloseHanlder = () => {
		dispatchPromise.patchOffCanvasInfo({
			[`${constVar.SHOW_OFF_CANVAS}`]: false,
		});
		onClose();
	};

	const app = (
		<Offcanvas
			show={offCanvas[`${constVar.SHOW_OFF_CANVAS}`]}
			onHide={onCloseHanlder}
			className={`w-${width} ${className}`}
			placement={placement}
			scroll={scroll}
			backdrop={backdrop}
			style={{ backgroundColor: "#f8f8f8" }}
		>
			<Offcanvas.Header closeButton className="bg-white">
				<Offcanvas.Title>
					<ImageFrame
						src={asset.images[`${constVar.IMAGE_THAINOW_LOGO}`]}
						frameWidth="3rem"
					/>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>{children}</Offcanvas.Body>
		</Offcanvas>
	);

	return app;
}

export default OffCanvasContainer;
