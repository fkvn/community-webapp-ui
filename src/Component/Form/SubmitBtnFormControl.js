import { Button } from "antd";
import { useTranslation } from "react-i18next";

function SubmitBtnFormControl({
	type = "primary",
	title = "",
	className = "",
	style = {},
	disabled = false,
	loading = false,
	onClick = () => {},
	btnProps = {},
}) {
	const { t } = useTranslation("Form");
	let btnTitle = title || t("form_submit_msg");

	const App = () => (
		<>
			<Button
				type={type}
				className={`my-2 bg-customRed custom-center ${className}`}
				style={{
					fontSize: "1rem",
					padding: ".6rem",
					borderRadius: ".5rem",
					...style,
				}}
				disabled={disabled}
				loading={loading}
				onClick={onClick}
				{...btnProps}
			>
				{btnTitle}
			</Button>
		</>
	);

	return <App />;
}

export default SubmitBtnFormControl;
