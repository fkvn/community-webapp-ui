import { useSearchParams } from "react-router-dom";
import FormContainer from "../../Container/FormContainer/FormContainer";
import * as constVar from "../../Util/ConstVar";
import UserSigninFormBody from "../Form/FormLayout/UserSigninFormBody";

function Signin({
	stepHandlers = [1],
	onClose = () => {},
	signinMethod = constVar.EMAIL_PROP,
	onSelectSigninMethod = () => {},
}) {
	const id = "userSignin";

	const [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const FormBody = {
		FormComponent: UserSigninFormBody,
		id: id,
		continueURL: continueURL,
		signinMethod: signinMethod,
		onSelectSigninMethod: onSelectSigninMethod,
	};

	const app = FormContainer({
		id: id,
		body: FormBody,
		stepHandlers: stepHandlers,
		onClose: onClose,
	});

	return app;
}

export default Signin;
