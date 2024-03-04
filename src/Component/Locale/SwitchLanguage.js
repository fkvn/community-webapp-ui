import { GlobalOutlined } from "@ant-design/icons";
import { Grid, Select } from "antd";
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
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const App = () => (
		<Select
			labelInValue
			defaultValue={{
				value: i18next.language,
				label: !screens.xs && getLanguageTitle(i18next.language),
			}}
			suffixIcon={
				<GlobalOutlined
					style={{
						pointerEvents: "none",
					}}
				/>
			}
			style={{
				...(screens.xs && { minWidth: "120px" }),
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
