import React from "react";
import { Helmet } from "react-helmet";
import { facebookSignin } from "../../serviceEnv";

function MetaTag({
	type = "website",
	title = "ThaiNow",
	url = "",
	siteName = "ThaiNow",
	description = "ThaiNow is a platform aiming to support and promote the Thai community, Thai business, and togetherness as Thais in the United States.",
	imgUrl = "https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fnobg_512x512.png?alt=media&token=201fd956-dcaa-4f22-b1b6-6df785b71d8b",
	imgWidth = "",
	imgHeight = "",
	robots = "follow, index",
	viewport = "",
}) {
	return (
		<Helmet>
			{/* og tags */}
			{type && <meta property="og:type" content={type} />}
			{title && <meta property="og:title" content={title} />}
			{url && <meta property="og:url" content={url} />}
			{siteName && <meta property="og:site_name" content={siteName} />}
			{description && <meta property="og:description" content={description} />}
			{imgUrl && <meta property="og:image" content={imgUrl} />}
			{imgWidth && <meta property="og:image:width" content={imgWidth} />}
			{imgHeight && <meta property="og:image:height" content={imgHeight} />}
			{/* facebook insights */}
			{facebookSignin.appId && (
				<meta property="fb:app_id" content={facebookSignin.appId} />
			)}
			{/* seo tags */}
			{title && <title>{title}</title>}
			{description && <meta name="description" content={description} />}
			{robots && <meta name="robots" content={robots} />}
			{viewport && <meta name="viewport" content={viewport} />}
		</Helmet>
	);
}

export default MetaTag;
