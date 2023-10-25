import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import ReactLoading from "react-loading";

function IconLinkButton({
	btnVariant = "link",
	btnHref = "",
	btnTarget = "_blank",
	btnSize = "sm",
	btnAriaLabel = "",
	btnClassName = "",
	replaceBtnClass = false,
	btnStyle = {},
	imgSrc = "",
	imgClassName = "",
	imgFluid = true,
	replaceImgClass = false,
	imgStyle = {},
}) {
	const [isLoading, setLoading] = useState(true);

	const app = (
		<Button
			variant={btnVariant}
			href={btnHref}
			target={btnTarget}
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
				className={
					replaceImgClass
						? imgClassName
						: `custom-iconLinkBtnImage mx-0 px-0 d-none ${imgClassName}`
				}
				style={imgStyle}
				onLoad={(e) => {
					if (e.target.complete && e.target.naturalHeight !== 0) {
						e.target.classList.remove("d-none");
						e.target.classList.add("d-inline-block");
						setLoading(false);
					}
				}}
			/>
			{isLoading && (
				<ReactLoading
					type="spin"
					color="#0000FF"
					height={"1.5rem"}
					width={"1.5rem"}
				/>
			)}
		</Button>
	);

	return app;
}

export default IconLinkButton;
