import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GUIDE_BOOK_NEW_POST_PATH, REDIRECT_URI } from "../../../Util/ConstVar";

function NewGuideBookPostFloatBtn({ redirectUri }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const App = () => (
		<FloatButton
			tooltip={t("new_post_msg")}
			icon={<PlusOutlined />}
			className="custom-center"
			type="primary"
			onClick={() => {
				navigate(`${GUIDE_BOOK_NEW_POST_PATH}?${REDIRECT_URI}=${redirectUri}`);
			}}
		/>
	);
	return <App />;
}

export default NewGuideBookPostFloatBtn;
