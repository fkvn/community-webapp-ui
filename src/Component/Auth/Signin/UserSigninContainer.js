import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatString } from "../../../Util/Util";
import usePageHeader from "../../Hook/FormHook/usePageheader";
import useAuth from "../../Hook/useAuth";
import { successMessage } from "../../Hook/useMessage";
import UserSignin from "./UserSignin";

function UserSigninContainer() {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			auth(false)
				.then(() =>
					successMessage("You have already signed in ...").then(() =>
						navigate("/")
					)
				)
				.catch(() => setLoading(false));
		}
	});

	const app = (
		<>
			{usePageHeader({
				title: formatString(t("signin_msg"), "capitalize"),
			})}
			<UserSignin />
		</>
	);

	return !loading && app;
}

export default UserSigninContainer;
