import { Button } from "antd";

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
				{title}
			</Button>
		</>
	);

	return <App />;
}

export default SubmitBtnFormControl;
