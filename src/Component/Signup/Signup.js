import React from "react";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import userClassic from "../../Assest/Image/Profile/UserIcon_Classic.png";
import userBusiness from "../../Assest/Image/Profile/UserIcon_Business.png";
import BackButton from "../Button/BackButton";
import { Form } from "react-bootstrap";

function Signup({ formatFrames = false }) {
	const [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const navigate = useNavigate();

	const signupForm = (
		<Row className="mb-5">
			<Col xs={12} className="fs-1 text-center mb-5 fw-bold">
				Register As
			</Col>
			<Col xs={12} md={6} className="tedkvn-center">
				<Card id="signup-classic-card" className="my-4">
					<Card.Img
						variant="top"
						src={userClassic}
						onClick={() => navigate(`/signup/classic${continueParams}`)}
					/>
					<Card.Body className="tedkvn-center py-4">
						<Button
							variant="link"
							className="px-5 rounded-pill text-success shadow-none"
							size="lg"
							href="/signup/classic"
						>
							Personal
						</Button>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={6} className="tedkvn-center">
				<Card
					id="signup-business-card"
					className="my-4"
					onClick={() => navigate("/signup/business")}
					// onClick={() => alert("Coming soon!")}
				>
					<Card.Img
						variant="top"
						src={userBusiness}
						style={{ borderRadius: "2rem 2rem 0 0" }}
					/>
					<Card.Body className="tedkvn-center py-4">
						<Button
							variant="link"
							className="px-5 rounded-pill shadow-none "
							size="lg"
							href="/signup/business"
							// onClick={() => alert("Coming soon!")}
						>
							Business
						</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);

	const LoginOptionPromt = () => (
		<Form.Group className="tedkvn-center mt-3 ">
			Already have an account?
			<Button
				size="md"
				className="p-0 px-2 fs-5 rounded-pill d-inline-block shadow-none"
				variant="link"
				href={"/login" + continueParams}
			>
				Log In
			</Button>
		</Form.Group>
	);

	const app = (
		<Container
			fluid
			className={`${formatFrames ? "bg-success " : ""} mt-5 tedkvn-center `}
		>
			<Row className={`${formatFrames ? "bg-primary" : ""} tedkvn-center `}>
				<Col
					xs={12}
					className={`${
						formatFrames ? "bg-danger " : ""
					}  overflow-hidden border`}
					id="signupFormCol"
				>
					<BackButton />
					<div className="text-center mb-4">
						<Button variant="link" href="/">
							<Image src={thainowLogo} width="100" />
						</Button>
						<LoginOptionPromt />
					</div>
					{signupForm}
				</Col>
			</Row>
		</Container>
	);
	return app;
}

export default Signup;
