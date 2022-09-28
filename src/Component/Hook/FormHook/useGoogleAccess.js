import { Button } from "antd";

function useGoogleAccess(buttonProps = {}, contentProps = {}) {
	const google = {
		title: "Google",
		icon: (
			<svg
				width="1.5rem"
				viewBox="0 0 24 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M22.5045 12.7326C22.5045 11.8693 22.433 11.2393 22.2783 10.5859H12.2188V14.4826H18.1235C18.0045 15.4509 17.3616 16.9093 15.933 17.8892L15.913 18.0197L19.0936 20.4344L19.314 20.4559C21.3377 18.6242 22.5045 15.9292 22.5045 12.7326Z"
					fill="#4285F4"
				/>
				<path
					d="M12.212 23.0015C15.1048 23.0015 17.5334 22.0682 19.3072 20.4582L15.9263 17.8914C15.0215 18.5098 13.8072 18.9414 12.212 18.9414C9.37874 18.9414 6.974 17.1098 6.11678 14.5781L5.99113 14.5886L2.68388 17.0969L2.64062 17.2148C4.4025 20.6448 8.02155 23.0015 12.212 23.0015Z"
					fill="#34A853"
				/>
				<path
					d="M6.119 14.5755C5.89281 13.9222 5.76191 13.2221 5.76191 12.4988C5.76191 11.7754 5.89281 11.0755 6.1071 10.4221L6.10111 10.283L2.75239 7.73438L2.64283 7.78545C1.91667 9.2088 1.5 10.8072 1.5 12.4988C1.5 14.1905 1.91667 15.7888 2.64283 17.2121L6.119 14.5755Z"
					fill="#FBBC05"
				/>
				<path
					d="M12.2121 6.05997C14.224 6.05997 15.5811 6.91163 16.3549 7.62335L19.3787 4.73C17.5216 3.03834 15.1049 2 12.2121 2C8.02158 2 4.40251 4.35665 2.64062 7.78662L6.1049 10.4233C6.97403 7.89166 9.37878 6.05997 12.2121 6.05997Z"
					fill="#EB4335"
				/>
			</svg>
		),
	};

	const accessByGoogle = (buttonProps = {}, contentProps = {}) =>
		((props = {}, contentProps = {}) => (
			<Button {...props}>
				<div {...contentProps}>{google.title}</div>
			</Button>
		))(
			{
				type: "ghost",
				className: "tedkvn-center text-center bg-white p-3",
				shape: "round",
				icon: google.icon,
				size: "large",
				style: { lineHeight: "5rem" },
				...buttonProps,
			},
			{
				className: "d-none d-md-block mx-2",
				...contentProps,
			}
		);

	return accessByGoogle(buttonProps, contentProps);
}

export default useGoogleAccess;
