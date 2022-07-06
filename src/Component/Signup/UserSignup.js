import { useSearchParams } from "react-router-dom";
import FormContainer from "../../Container/FormContainer/FormContainer";
import UserSignupFormBody from "../Form/FormLayout/UserSignupFormBody";

function UserSignup({
	stepHandlers = [],
	onClose = () => {},
	onSelectVerifyMethod = () => {},
	onBackHandlerPromise = () => {},
}) {
	const id = "userSignup";

	const [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const FormBody = {
		FormComponent: UserSignupFormBody,
		id: id,
		continueURL: continueURL,
		onSelectVerifyMethod: onSelectVerifyMethod,
	};

	const app = FormContainer({
		id: id,
		body: FormBody,
		stepHandlers: stepHandlers,
		onBackHandlerPromise: onBackHandlerPromise,
		onClose: onClose,
	});

	return app;
}

export default UserSignup;
