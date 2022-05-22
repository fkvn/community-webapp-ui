import React from "react";
import { Col } from "react-bootstrap";
import { Image, Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";

import successIcon from "../../Assest/Image/Icon/success-icon.png";
import LoadingButton from "../Button/LoadingButton";

function SignupSuccess({ loginHanlder = () => {} }) {
	const app = (
		<Container fluid className={`mt-5 vh-100 tedkvn-center `}>
			<Row className={` tedkvn-center `}>
				<Col
					xs={12}
					className={` overflow-hidden border text-center`}
					id="signupFormCol"
				>
					<div className="text-center mb-4">
						<Image src={successIcon} width="100" />
					</div>
					<div className="fs-4">Welcome to ThaiNow!</div>
					<div className="my-2 fs-5 text-info">
						You have signed up successfully.
					</div>
					<div className="mt-5">
						<LoadingButton
							size="lg"
							className="rounded-pill mt-2 px-4"
							title="Login and Continue"
							onClick={loginHanlder}
						/>
					</div>
					<div className="mt-4">
						<Button
							variant="link"
							href="/"
							size="md"
							className="rounded-pill text-secondary mt-2 px-4"
						>
							Back To Home
						</Button>
						<Button
							variant="link"
							href="/signup"
							size="md"
							className="rounded-pill mt-2 px-4"
						>
							Register New Account
						</Button>
					</div>
					<div></div>
				</Col>
			</Row>
		</Container>
	);
	return app;
}

export default SignupSuccess;
