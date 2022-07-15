import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import successIcon from "../../Assest/Image/Icon/success-icon.png";
import LoadingButton from "../Button/LoadingButton";

function UserSignupSuccess({ username = "" }) {
	const navigate = useNavigate();

	const location = useLocation();

	const continueURL = location?.state?.continue || "/";

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
					<div className="fs-4">
						{username ? "Hi, " + username : "Welcome come to ThaiNow!"}
					</div>
					<div className="my-2 fs-5 text-info">
						Thanks for signing up to ThaiNow community, your account has been
						successfully created!
					</div>
					<div className="mt-5">
						<LoadingButton
							size="lg"
							className="rounded-pill mt-2 px-4"
							title="Login and Continue Explore"
							onClick={() => {
								navigate("/signin", {
									state: {
										loginDirect: true,
										continue: continueURL,
									},
								});
							}}
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
							Create Another Account
						</Button>
					</div>
					<div></div>
				</Col>
			</Row>
		</Container>
	);
	return app;
}

export default UserSignupSuccess;
