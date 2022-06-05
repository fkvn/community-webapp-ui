import React from "react";
import { Button, CloseButton, Image, Navbar } from "react-bootstrap";
import thainowlogo from "../../Assest/Image/Brand/thainowLogo.png";

function FormHeader({ title = "", navButtons = [], withCloseButon = true }) {
	const app = (
		<Navbar expand={true} bg="light" variant="light">
			<Navbar.Brand href="#home" className="tedkvn-center">
				<Image
					src={thainowlogo}
					fluid
					width="50"
					height="50"
					alt="ThaiNow logo"
					style={{ color: "transparent" }}
				/>
			</Navbar.Brand>
			{title}

			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				{navButtons.map((btn, idx) => (
					<Button
						key={idx}
						className="mx-2 py-1 px-2 rounded"
						type={btn.type}
						variant={btn.variant}
						{...(btn.type !== "submit" && { onClick: btn.onClick })}
					>
						{btn.title}
					</Button>
				))}

				{withCloseButon && <CloseButton className="p-2" />}
			</Navbar.Collapse>
		</Navbar>
	);
	return app;
}

export default FormHeader;
