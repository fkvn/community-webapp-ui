import { GlobalOutlined } from "@ant-design/icons";
import { Select } from "antd";
import i18next from "i18next";
import { getLanguageTitle } from "../../Util/Util";

function SwitchLanguage({
	style = {
		fontSize: "1rem",
		paddingRight: ".5rem",
		color: "black",
	},
	bordered = false,
	options = [
		{
			value: "en",
			label: "English",
		},
		// {
		// 	value: "zh",
		// 	label: "中文",
		// },
		{
			value: "th",
			label: "ภาษาไทย",
		},
	],
	selectionProps = {},
}) {
	const App = () => (
		<Select
			labelInValue
			className="pt-1"
			defaultValue={{
				value: i18next.language,
				label: getLanguageTitle(i18next.language),
			}}
			suffixIcon={
				<GlobalOutlined
					className="pt-1"
					style={{
						pointerEvents: "none",
					}}
				/>
			}
			style={{
				maxWidth: "10rem",
				...style,
			}}
			size="large"
			variant={bordered}
			onChange={(res) => i18next.changeLanguage(res?.value)}
			options={options}
			{...selectionProps}
		/>
	);
	return <App />;
}

export default SwitchLanguage;
