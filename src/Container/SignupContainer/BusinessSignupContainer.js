import BusinessSignup from "../../Component/Auth/BusinessSignup";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";

import AuthContainer from "../AuthContainer/AuthContainer";

function BusinessSignupContainer() {
	const app = (
		<>
			<AuthContainer
				closeUrl="/"
				continueUrl="/signin"
				successUrl="/register/business"
			>
				<div id="register-form">
					{usePageHeader({})}
					<BusinessSignup />
				</div>
			</AuthContainer>
		</>
	);

	return app;
}

export default BusinessSignupContainer;
