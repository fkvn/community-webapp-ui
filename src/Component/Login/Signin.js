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

	const FormBody = {
		id: id,
		FormComponent: UserSigninFormBody,
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
