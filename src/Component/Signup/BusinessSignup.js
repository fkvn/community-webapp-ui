import FormContainer from "../../Container/FormContainer/FormContainer";
import BusinessSignupFormBody from "../Form/FormLayout/BusinessSignupFormBody";

function BusinessSignup({
	stepHandlers = [],
	onSelectVerifyMethod = () => {},
}) {
	const id = "businessSignup";

	const FormBody = {
		id: id,
		FormComponent: BusinessSignupFormBody,
		onSelectVerifyMethod: onSelectVerifyMethod,
	};

	const app = FormContainer({
		id: "businesssignup",
		body: FormBody,
		stepHandlers: stepHandlers,
	});

	return app;
}

export default BusinessSignup;
