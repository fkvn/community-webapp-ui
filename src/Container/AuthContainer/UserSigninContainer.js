import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserSignin from "../../Component/Auth/UserSignin";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import useAuth from "../../Component/Hook/useAuth";
import { successMessage } from "../../Component/Hook/useMessage";
import { formatString } from "../../Util/Util";

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
				title: formatString(t("signin_msg"), "titleCase"),
			})}
			<UserSignin />
		</>
	);

	return !loading && app;
}

export default UserSigninContainer;
