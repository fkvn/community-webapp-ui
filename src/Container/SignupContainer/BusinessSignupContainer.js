import BusinessSignup from "../../Component/Auth/BusinessSignup";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
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
