import React from "react";
import { Col, Row } from "react-bootstrap";

function LandingPageBody({ formatFrames = true }) {
	const banner = (
		<div>
			<h1>CONNECTING THAI OVERSEAS</h1>
		</div>
	);

	const app = (
		<Row className="bg-primary">
			<Col
				id="landing-page-banner-col"
				xs={12}
				className={`${
					formatFrames ? "bg-success" : ""
				} p-0 tedkvn-center text-white py-5`}
			>
				{banner}
			</Col>
		</Row>
	);

	return app;
}

export default LandingPageBody;
