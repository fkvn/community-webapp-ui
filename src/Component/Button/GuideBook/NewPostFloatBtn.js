import { PlusOutlined } from "@ant-design/icons";
import { Flex, FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GUIDE_BOOK_NEW_POST_PATH, REDIRECT_URI } from "../../../Util/ConstVar";

function NewGuideBookPostFloatBtn({
	btnStyle = {},
	btnProps,
	redirectUri,
	descProps = {},
}) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const App = () => (
		<FloatButton
			tooltip={t("new_post_msg")}
			description={
				<Flex className="mx-4 text-primary" gap={20} {...descProps}>
					<PlusOutlined />
					{t("new_post_msg")}
				</Flex>
			}
			className="custom-center "
			shape="square"
			style={{
				width: "auto",
				maxWidth: "10%",
				height: "4%",
				bottom: "10%",
				right: "3%",
				...btnStyle,
			}}
			onClick={() => {
				navigate(`${GUIDE_BOOK_NEW_POST_PATH}?${REDIRECT_URI}=${redirectUri}`);
			}}
			{...btnProps}
		/>
	);
	return <App />;
}

export default NewGuideBookPostFloatBtn;
