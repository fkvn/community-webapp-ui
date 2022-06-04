import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

function FormHeader({ title = "", navButtons = [] }) {
	const app = (
		<Navbar expand={true} bg="light" variant="light">
			<Container>
				<Navbar.Brand href="#home" className="tedkvn-center">
					Create Account
				</Navbar.Brand>
			</Container>

			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Button variant="secondary" className="border-0 mx-2 ">
					Cancel
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
	return app;
}

export default FormHeader;
