import useFormControl from "../../Component/Hook/useFormControl";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import AuthContainer from "../RouteContainer/AuthContainer";

function BusinessSignupContainer() {
	const { pageHeader } = useFormControl();

	const app = (
		<>
			<AuthContainer returnUrl="/signin" continueUrl="/register/business">
				<div id="register-form">
					{pageHeader()}
					<BusinessSignup />
				</div>
			</AuthContainer>
		</>
	);

	return app;
}

export default BusinessSignupContainer;
