import FormContainer from "../../Container/FormContainer/FormContainer";
import UserSignupFormBody from "../Form/FormLayout/UserSignupFormBody";

function UserSignup({
	stepHandlers = [],
	onClose = () => {},
	onSelectVerifyMethod = () => {},
}) {
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
		onClose: onClose,
	});

	return app;
}

export default UserSignup;
