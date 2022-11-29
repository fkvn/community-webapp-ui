import { Button, Col, Form, PageHeader, Row, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import {
	imageGuestAvatar,
	imageThainowLogo,
	imageTopbarBgMobile,
	svgSearchWhiteIcon,
} from "../../../Assest/Asset";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import {
	LOCATION_OBJ,
	PICTURE_PROP,
	PROFILE_OBJ,
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
import useCurrentLocation from "../../Hook/useCurrentLocation";
import useImage from "../../Hook/useImage";
import useSearch from "../../Hook/useSearch";
import OffCanvasProfile from "../../Profile/OffCanvasProfile";
import OffCanvasSearch from "../../Search/OffCanvasSearch";
import SearchOption from "../../Search/SearchOption";

function MobileTopBar() {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || SEARCH_BUSINESS;

	const { image } = useImage();

	const [showSearch, setShowSearch] = useState(false);
	const { displayLocation } = useCurrentLocation();

	const { [`${LOCATION_OBJ}`]: location = {} } = useSelector(thainowReducer);

	const { dispatchSearch } = useSearch();

	const [form] = useForm();
	const keywordInput = useSearchKeyword(
		{
			onClick: () => setShowSearch(true),
		},
		{
			onChange: () => setShowSearch(true),
		}
	);

	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(thainowReducer);
	const [showProfile, setShowProfile] = useState(false);

	const onSearchHanlder = ({ type = searchTypeParam, params = {} }) =>
		dispatchSearch({
			type: type,
			params: {
				[`${SEARCH_KEYWORD}`]: keywordParam,
				...params,
			},
		});

	const tagItems = [
		(props = {}) => (
			<BusinessBadge
				type="tag"
				active={searchTypeParam === SEARCH_BUSINESS}
				onClick={() => onSearchHanlder({ type: SEARCH_BUSINESS })}
				{...props}
			/>
		),

		(props = {}) => (
			<DealBadge
				type="tag"
				active={searchTypeParam === SEARCH_DEAL}
				onClick={() => onSearchHanlder({ type: SEARCH_DEAL })}
				{...props}
			/>
		),

		(props = {}) => (
			<JobBadge
				type="tag"
				active={searchTypeParam === SEARCH_JOB}
				onClick={() => onSearchHanlder({ type: SEARCH_JOB })}
				{...props}
			/>
		),

		(props = {}) => (
			<HousingBadge
				type="tag"
				active={searchTypeParam === SEARCH_HOUSING}
				onClick={() => onSearchHanlder({ type: SEARCH_HOUSING })}
				{...props}
			/>
		),

		(props = {}) => (
			<MarketplaceBadge
				type="tag"
				active={searchTypeParam === SEARCH_MARKETPLACE}
				onClick={() => onSearchHanlder({ type: SEARCH_MARKETPLACE })}
				{...props}
			/>
		),
	];

	const activateScrolling = () => {
		const heightToHideFrom = $("#layout header").outerHeight();

		const threshold = 0;
		let lastScrollY = window.pageYOffset;
		let ticking = false;

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset;

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false;
				return;
			}

			let adjustHeight = (scrollY / heightToHideFrom) * 100 * -1;
			adjustHeight = adjustHeight < -76 ? -76 : adjustHeight;

			$("#layout header").css({
				transform: `translateY(${adjustHeight}%)`,
				// transition: "transform 10ms ease-out 5ms",
			});

			lastScrollY = scrollY > 0 ? scrollY : 0;

			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir);
				ticking = true;
			}
		};

		window.addEventListener("scroll", onScroll);

		return onScroll;
	};

	useEffect(() => {
		const keywordParam = searchParams.get("keywords") || "";
		if (keywordParam.length > 0) {
			form.setFieldValue(SEARCH_INPUT_PROP, keywordParam);
		}

		try {
			$("#tag-bar").scrollLeft($(`#${searchTypeParam}`).offset()?.left - 50);
		} catch (error) {}

		const scroll = activateScrolling();

		$("#layout-main").css("margin-top", $("#layout header").outerHeight() + 15);

		// clean up event listener
		return () => window.removeEventListener("scroll", scroll);
	});

	const searchTopBar = () => (
		<div>
			<Row className="header mb-2" gutter={[50, 5]} align="middle">
				<Col>
					<Typography.Title level={2} className="text-white mb-1">
						Browsing{" "}
						{searchTypeParam.charAt(0).toUpperCase() + searchTypeParam.slice(1)}
					</Typography.Title>
				</Col>
				<Col className="tedkvn-center">
					{displayLocation(
						{
							onClick: () => setShowSearch(true),
							containerClassName: "mb-0 w-100",
						},
						location
					)}
				</Col>
			</Row>

			<div className="content">
				{keywordParam.length > 0 && (
					<Form form={form} className="my-3">
						{keywordInput}
					</Form>
				)}

				<Space
					direction="horizontal"
					id="tag-bar"
					className="hideScrollHorizontal my-2 mb-1 w-100 border-0"
					style={{
						position: "relative",
						overflowX: "scroll",
						overflowY: "hidden",
					}}
					size={20}
				>
					{tagItems.map((tag, idx) => (
						<React.Fragment key={idx}>{tag()}</React.Fragment>
					))}
				</Space>
				<SearchOption />
			</div>
		</div>
	);

	const app = (
		<Row
			id="mobile-top-bar"
			justify="center"
			style={{
				overflow: "hidden !important",
			}}
		>
			<Col xs={24}>
				<PageHeader
					ghost={true}
					onBack={() => navigate("/")}
					backIcon={image({
						width: 55,
						src: imageThainowLogo,
					})}
					style={{
						backgroundImage: `url(${imageTopbarBgMobile})`,
						backgroundSize: "cover",
					}}
					extra={[
						...(keywordParam.length === 0
							? [
									<Button
										key={0}
										type="ghost"
										className="p-0 border-0 mt-2"
										onClick={() => setShowSearch(true)}
									>
										{image({
											width: 37,
											src: svgSearchWhiteIcon,
										})}
									</Button>,
							  ]
							: []),
						<Button type="ghost" className="p-0 border-0 mt-2" key={1}>
							{image({
								width: 43,
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
					{" "}
					<Routes>
						<Route path="/search" element={searchTopBar()} />
					</Routes>
				</PageHeader>

				<OffCanvasSearch
					show={showSearch}
					onHide={() => setShowSearch(false)}
				/>
				<OffCanvasProfile
					show={showProfile}
					onHide={() => setShowProfile(false)}
				/>
			</Col>
		</Row>
	);
	return app;
}

export default MobileTopBar;
