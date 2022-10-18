import { Button } from "antd";

function useFacebookAccess(buttonProps = {}, contentProps = {}) {
	const facebook = {
		title: "Facebook",
		icon: (
			<svg
				width="1.5rem"
				viewBox="0 0 32 33"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="16" cy="16.5" r="14" fill="#0C82EE" />
				<path
					d="M21.2137 20.7816L21.8356 16.8301H17.9452V14.267C17.9452 13.1857 18.4877 12.1311 20.2302 12.1311H22V8.76699C22 8.76699 20.3945 8.5 18.8603 8.5C15.6548 8.5 13.5617 10.3929 13.5617 13.8184V16.8301H10V20.7816H13.5617V30.3345C14.2767 30.444 15.0082 30.5 15.7534 30.5C16.4986 30.5 17.2302 30.444 17.9452 30.3345V20.7816H21.2137Z"
					fill="white"
				/>
			</svg>
		),
	};

	const accessByFacebook = (buttonProps = {}, contentProps = {}) =>
		((props = {}, contentProps = {}) => (
			<Button {...props}>
				<div {...contentProps}>{facebook.title}</div>
			</Button>
		))(
			{
				type: "ghost",
				className: "tedkvn-center text-center bg-white p-3",
				shape: "round",
				icon: facebook.icon,
				size: "large",
				style: { lineHeight: "5rem" },
				...buttonProps,
			},
			{
				className: "mx-2",
				...contentProps,
			}
		);

	return accessByFacebook(buttonProps, contentProps);
}

export default useFacebookAccess;
