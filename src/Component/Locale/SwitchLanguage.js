import { Select } from "antd";
import i18next from "i18next";
import { getLanguageTitle } from "../../Util/util";

function SwitchLanguage({
	style = {},
	bordered = true,
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
	const languageSelection = (
		<Select
			labelInValue
			defaultValue={{
				value: i18next.language,
				label: getLanguageTitle(i18next.language),
			}}
			style={{
				maxWidth: "10rem",
				...style,
			}}
			size="large"
			bordered={bordered}
			onChange={(res) => i18next.changeLanguage(res?.value)}
			options={options}
			{...selectionProps}
		/>
	);

	const app = languageSelection;
	return app;
}

export default SwitchLanguage;
