import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import BackButton from "../Button/BackButton";
import BusinessSignupForm from "../Form/BusinessSignupForm";

function BusinessSignup({
	sessionStorageObj = "thainow.classic.signup.info",
	submitErrorHandler = () => {},
	industryList = [],
	positionList = [],
}) {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const app = (
		<Container fluid className={` vh-100 tedkvn-center `}>
			<Row className={` tedkvn-center `}>
				<Col
					xs={12}
					className={` overflow-auto border`}
					id="classicSignupFormCol"
					style={{
						maxHeight: "80vh",
					}}
				>
					<BackButton
						backHref={`/signup/${continueParams}`}
						title="Type of Account"
					/>
					<Link to="/" className="text-center m-5 d-block">
						<Image src={thainowLogo} width="100" />
					</Link>

					<BusinessSignupForm
						sessionStorageObj={sessionStorageObj}
						industryList={industryList}
						submitErrorHandler={submitErrorHandler}
						positionList={positionList}
					/>
				</Col>
			</Row>
		</Container>
	);
	return app;
}

export default BusinessSignup;
