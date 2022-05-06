import React from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import LandingPageBody from "./LandingPageBody";
import LandingPageHeader from "./LandingPageHeader";

function LandingPage({ user }) {
	const header = <LandingPageHeader user={user} />;

	const body = <LandingPageBody user={user} />;

	const app = (
		<Container fluid>
			<Row className="px-5">
				<Col xs={12}>{header}</Col>
			</Row>
			<Row className="px-0">
				<Col xs={12}>{body}</Col>
			</Row>
		</Container>
	);

	return app;
}

export default LandingPage;
