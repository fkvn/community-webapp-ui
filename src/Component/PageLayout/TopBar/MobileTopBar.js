import { ArrowDownOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Dropdown,
	Form,
	Menu,
	PageHeader,
	Row,
	Space,
	Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import {
	imageGuestAvatar,
	imageThainowLogo,
	svgSearchWhiteIcon,
} from "../../../Assest/Asset";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import {
	LOCATION_OBJ,
	PICTURE_PROP,
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_INPUT_PROP,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_SORT,
	SEARCH_SORT_DATE,
	SEARCH_SORT_DISTANCE,
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

function MobileTopBar() {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";
	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;

	const { image } = useImage();

	const [showSearch, setShowSearch] = useState(false);
	const { displayLocation } = useLocation();

	const { [`${LOCATION_OBJ}`]: location = {} } = useSelector(thainowReducer);

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
		dispatchSearch(type, {
			[`${SEARCH_KEYWORD}`]: keywordParam,
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

			if (scrollY > lastScrollY) {
				$("#layout header").css({
					transform: "translateY(-80%)",
					transition: "transform 1s, visibility 1s",
				});

				$("#layout main").css({
					"margin-top": "10rem",
					transform: "margin-top",
					transition: "transform 5s, visibility 1s",
				});
			} else {
				if (scrollY === 0) {
					$("#layout main").css(
						"margin-top",
						$("#layout header").height() + 20
					);

					$("#layout main").css({
						"margin-top": heightToHideFrom + 20,
						transform: "margin-top",
						transition: "transform 5s, visibility 1s",
					});
				}

				$("#layout header").css({
					transform: "translateY(0)",
				});
			}

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

		return () => window.removeEventListener("scroll", onScroll);
	};

	const sortOptions = [
		{
			key: SEARCH_SORT_DATE,
			label: "Sort by Date",
		},
		{
			key: SEARCH_SORT_DISTANCE,
			label: "Sort by Distance",
		},
	];

	const sortOptionMenu = (
		<Menu
			items={sortOptions}
			onClick={({ key }) =>
				dispatchSearch(searchTypeParam, {
					[`${SEARCH_SORT}`]: key,
				})
			}
		/>
	);

	const sortBtn = (
		<Dropdown overlay={sortOptionMenu} placement="bottomRight">
			<Button typeof="ghost" size="small" icon={<ArrowDownOutlined />}>
				Sort By {sortParam}
			</Button>
		</Dropdown>
	);

	useEffect(() => {
		$("#layout main").css("margin-top", $("#layout header").height() + 20);
		const keywordParam = searchParams.get("keywords") || "";
		if (keywordParam.length > 0) {
			form.setFieldValue(SEARCH_INPUT_PROP, keywordParam);
		}
		activateScrolling();
	});

	const searchTopBar = (
		<>
			<Row justify="space-between" className="mb-2">
				<Col>
					<Title level={2} className="text-white mb-1">
						Browsing{" "}
						{searchTypeParam.charAt(0).toUpperCase() + searchTypeParam.slice(1)}
					</Title>
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

			{keywordParam.length > 0 && (
				<Form form={form} className="mb-3">
					{keywordInput}
				</Form>
			)}

			<Space
				direction="horizontal"
				id="tag-search-top-bar"
				className="my-1 w-100"
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

			<Space direction="horizontal" className="my-2">
				{/* {filterBtn}  */}
				{sortBtn}
			</Space>
		</>
	);

	const app = (
		<>
			<PageHeader
				ghost={true}
				className="p-0 mt-3 w-100"
				onBack={() => navigate("/")}
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
				<Routes>
					<Route path="/search" element={searchTopBar} />
				</Routes>
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

export default MobileTopBar;
