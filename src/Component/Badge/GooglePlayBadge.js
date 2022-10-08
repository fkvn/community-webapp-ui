import { svgGooglePlayBadgeBlack } from "../../Assest/Asset";
import useImage from "../Hook/useImage";

function GooglePlayBadge({
	color = "black",
	width = "100%",
	maxWidth = "8.5rem",
	maxHeight = "2.5rem",
	className = "",
	onClick = () =>
		window.open(
			"https://play.google.com/store/apps/details?id=com.thaihub.thainow&hl=en_US&gl=US",
			"_blank" // <- This is what makes it open in a new window.
		),
}) {
	const { image } = useImage();

	const app = image({
		width: width,
		className: className,
		style: { maxWidth: maxWidth, maxHeight: maxHeight, cursor: "pointer" },
		src: color === "black" ? svgGooglePlayBadgeBlack : <></>,
		onClick: onClick,
	});

	return app;
}

export default GooglePlayBadge;
