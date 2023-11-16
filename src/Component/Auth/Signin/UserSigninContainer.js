import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/AuthHook/useAuth";
import useMessage from "../../Hook/MessageHook/useMessage";
import TopPageHeader from "../../Layout/Header/TopPageHeader";
import UserSignin from "./UserSignin";

function UserSigninContainer() {
	const { auth } = useAuth();
	const { successMessage } = useMessage();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			auth()
				// .then(() => navigate("/"))
				.catch(() => setLoading(false));
		}
	});

	const app = (
		<>
			<TopPageHeader />
			{/* {usePageHeader({
				title: formatString(t("signin_msg"), "capitalize"),
			})} */}
			<UserSignin />
		</>
	);

	return !loading && app;
}

export default UserSigninContainer;
