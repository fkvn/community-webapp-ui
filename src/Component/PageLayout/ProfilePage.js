import Icon, {
	AimOutlined,
	ArrowDownOutlined,
	ArrowUpOutlined,
	LinkOutlined,
	MailOutlined,
	MenuOutlined,
	PhoneOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
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
	Table,
	Tag,
	Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { isEmptyObject } from "jquery";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
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
	CREATED_ON_PROP,
	DESCRIPTION_PROP,
	EMAIL_PROP,
	FORWARD_CLOSE,
	FORWARD_SUCCESS,
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
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_KEYWORD,
	SEARCH_MARKETPLACE,
	SEARCH_PROFILE,
	SEARCH_RESULT_OBJ,
	SEARCH_REVIEW,
	SEARCH_SERVICE,
	SEARCH_SORT,
	SEARCH_SORT_ACS,
	SEARCH_SORT_DATE,
	SEARCH_SORT_DESC,
	SEARCH_SORT_DISTANCE,
	SEARCH_SORT_ORDER,
	SEARCH_TYPE_PROP,
	SEARCH_WISHLIST,
	SIZE_PROP,
	STATUS_PROP,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import DealCard from "../ServiceCard/DealCard";
import HousingCard from "../ServiceCard/HousingCard";
import JobCard from "../ServiceCard/JobCard";
import MarketplaceCard from "../ServiceCard/MarketplaceCard";

import useUrls from "../../Component/Hook/useUrls";
import { formatTime } from "../../Util/Util";

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

	const { image, avatar } = useImage();

	const [visible, setVisible] = useState({
		value: false,
		idx: 0,
	});

	const { forwardUrl } = useUrls();

	const header = (
		<PageHeader
			ghost={true}
			className="px-0 py-3"
			onBack={() => forwardUrl(FORWARD_CLOSE)}
			title="Back"
		/>
	);

	const cover = (
		<div>
			<Carousel dots={true} autoplay>
				{info?.[`${PICTURE_LIST_PROP}`]?.length === 0 && (
					<div>
						<div className="w-100">
							{image({
								width: "100%",
								onClick: () => setVisible({ value: true, idx: 0 }),
								preview: { visible: false },
								style: {
									maxHeight: screens?.xs ? "20rem" : "30rem",
									objectFit: "cover",
								},
								src: info?.[`${PICTURE_PROP}`],
							})}
						</div>
					</div>
				)}
				{(info?.[`${PICTURE_LIST_PROP}`] || []).map((img, idx) => (
					<div key={idx}>
						<div>
							{image({
								width: "100%",
								onClick: () => setVisible({ value: true, idx: idx }),
								preview: { visible: false },
								style: {
									maxHeight: screens?.xs ? "20rem" : "30rem",
									objectFit: "cover",
								},
								src: img,
							})}
						</div>
					</div>
				))}
			</Carousel>
			{visible?.value && (
				<div style={{ display: "none" }}>
					<Image.PreviewGroup
						preview={{
							visible,
							onVisibleChange: (vis) =>
								setVisible({
									value: vis,
								}),
							current: visible?.idx || 0,
						}}
					>
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
			{...(info?.[`${PICTURE_LIST_PROP}`]?.length >= 0 && {
				avatar: avatar({
					inputProps: { src: info?.[`${PICTURE_PROP}`], size: 50 },
				}),
			})}
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
							style={{ backgroundColor: "gray !important" }}
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
			label: <UserOutlined />,
			title: (
				<Typography.Link className="mt-1" ellipsis>
					Member since{" "}
					{(info?.[`${CREATED_ON_PROP}`] || "").split(" ")?.[0].split("-")?.[2]}
				</Typography.Link>
			),
			visible: true,
		},
		{
			label: <Icon component={() => iconLocationBlack(15)} />,
			...(!isEmptyObject(info?.[`${LOCATION_PROP}`])
				? {
						title: (
							<Typography.Link
								ellipsis
								onClick={() =>
									window.open(
										`https://www.google.com/maps/place/${
											info?.[`${NAME_PROP}`]
										}/@${info?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
											info?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
										} `,
										"_blank"
									)
								}
							>
								{info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
							</Typography.Link>
						),
						visible: info?.[`${IS_LOCATION_PUBLIC}`],
				  }
				: {}),
		},
		{
			label: <MailOutlined />,
			...(info?.[`${EMAIL_PROP}`]
				? {
						title: (
							<Typography.Link href={`mailto:${info?.[`${EMAIL_PROP}`]}`}>
								{info?.[`${EMAIL_PROP}`]}
							</Typography.Link>
						),
						visible: info?.[`${IS_EMAIL_PUBLIC_PROP}`],
				  }
				: {}),
		},
		{
			label: <PhoneOutlined />,
			...(info?.[`${PHONE_PROP}`]
				? {
						title: (
							<Typography.Link href={`tel:${info?.[`${PHONE_PROP}`]}`}>
								{info?.[`${PHONE_PROP}`]}
							</Typography.Link>
						),
						visible: info?.[`${IS_PHONE_PUBLIC_PROP}`],
				  }
				: {}),
		},
		{
			label: <LinkOutlined />,
			...(info?.[`${WEBSITE_PROP}`]
				? {
						title: (
							<Typography.Link href={info?.[`${WEBSITE_PROP}`]} target="_blank">
								{info?.[`${WEBSITE_PROP}`]}
							</Typography.Link>
						),
						visible: info?.[`${IS_WEBSITE_PUBLIC_PROP}`],
				  }
				: {}),
		},
		...(info?.[`${DESCRIPTION_PROP}`]
			? [
					{
						title: (
							<Typography.Paragraph italic>
								{info?.[`${DESCRIPTION_PROP}`]}
							</Typography.Paragraph>
						),
						visible: info?.[`${IS_DESCRIPTION_PUBLIC_PROP}`],
					},
			  ]
			: []),
	];

	const businessData = [
		{
			label: <UserOutlined />,
			title: (
				<Typography.Link ellipsis>
					{info?.[`${STATUS_PROP}`] + " BUSINESS"}
				</Typography.Link>
			),
			visible: true,
		},
		{
			label: <Icon component={() => iconLocationBlack(15)} />,
			...(!isEmptyObject(info?.[`${LOCATION_PROP}`])
				? {
						title: (
							<Typography.Link
								ellipsis
								onClick={() =>
									window.open(
										`https://www.google.com/maps/place/${
											info?.[`${NAME_PROP}`]
										}/@${info?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
											info?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
										} `,
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
				  }
				: {}),
		},
		{
			label: <AimOutlined />,
			title: (
				<Typography.Link
					href={`/search?${SEARCH_KEYWORD}=${
						info?.[`${COMPANY_INDUSTRY_PROP}`]
					}&${SEARCH_TYPE_PROP}=${SEARCH_BUSINESS}`}
				>
					{info?.[`${COMPANY_INDUSTRY_PROP}`] + " Business " || (
						<span className="text-secondary">Unavailable</span>
					)}
				</Typography.Link>
			),
			visible: true,
		},
		{
			label: <MailOutlined />,
			...(info?.[`${EMAIL_PROP}`]
				? {
						title: (
							<Typography.Link href={`mailto:${info?.[`${EMAIL_PROP}`]}`}>
								{info?.[`${EMAIL_PROP}`]}
							</Typography.Link>
						),
						visible: info?.[`${IS_EMAIL_PUBLIC_PROP}`],
				  }
				: {}),
		},
		{
			label: <PhoneOutlined />,
			...(info?.[`${PHONE_PROP}`]
				? {
						title: (
							<Typography.Link href={`tel:${info?.[`${PHONE_PROP}`]}`}>
								{info?.[`${PHONE_PROP}`]}
							</Typography.Link>
						),
						visible: info?.[`${IS_PHONE_PUBLIC_PROP}`],
				  }
				: {}),
		},
		{
			label: <LinkOutlined />,
			...(info?.[`${WEBSITE_PROP}`]
				? {
						title: (
							<Typography.Link href={info?.[`${WEBSITE_PROP}`]} target="_blank">
								{info?.[`${WEBSITE_PROP}`]}
							</Typography.Link>
						),
						visible: info?.[`${IS_WEBSITE_PUBLIC_PROP}`],
				  }
				: {}),
		},
		{
			label: <TeamOutlined />,
			...(info?.[`${SIZE_PROP}`]
				? {
						title: (
							<Typography.Link>
								{info?.[`${SIZE_PROP}`] || "Unavailable"}
							</Typography.Link>
						),
						visible: info?.[`${IS_SIZE_PUBLIC_PROP}`],
				  }
				: {}),
		},
		...(info?.[`${DESCRIPTION_PROP}`]
			? [
					{
						title: (
							<Typography.Paragraph italic>
								{info?.[`${DESCRIPTION_PROP}`]}
							</Typography.Paragraph>
						),
						visible: info?.[`${IS_DESCRIPTION_PUBLIC_PROP}`],
					},
			  ]
			: []),
	];

	const infoDescription = (
		<Descriptions
			column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
			colon={false}
			title={
				<Typography.Title level={3} className="p-0 m-0 w-75" ellipsis>
					{type === PROFILE_BUSINESS_TYPE_PROP ? "Business" : "More"}{" "}
					Information
				</Typography.Title>
			}
			className="mt-3"
			extra={[
				...(isOwner
					? [
							<Button
								type="primary"
								shape="round"
								key={id}
								onClick={() =>
									forwardUrl(
										FORWARD_SUCCESS,
										`/${SEARCH_PROFILE}/${id}`,
										"",
										`/edit-profile/${id}`
									)
								}
							>
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
					{item?.title && (isOwner || item.visible) ? (
						item.title
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
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
			{...(!screens?.xs && {
				extra: [
					<Typography.Text
						key={id}
						type="secondary"
						className="m-0 p-0"
						ellipsis
					>
						Updated {formatTime(info?.[`${UPDATED_ON_PROP}`])}
					</Typography.Text>,
				],
			})}
		>
			<Divider />
			{infoDescription}
		</Card>
	);

	const [searchParams] = useSearchParams();
	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || SEARCH_DEAL;
	const sortOrderParam =
		searchParams.get(SEARCH_SORT_ORDER) || SEARCH_SORT_DESC;
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
	}, [id]);

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
			className="px-2 "
			triggerSubMenuAction="click"
			style={{
				lineHeight: "2rem",
			}}
			items={[
				{
					key: SEARCH_SORT,
					label: "Sort By",
					style: { cursor: "pointer", zIndex: 200 },
					children: [
						{
							key: SEARCH_SORT_DATE,
							label: (
								<>
									Sort by Date{" "}
									{sortOrderParam === SEARCH_SORT_DESC ? (
										<ArrowUpOutlined style={{ verticalAlign: "none" }} />
									) : (
										<ArrowDownOutlined />
									)}
								</>
							),
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
					[`${SEARCH_SORT_ORDER}`]:
						sortOrderParam === SEARCH_SORT_DESC
							? SEARCH_SORT_ACS
							: SEARCH_SORT_DESC,
				})
			}
		/>
	);

	const serviceResultHeader = (
		<>
			<Row justify="space-between" align="middle" className="my-0 my-md-4">
				<Col style={{ maxWidth: "75%" }}>
					<Typography.Title level={3}>
						All {keywordParam.length > 0 && `" ${keywordParam} "`} Results
					</Typography.Title>
				</Col>

				{fetchResults?.length > 0 && (
					<Col>
						{screens?.xs ? (
							<Dropdown overlay={serviceResultHeaderMenu} trigger={["click"]}>
								<Space>
									<MenuOutlined
										className="c-primary-important mt-2"
										style={{ cursor: "pointer", fontSize: "1rem" }}
									/>
								</Space>
							</Dropdown>
						) : (
							serviceResultHeaderMenu
						)}
					</Col>
				)}
			</Row>
		</>
	);

	const tableServiceResultColumns = [
		{
			title: "Title",
			dataIndex: "title",
			render: (text) => <Typography.Link>{text}</Typography.Link>,
			ellipsis: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (status) =>
				status === "AVAILABLE" ? (
					<Tag color="success">PUBLIC</Tag>
				) : (
					<Tag color="warning">{status}</Tag>
				),
			ellipsis: true,
		},
		{
			title: "Date",
			dataIndex: "date",
			// render: (time) => formatTime(time),
			ellipsis: true,
		},
		{
			title: "Action",
			dataIndex: "action",
			render: () => (
				<Space size="middle">
					<Button type="link" className="border-0 p-0">
						Edit
					</Button>
					<Button type="link" className="border-0 p-0 text-danger">
						Delete
					</Button>
				</Space>
			),
			ellipsis: true,
		},
	];

	const tableServiceResultData = fetchResults.map((res, idx) => {
		return {
			key: idx,
			title: res?.[`${INFO_PROP}`]?.[`${TITLE_PROP}`],
			status: res?.[`${INFO_PROP}`]?.[`${STATUS_PROP}`],
			date: res?.[`${INFO_PROP}`]?.[`${UPDATED_ON_PROP}`],
		};
	});

	const tableServiceResult =
		fetchResults.length > 0 ? (
			<Table
				columns={tableServiceResultColumns}
				dataSource={tableServiceResultData}
				pagination={{ pageSize: 20 }}
				scroll={{ x: true, y: 240 }}
				className="my-3"
			/>
		) : (
			<Empty
				description={`This profile hasn't posted any ${
					searchResult?.[`${SEARCH_TYPE_PROP}`]
				} yet`}
			/>
		);

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
			{isOwner ? tableServiceResult : cardServiceResult}
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
