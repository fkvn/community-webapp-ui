import { Button, Image } from "react-bootstrap";

function IconButton({
	btnId = "",
	btnVariant = "secondary",
	onClickHandler = () => {},
	btnSize = "sm",
	btnAriaLabel = "",
	btnClassName = "",
	replaceBtnClass = false,
	btnStyle = {},
	imgSrc = "",
	imgClassName = "",
	imgFluid = true,
	replaceImgClass = false,
}) {
	const app = (
		<Button
			id={btnId ? btnId : ""}
			variant={btnVariant}
			onClick={onClickHandler}
			aria-label={btnAriaLabel}
			className={
				replaceBtnClass
					? btnClassName
					: `d-inline-block align-top img-fluid ${btnClassName}`
			}
			size={btnSize}
			style={btnStyle}
		>
			<Image
				fluid={imgFluid}
				src={imgSrc}
				className={replaceImgClass ? imgClassName : `mx-0 px-0 ${imgClassName}`}
			/>
		</Button>
	);

	return app;
}

export default IconButton;
