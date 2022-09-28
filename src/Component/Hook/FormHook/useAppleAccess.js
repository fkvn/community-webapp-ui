import { Button } from "antd";

function useAppleAccess(buttonProps = {}, contentProps = {}) {
	const apple = {
		title: "Apple",
		icon: (
			<svg
				width="1.5rem"
				viewBox="0 0 28 29"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M28 14.5C28 22.228 21.735 28.5 14 28.5C6.265 28.5 0 22.228 0 14.5C0 6.765 6.265 0.5 14 0.5C21.735 0.5 28 6.765 28 14.5Z"
					fill="#333333"
				/>
				<path
					d="M20.5621 10.9574C20.4857 11.002 18.6671 11.9425 18.6671 14.0279C18.7528 16.4061 20.9621 17.2401 21 17.2401C20.9621 17.2847 20.6665 18.3763 19.7907 19.5205C19.0956 20.5062 18.3242 21.5 17.1528 21.5C16.0385 21.5 15.6385 20.8431 14.3528 20.8431C12.972 20.8431 12.5813 21.5 11.5242 21.5C10.3528 21.5 9.52419 20.453 8.79127 19.4766C7.8391 18.1986 7.02978 16.1931 7.00121 14.2675C6.98195 13.2471 7.19189 12.244 7.72481 11.3921C8.47699 10.2026 9.81985 9.39524 11.2863 9.36862C12.4099 9.33331 13.4099 10.0875 14.0956 10.0875C14.7528 10.0875 15.9814 9.36862 17.3714 9.36862C17.9714 9.36919 19.5714 9.53762 20.5621 10.9574ZM14.0006 9.16488C13.8006 8.23303 14.3528 7.30119 14.8671 6.70677C15.5242 5.98792 16.5621 5.5 17.4571 5.5C17.5143 6.43185 17.1522 7.34575 16.505 8.01136C15.9242 8.73021 14.9242 9.27138 14.0006 9.16488Z"
					fill="white"
				/>
			</svg>
		),
	};

	const accessByApple = (buttonProps = {}, contentProps = {}) =>
		((props = {}, contentProps = {}) => (
			<Button {...props}>
				<div {...contentProps}>{apple.title}</div>
			</Button>
		))(
			{
				type: "ghost",
				className: "tedkvn-center text-center bg-white p-3",
				shape: "round",
				icon: apple.icon,
				size: "large",
				style: { lineHeight: "5rem" },
				...buttonProps,
			},
			{
				className: "d-none d-md-block mx-2",
				...contentProps,
			}
		);

	return accessByApple(buttonProps, contentProps);
}

export default useAppleAccess;
