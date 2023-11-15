import { svgAppleStoreBadgeBlack } from "../../Assest/Asset";
import useImage from "../Hook/useImage";

function AppStoreBadge({
	color = "black",
	width = "100%",
	maxWidth = "8rem",
	maxHeight = "2.5rem",
	className = "",
	onClick = () =>
		window.open(
			"https://apps.apple.com/us/app/thainow/id1533111290?ign-itscg=30200&ign-itsct=apps_box_link",
			"_blank" // <- This is what makes it open in a new window.
		),
}) {
	const { image } = useImage();

	const app = image({
		width: width,
		className: className,
		style: { maxWidth: maxWidth, maxHeight: maxHeight, cursor: "pointer" },
		src: color === "black" ? svgAppleStoreBadgeBlack : <></>,
		onClick: onClick,
	});

	return app;
}

export default AppStoreBadge;
