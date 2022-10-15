import { Button, Form, PageHeader, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	imageGuestAvatar,
	imageThainowLogo,
	svgSearchWhiteIcon,
} from "../../../Assest/Asset";
import {
	PICTURE_PROP,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_INPUT_PROP,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_TYPE_PROP,
} from "../../../Util/ConstVar";
import { isObjectEmpty } from "../../../Util/Util";
import BusinessBadge from "../../Badge/BusinessBadge";
import DealBadge from "../../Badge/DealBadge";
import HousingBadge from "../../Badge/HousingBadge";
import JobBadge from "../../Badge/JobBadge";
import MarketplaceBadge from "../../Badge/MarketplaceBadge";
import useSearchKeyword from "../../Hook/FormHook/useSearchKeyword";
import useLocation from "../../Hook/useCurrentLocation";
import useImage from "../../Hook/useImage";
import useProfile from "../../Hook/useProfile";
import useSearch from "../../Hook/useSearch";
import OffCanvasProfile from "../../Profile/OffCanvasProfile";
import OffCanvasSearch from "../../Search/OffCanvasSearch";

function MobileSearchTopBar() {
	const [searchParams, setSearchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";

	const { image } = useImage();

	const [showSearch, setShowSearch] = useState(false);
	const { location, displayLocation } = useLocation();
	const { dispatchSearch } = useSearch();

	const { Title } = Typography;

	const [form] = useForm();
	const keywordInput = useSearchKeyword(
		{
			onClick: () => setShowSearch(true),
		},
		{
			onChange: () => setShowSearch(true),
		}
	);

	const { profile } = useProfile();
	const [showProfile, setShowProfile] = useState(false);

	const onSearchHanlder = (type = SEARCH_BUSINESS) =>
		type !== searchTypeParam &&
		dispatchSearch(type, {
			[`${SEARCH_KEYWORD}`]: keywordParam,
			...location,
		}).then(() => {
			setSearchParams(
				new URLSearchParams({
					[`${SEARCH_TYPE_PROP}`]: type,
					[`${SEARCH_KEYWORD}`]: keywordParam,
				})
			);
		});

	const tagItems = [
		(props = {}) => (
			<BusinessBadge
				type="tag"
				active={searchTypeParam === SEARCH_BUSINESS}
				onClick={() => onSearchHanlder(SEARCH_BUSINESS)}
				{...props}
			/>
		),

		(props = {}) => (
			<DealBadge
				type="tag"
				active={searchTypeParam === SEARCH_DEAL}
				onClick={() => onSearchHanlder(SEARCH_DEAL)}
				{...props}
			/>
		),

		(props = {}) => (
			<JobBadge
				type="tag"
				active={searchTypeParam === SEARCH_JOB}
				onClick={() => onSearchHanlder(SEARCH_JOB)}
				{...props}
			/>
		),

		(props = {}) => (
			<HousingBadge
				type="tag"
				active={searchTypeParam === SEARCH_HOUSING}
				onClick={() => onSearchHanlder(SEARCH_HOUSING)}
				{...props}
			/>
		),

		(props = {}) => (
			<MarketplaceBadge
				type="tag"
				active={searchTypeParam === SEARCH_MARKETPLACE}
				onClick={() => onSearchHanlder(SEARCH_MARKETPLACE)}
				{...props}
			/>
		),
	];

	useEffect(() => {
		$("#layout main").css("margin-top", $("#layout header").height() + 20);
		const keywordParam = searchParams.get("keywords") || "";
		if (keywordParam.length > 0) {
			form.setFieldValue(SEARCH_INPUT_PROP, keywordParam);
		}
	});

	const app = (
		<>
			<PageHeader
				ghost={true}
				className="p-0 mt-3 w-100"
				onBack={() => window.history.back()}
				backIcon={image({
					src: imageThainowLogo,
				})}
				extra={[
					...(keywordParam.length === 0
						? [
								<Button
									key={0}
									type="ghost"
									className="p-0 tedkvn-center border-0 mt-2"
									onClick={() => setShowSearch(true)}
								>
									{image({
										width: 30,
										src: svgSearchWhiteIcon,
									})}
								</Button>,
						  ]
						: []),
					<Button
						type="ghost"
						className="p-0 tedkvn-center border-0 mt-2"
						key={1}
					>
						{image({
							width: 35,
							className: "rounded-circle bg-white",
							style: { padding: ".15rem" },
							src: isObjectEmpty(profile)
								? imageGuestAvatar
								: profile?.info?.[`${PICTURE_PROP}`],
							onClick: () => setShowProfile(true),
						})}
					</Button>,
				]}
			>
				<Title level={2} className="text-white">
					Browsing{" "}
					{searchTypeParam.charAt(0).toUpperCase() + searchTypeParam.slice(1)}
				</Title>

				{keywordParam.length > 0 && (
					<Form form={form} className="mb-3">
						{keywordInput}
					</Form>
				)}

				{displayLocation({
					onClick: () => setShowSearch(true),
					containerClassName: "mb-3 w-75",
				})}
				<Space
					direction="horizontal"
					id="tag-search-top-bar"
					className="my-3 w-100"
					style={{
						overflowX: "scroll",
					}}
					gap={3}
				>
					{tagItems.map((tag, idx) => (
						<React.Fragment key={idx}>
							{tag({
								tagClassName: "p-1 px-3 rounded lh-base",
							})}
						</React.Fragment>
					))}
				</Space>
			</PageHeader>

			<OffCanvasSearch show={showSearch} onHide={() => setShowSearch(false)} />
			<OffCanvasProfile
				show={showProfile}
				onHide={() => setShowProfile(false)}
			/>
		</>
	);
	return app;
}

export default MobileSearchTopBar;
