import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";

function SignoutContainer() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);

	const signoutHandler = () => {
		localStorage.removeItem(constVar.THAINOW_USER_OBJ);
		localStorage.removeItem(constVar.THAINOW_PROFILE_OBJ);
		dispatchPromise.patchProfileInfo({}, true);
		navigate("/", { replace: true });
		setIsLoading(false)
	};

	useEffect(() => {
		if (isLoading) signoutHandler();
	}, [isLoading]);

	return <></>;
}

export default SignoutContainer;
