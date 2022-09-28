import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import AuthContainer from "../AuthContainer/AuthContainer";

function BusinessSignupContainer() {
	const app = (
		<>
			<AuthContainer returnUrl="/signin" continueUrl="/register/business">
				<div id="register-form">
					{usePageHeader()}
					<BusinessSignup />
				</div>
			</AuthContainer>
		</>
	);

	return app;
}

export default BusinessSignupContainer;
