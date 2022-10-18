import Icon, {
	AimOutlined,
	LinkOutlined,
	MailOutlined,
	MoreOutlined,
	PhoneOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Button,
	Card,
	Carousel,
	Col,
	Descriptions,
	Divider,
	Dropdown,
	Empty,
	Grid,
	Image,
	Menu,
	PageHeader,
	Rate,
	Row,
	Segmented,
	Space,
	Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { isEmptyObject } from "jquery";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { iconLocationBlack } from "../../Assest/Asset";
import DealBadge from "../../Component/Badge/DealBadge";
import HousingBadge from "../../Component/Badge/HousingBadge";
import JobBadge from "../../Component/Badge/JobBadge";
import MarketplaceBadge from "../../Component/Badge/MarketplaceBadge";
import useImage from "../../Component/Hook/useImage";
import useSearch from "../../Component/Hook/useSearch";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	COMPANY_INDUSTRY_PROP,
	DESCRIPTION_PROP,
	EMAIL_PROP,
	FORWARD_CLOSE,
	ID_PROP,
	INFO_PROP,
	IS_DESCRIPTION_PUBLIC_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_LOCATION_PUBLIC,
	IS_PHONE_PUBLIC_PROP,
	IS_SIZE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	NAME_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	POST_OWNER_ID_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_TYPE_PROP,
	SEARCH_DEAL,
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_RESULT_OBJ,
	SEARCH_REVIEW,
	SEARCH_SERVICE,
	SEARCH_SORT,
	SEARCH_SORT_DATE,
	SEARCH_SORT_DISTANCE,
	SEARCH_TYPE_PROP,
	SEARCH_WISHLIST,
	SIZE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";
import DealCard from "../ServiceCard/DealCard";
import HousingCard from "../ServiceCard/HousingCard";
import JobCard from "../ServiceCard/JobCard";
import MarketplaceCard from "../ServiceCard/MarketplaceCard";

import useUrls from "../../Component/Hook/useUrls";

function ProfilePage({ isOwner = false, profile = {} }) {
	const {
		[`${ID_PROP}`]: id = -1,
		[`${INFO_PROP}`]: info = {},
		[`${AVG_RATING_PROP}`]: avgRating = 0,
		[`${TOTAL_REVIEW_PROP}`]: totalReview = 0,
		[`${PROFILE_TYPE_PROP}`]: type = "",
	} = profile;

	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { image } = useImage();

	const [visible, setVisible] = useState(false);

	const { forwardUrl } = useUrls();

	const location = useLocation();

	const header = (
		<PageHeader
			ghost={true}
			className="p-0"
			onBack={() => forwardUrl(FORWARD_CLOSE)}
			title="Back"
		/>
	);

	const cover = (
		<div>
			<Carousel dots={true} autoplay>
				<div>
					<div className="w-100">
						{image({
							width: "100%",
							onClick: () => setVisible(true),
							preview: { visible: false },
							style: {
								maxHeight: screens?.xs ? "15rem" : "25rem",
								objectFit: "cover",
							},
							src: info?.[`${PICTURE_PROP}`],
						})}
					</div>
				</div>
				{(info?.[`${PICTURE_LIST_PROP}`] || []).map((img, idx) => (
					<div key={idx}>
						<div>
							{image({
								width: "100%",
								style: {
									objectFit: "cover",
								},
								src: img,
							})}
						</div>
					</div>
				))}
			</Carousel>
			{visible && (
				<div style={{ display: "none" }}>
					<Image.PreviewGroup
						preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
					>
						<Image src={info?.[`${PICTURE_PROP}`]} />
						{info?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
							<Image key={idx} src={img} />
						))}
					</Image.PreviewGroup>
				</div>
			)}
		</div>
	);

	const infoTitle = (
		<Meta
			className="mt-2"
			avatar={<Avatar size={60} src={info?.[`${PICTURE_PROP}`]} />}
			title={
				<Space direction="vertical" size={0}>
					<Typography.Title level={2} className="m-0">
						{info?.[`${NAME_PROP}`]}
					</Typography.Title>
					<span className="p-">
						<Rate
							disabled
							defaultValue={avgRating}
							allowHalf
							style={{ fontSize: "1rem", backgroundColor: "gray !important" }}
							className="c-housing-important m-0"
						/>
						<span className="ant-rate-text c-housing-important">
							{totalReview} Reviews
						</span>
					</span>
				</Space>
			}
		/>
	);

	const userData = [
		{
			title: `Address: ${
				info?.[`${IS_LOCATION_PUBLIC}`] &&
				info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]
					? info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]
					: "Unavailable"
			}`,
		},
		{
			title: "Ant Design Title 2",
		},
		{
			title: "Ant Design Title 3",
		},
		{
			title: "Ant Design Title 4",
		},
	];

	const businessData = [
		{
			label: <Icon component={() => iconLocationBlack(15)} />,
			title: (
				<Typography.Link
					ellipsis
					onClick={() =>
						window.open(
							`https://www.google.com/maps/place/${info?.[`${NAME_PROP}`]}/@${
								info?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]
							},${info?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]} `,
							"_blank"
						)
					}
				>
					{info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`] || (
						<span className="text-secondary">Unavailable</span>
					)}
				</Typography.Link>
			),
			visible: true,
		},
		{
			label: <AimOutlined />,
			title: (
				<Typography.Link>
					{info?.[`${COMPANY_INDUSTRY_PROP}`] + " Business " || (
						<span className="text-secondary">Unavailable</span>
					)}
				</Typography.Link>
			),
			visible: true,
		},
		{
			label: <MailOutlined />,
			title: (
				<Typography.Link>
					{info?.[`${IS_EMAIL_PUBLIC_PROP}`] && info?.[`${EMAIL_PROP}`] ? (
						info?.[`${EMAIL_PROP}`]
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
				</Typography.Link>
			),
			visible: info?.[`${IS_EMAIL_PUBLIC_PROP}`],
		},
		{
			label: <PhoneOutlined />,
			title: (
				<Typography.Link>
					{info?.[`${IS_PHONE_PUBLIC_PROP}`] && info?.[`${PHONE_PROP}`] ? (
						info?.[`${PHONE_PROP}`]
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
				</Typography.Link>
			),
			visible: info?.[`${IS_PHONE_PUBLIC_PROP}`],
		},
		{
			label: <LinkOutlined />,
			title: (
				<Typography.Link>
					{info?.[`${IS_WEBSITE_PUBLIC_PROP}`] && info?.[`${WEBSITE_PROP}`] ? (
						info?.[`${WEBSITE_PROP}`]
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
				</Typography.Link>
			),
			visible: info?.[`${IS_WEBSITE_PUBLIC_PROP}`],
		},
		{
			label: <TeamOutlined />,
			title: (
				<Typography.Link>
					{info?.[`${IS_SIZE_PUBLIC_PROP}`] && info?.[`${SIZE_PROP}`] ? (
						info?.[`${SIZE_PROP}`]
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
				</Typography.Link>
			),
			visible: info?.[`${IS_SIZE_PUBLIC_PROP}`],
		},
		...(info?.[`${IS_DESCRIPTION_PUBLIC_PROP}`] && info?.[`${DESCRIPTION_PROP}`]
			? [
					{
						title: (
							<Typography.Paragraph italic>
								{info?.[`${DESCRIPTION_PROP}`]}
							</Typography.Paragraph>
						),
						visible: info?.[`${IS_SIZE_PUBLIC_PROP}`],
					},
			  ]
			: []),
		{
			label: (
				<Typography.Text type="secondary" className="mt-2">
					Last updated:
				</Typography.Text>
			),
			title: (
				<Typography.Text type="secondary" className="mt-2">
					{formatTime(info?.[`${UPDATED_ON_PROP}`])}
				</Typography.Text>
			),
		},
	];

	const infoDescription = (
		<Descriptions
			column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
			colon={false}
			title={
				<Typography.Title level={3} className="p-0 m-0 w-75" ellipsis>
					Business Information
				</Typography.Title>
			}
			className="mt-3"
			extra={[
				...(isOwner
					? [
							<Button type="primary" shape="round" key={id}>
								Edit Profile
							</Button>,
					  ]
					: []),
			]}
		>
			{(type === PROFILE_BUSINESS_TYPE_PROP
				? businessData
				: userData || []
			).map((item, idx) => (
				<Descriptions.Item
					key={idx}
					contentStyle={{
						width: "90%",
						...(isOwner && item.visible && { display: "block" }),
					}}
					labelStyle={{
						alignItems: "center",
						...(isOwner &&
							item.visible && {
								alignItems: "baseline",
								paddingTop: ".5rem",
							}),
					}}
					label={<>{item.label}</>}
				>
					{item.title}
					<br />
					{isOwner && item.visible && (
						<div>
							<Typography.Text className="text-danger">
								This information is public to everyone
							</Typography.Text>
						</div>
					)}
				</Descriptions.Item>
			))}
		</Descriptions>
	);

	const infoCard = (
		<Card
			className="bg-transparent"
			bordered={false}
			title={infoTitle}
			loading={isEmptyObject(profile)}
		>
			<Divider />
			{infoDescription}
		</Card>
	);

	const [searchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || SEARCH_DEAL;
	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;
	const { dispatchSearch } = useSearch();
	const { [`${SEARCH_RESULT_OBJ}`]: searchResult = {} } =
		useSelector(thainowReducer);

	const { [`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults = [] } = searchResult;

	const [actionCall, setActionCall] = useState({
		actionType: SEARCH_SERVICE,
		searching: true,
	});

	const onSearchHandle = (
		actionType = SEARCH_SERVICE,
		searchType = searchTypeParam,
		params = {}
	) => {
		if (id > 0 && actionType === SEARCH_SERVICE) {
			return dispatchSearch(
				searchType,
				{
					[`${POST_OWNER_ID_PROP}`]: id,
					...params,
				},
				false
			);
		}
		return Promise.reject();
	};

	const initSearch = useCallback(
		async (
			actionType = SEARCH_SERVICE,
			searchType = searchTypeParam,
			params = {}
		) => {
			setActionCall({
				actionType: actionType,
				searching: true,
			});

			onSearchHandle(actionType, searchType, params).then(() =>
				setActionCall({
					actionType: actionType,
					searching: false,
				})
			);
		},
		[actionCall?.searching, dispatchSearch, id, searchTypeParam]
	);

	useEffect(() => {
		initSearch();
	}, []);

	const serviceTagItems = [
		(props = {}) => (
			<DealBadge
				type="tag"
				active={searchTypeParam === SEARCH_DEAL}
				onClick={() => {
					if (id > 0) {
						setActionCall({
							actionType: SEARCH_SERVICE,
							searching: true,
						});
						initSearch(SEARCH_SERVICE, SEARCH_DEAL);
					}
				}}
				{...props}
			/>
		),

		(props = {}) => (
			<JobBadge
				type="tag"
				active={searchTypeParam === SEARCH_JOB}
				onClick={() => {
					if (id > 0) {
						setActionCall({
							actionType: SEARCH_SERVICE,
							searching: true,
						});
						initSearch(SEARCH_SERVICE, SEARCH_JOB);
					}
				}}
				{...props}
			/>
		),

		(props = {}) => (
			<HousingBadge
				type="tag"
				active={searchTypeParam === SEARCH_HOUSING}
				onClick={() => {
					if (id > 0) {
						setActionCall({
							actionType: SEARCH_SERVICE,
							searching: true,
						});
						initSearch(SEARCH_SERVICE, SEARCH_HOUSING);
					}
				}}
				{...props}
			/>
		),

		(props = {}) => (
			<MarketplaceBadge
				type="tag"
				active={searchTypeParam === SEARCH_MARKETPLACE}
				onClick={() => {
					if (id > 0) {
						setActionCall({
							actionType: SEARCH_SERVICE,
							searching: true,
						});
						initSearch(SEARCH_SERVICE, SEARCH_MARKETPLACE);
					}
				}}
				{...props}
			/>
		),
	];

	const serviceTitle = (
		<Space
			direction="horizontal"
			className="hideScrollHorizontal my-3 w-100"
			style={{
				overflowX: "scroll",
			}}
			size={3}
		>
			{serviceTagItems.map((tag, idx) => (
				<React.Fragment key={idx}>
					{tag({
						tagClassName: "p-1 px-3 rounded lh-base",
					})}
				</React.Fragment>
			))}
		</Space>
	);

	const serviceResultHeaderMenu = (
		<Menu
			mode="horizontal"
			className="px-2"
			style={{
				lineHeight: "2rem",
			}}
			items={[
				{
					key: SEARCH_SORT,
					label: "Sort By",
					style: { cursor: "pointer" },
					children: [
						{
							key: SEARCH_SORT_DATE,
							label: "Sort by Date",
						},
						{
							key: SEARCH_SORT_DISTANCE,
							label: "Sort by Distance",
						},
					],
				},
			]}
			onClick={({ key }) =>
				initSearch(SEARCH_SERVICE, searchTypeParam, {
					[`${SEARCH_SORT}`]: key,
				})
			}
		/>
	);

	const serviceResultHeader = (
		<>
			<Row justify="space-between" align="middle" className="my-0 my-md-4">
				<Col>
					<Typography.Title level={3} className="m-0">
						All {keywordParam.length > 0 && `" ${keywordParam} "`} Results
					</Typography.Title>
				</Col>

				<Col>
					{screens?.xs ? (
						<Dropdown overlay={serviceResultHeaderMenu} trigger={["click"]}>
							<Space>
								<MoreOutlined
									className="c-primary-important"
									style={{ cursor: "pointer" }}
								/>
							</Space>
						</Dropdown>
					) : (
						serviceResultHeaderMenu
					)}
				</Col>
			</Row>
		</>
	);

	const tableServiceResult = <></>;

	const cardServiceResult =
		fetchResults.length > 0 ? (
			<Row gutter={[{ xs: 20, sm: 50 }, 50]} className="mt-4">
				{fetchResults.map((rel, idx) => (
					<Col xs={24} sm={12} key={idx} id="service-card">
						{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_DEAL && (
							<DealCard card={rel} />
						)}

						{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_JOB && (
							<JobCard card={rel} />
						)}

						{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_HOUSING && (
							<HousingCard card={rel} />
						)}

						{searchResult?.[`${SEARCH_TYPE_PROP}`] === SEARCH_MARKETPLACE && (
							<MarketplaceCard card={rel} />
						)}
					</Col>
				))}
			</Row>
		) : (
			<Empty
				description={`This profile hasn't posted any ${
					searchResult?.[`${SEARCH_TYPE_PROP}`]
				} yet`}
			/>
		);

	const serviceResult = (
		<>
			{serviceResultHeader}
			{isOwner ? <></> : cardServiceResult}
		</>
	);

	const action = {
		[`${SEARCH_SERVICE}`]: {
			title: serviceTitle,
			children: serviceResult,
		},

		[`${SEARCH_WISHLIST}`]: {},
		[`${SEARCH_REVIEW}`]: {},
	};

	const actionTitleOptions = [
		{
			label: "Services",
			value: SEARCH_SERVICE,
		},
		{
			label: "Wish List",
			value: SEARCH_WISHLIST,
		},
		{
			label: "Reviews",
			value: SEARCH_REVIEW,
		},
	];

	const actionTitle = (
		<Segmented
			block
			options={actionTitleOptions}
			onChange={(value) => {
				if (value !== actionCall?.actionType) {
					initSearch(value);
				}
			}}
		/>
	);

	const extraActionCard = (
		<>
			{actionTitle}
			<Card
				className="bg-transparent "
				bordered={false}
				title={action?.[`${actionCall?.actionType}`]?.title}
				headStyle={{
					paddingTop: "0",
				}}
				loading={actionCall?.searching}
			>
				{action?.[`${actionCall?.actionType}`]?.children}
			</Card>
		</>
	);

	const app = (
		<>
			{header}
			{cover}
			{infoCard}
			{extraActionCard}
		</>
	);
	return app;
}

export default ProfilePage;
