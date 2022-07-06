import { useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../../Container/FormContainer/FormContainer";
import * as constVar from "../../Util/ConstVar";
import FormHeader from "../Form/FormLayout/FormHeader";
import UserSignupFormBody from "../Form/FormLayout/UserSignupFormBody";

function UserSignup({ stepHandlers = [], onSelectVerifyMethod = () => {} }) {
	const id = "userSignup";

	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const onCloseHandler = () => {
		sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ);
		navigate(continueURL, { replace: true });
	};

	const formHeader = (
		<FormHeader id={id} onClose={onCloseHandler} className=" w-100 bg-white" />
	);

	const FormBody = {
		FormComponent: UserSignupFormBody,
		id: id,
		continueURL: continueURL,
		onSelectVerifyMethod: onSelectVerifyMethod,
	};

	const app = FormContainer(id, formHeader, FormBody, stepHandlers);

	return app;
}

export default UserSignup;
