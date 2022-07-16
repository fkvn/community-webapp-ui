import FormContainer from "../../Container/FormContainer/FormContainer";
import UserSignupFormBody from "../Form/FormLayout/UserSignupFormBody";

function UserSignup({ stepHandlers = [], onSelectVerifyMethod = () => {} }) {
	const id = "userSignup";

	const FormBody = {
		id: id,
		FormComponent: UserSignupFormBody,
		onSelectVerifyMethod: onSelectVerifyMethod,
	};

	const app = FormContainer({
		id: id,
		body: FormBody,
		stepHandlers: stepHandlers,
	});

	return app;
}

export default UserSignup;
