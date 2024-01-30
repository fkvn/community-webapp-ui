import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../../Assest/Asset";
import BreadcrumbContainer from "../../../Breadcrumb/BreadcrumbContainer";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";

function GuideBookDetail() {
	const { t } = useTranslation();
	const { fetchGuideBookPost } = useGuideBookPost();
	const { id } = useParams();
	const [item, setItem] = useState({});

	const fetchItem = (id) =>
		fetchGuideBookPost(id).then((res = {}) => {
			const formattedItem = {
				id: res?.id || "",
				ownder: {
					avatarUrl: res?.postAsAnonymous
						? svgThaiNowLogoWithWords
						: res?.ownder?.details?.avatarUrl || "",
					username: res?.postAsAnonymous
						? res?.ownder?.details?.username || ""
						: t("anonymous_msg"),
				},
				title: res?.details?.title || "",
				category: res?.details?.category || "",
				bannerUrl: res?.details?.bannerUrl || "",
				description: res?.details?.description || "",
				updatedOn: res?.updatedOn || "",
			};
			setItem(formattedItem);
		});

	useEffect(() => {
		fetchItem(id);
	}, [id]);

	// const [item, setItem] = useState({});

	// console.log(item);

	// // console.log(item);

	// useEffect(() => {
	// 	fetchItem();
	// }, []);

	const extraCrumbs = {
		title: item?.category,
	};

	const App = () => (
		<>
			<BreadcrumbContainer extra={true} extraCrumbs={extraCrumbs} />
			{item?.id ? (
				<></>
			) : (
				<Skeleton
					active
					style={{
						minHeight: "30rem",
					}}
				/>
			)}
		</>
	);
	return <App />;
}

export default GuideBookDetail;
