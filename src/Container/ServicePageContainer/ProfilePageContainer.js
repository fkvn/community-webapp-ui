import { Card, Skeleton } from "antd";
import { isEmptyObject } from "jquery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findProfileAxios } from "../../Axios/axiosPromise";
import ProfilePage from "../../Component/PageLayout/ProfilePage";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import { ID_PROP, PROFILE_OBJ } from "../../Util/ConstVar";

function ProfilePageContainer() {
	const { id } = useParams();
	const { [`${PROFILE_OBJ}`]: signedProfile = {} } =
		useSelector(thainowReducer);

	const [profile, setProfile] = useState({});

	useEffect(() => {
		findProfileAxios(id).then((res) => setProfile(res));
	}, [id]);

	const skeletonCard = (
		<Card
			cover={
				<div className="tedkvn-center mt-5 " style={{ padding: "0 3.3rem" }}>
					<Skeleton.Avatar shape="circle" size={150} active={true} />
				</div>
			}
			className="m-4 overflow-hidden"
		>
			<Skeleton loading={isEmptyObject(profile)} active />
		</Card>
	);

	// const ProfilePage = ({ isOwner = false, profile = {} }) => {
	// 	const {
	// 		[`${ID_PROP}`]: id = -1,
	// 		[`${INFO_PROP}`]: info = {},
	// 		[`${AVG_RATING_PROP}`]: avgRating = 0,
	// 		[`${TOTAL_REVIEW_PROP}`]: totalReview = 0,
	// 		[`${PROFILE_TYPE_PROP}`]: type = "",
	// 	} = profile;

	// 	const { image } = useImage();

	// 	const [visible, setVisible] = useState(false);

	// 	const cover = (
	// 		<div>
	// 			<Carousel dots={true} autoplay>
	// 				<div>
	// 					<div className="w-100">
	// 						{image({
	// 							width: "100%",
	// 							onClick: () => setVisible(true),
	// 							preview: { visible: false },
	// 							style: {
	// 								maxHeight: screens?.xs ? "15rem" : "25rem",
	// 								objectFit: "cover",
	// 							},
	// 							src: info?.[`${PICTURE_PROP}`],
	// 						})}
	// 					</div>
	// 				</div>
	// 				{info?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
	// 					<div key={idx}>
	// 						<div>
	// 							{image({
	// 								width: "100%",
	// 								style: {
	// 									objectFit: "cover",
	// 								},
	// 								src: img,
	// 							})}
	// 						</div>
	// 					</div>
	// 				))}
	// 			</Carousel>
	// 			{visible && (
	// 				<div style={{ display: "none" }}>
	// 					<Image.PreviewGroup
	// 						preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
	// 					>
	// 						<Image src={info?.[`${PICTURE_PROP}`]} />
	// 						{info?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
	// 							<Image key={idx} src={img} />
	// 						))}
	// 					</Image.PreviewGroup>
	// 				</div>
	// 			)}
	// 		</div>
	// 	);

	// 	const infoTitle = (
	// 		<Meta
	// 			className="mt-2"
	// 			avatar={<Avatar size={60} src={info?.[`${PICTURE_PROP}`]} />}
	// 			title={
	// 				<Space direction="vertical" size={0}>
	// 					<Typography.Title level={2} className="m-0">
	// 						{info?.[`${NAME_PROP}`]}
	// 					</Typography.Title>
	// 					<span className="p-">
	// 						<Rate
	// 							disabled
	// 							defaultValue={avgRating}
	// 							allowHalf
	// 							style={{ fontSize: "1rem", backgroundColor: "gray !important" }}
	// 							className="c-housing-important m-0"
	// 						/>
	// 						<span className="ant-rate-text c-housing-important">
	// 							{totalReview} Reviews
	// 						</span>
	// 					</span>
	// 				</Space>
	// 			}
	// 		/>
	// 	);

	// 	const userData = [
	// 		{
	// 			title: `Address: ${
	// 				info?.[`${IS_LOCATION_PUBLIC}`] &&
	// 				info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]
	// 					? info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]
	// 					: "Unavailable"
	// 			}`,
	// 		},
	// 		{
	// 			title: "Ant Design Title 2",
	// 		},
	// 		{
	// 			title: "Ant Design Title 3",
	// 		},
	// 		{
	// 			title: "Ant Design Title 4",
	// 		},
	// 	];

	// 	const businessData = [
	// 		{
	// 			label: <Icon component={() => iconLocationBlack(15)} />,
	// 			title: (
	// 				<Typography.Link
	// 					ellipsis
	// 					onClick={() =>
	// 						window.open(
	// 							`https://www.google.com/maps/place/${info?.[`${NAME_PROP}`]}/@${
	// 								info?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]
	// 							},${info?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]} `,
	// 							"_blank"
	// 						)
	// 					}
	// 				>
	// 					{info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`] || (
	// 						<span className="text-secondary">Unavailable</span>
	// 					)}
	// 				</Typography.Link>
	// 			),
	// 			visible: true,
	// 		},
	// 		{
	// 			label: <AimOutlined />,
	// 			title: (
	// 				<Typography.Link>
	// 					{info?.[`${COMPANY_INDUSTRY_PROP}`] || (
	// 						<span className="text-secondary">Unavailable</span>
	// 					)}
	// 				</Typography.Link>
	// 			),
	// 			visible: true,
	// 		},
	// 		{
	// 			label: <MailOutlined />,
	// 			title: (
	// 				<Typography.Link>
	// 					{info?.[`${IS_EMAIL_PUBLIC_PROP}`] && info?.[`${EMAIL_PROP}`] ? (
	// 						info?.[`${EMAIL_PROP}`]
	// 					) : (
	// 						<span className="text-secondary">Unavailable</span>
	// 					)}
	// 				</Typography.Link>
	// 			),
	// 			visible: info?.[`${IS_EMAIL_PUBLIC_PROP}`],
	// 		},
	// 		{
	// 			label: <PhoneOutlined />,
	// 			title: (
	// 				<Typography.Link>
	// 					{info?.[`${IS_PHONE_PUBLIC_PROP}`] && info?.[`${PHONE_PROP}`] ? (
	// 						info?.[`${PHONE_PROP}`]
	// 					) : (
	// 						<span className="text-secondary">Unavailable</span>
	// 					)}
	// 				</Typography.Link>
	// 			),
	// 			visible: info?.[`${IS_PHONE_PUBLIC_PROP}`],
	// 		},
	// 		{
	// 			label: <LinkOutlined />,
	// 			title: (
	// 				<Typography.Link>
	// 					{info?.[`${IS_WEBSITE_PUBLIC_PROP}`] &&
	// 					info?.[`${WEBSITE_PROP}`] ? (
	// 						info?.[`${WEBSITE_PROP}`]
	// 					) : (
	// 						<span className="text-secondary">Unavailable</span>
	// 					)}
	// 				</Typography.Link>
	// 			),
	// 			visible: info?.[`${IS_WEBSITE_PUBLIC_PROP}`],
	// 		},
	// 		{
	// 			label: <TeamOutlined />,
	// 			title: (
	// 				<Typography.Link>
	// 					{info?.[`${IS_SIZE_PUBLIC_PROP}`] && info?.[`${SIZE_PROP}`] ? (
	// 						info?.[`${SIZE_PROP}`]
	// 					) : (
	// 						<span className="text-secondary">Unavailable</span>
	// 					)}
	// 				</Typography.Link>
	// 			),
	// 			visible: info?.[`${IS_SIZE_PUBLIC_PROP}`],
	// 		},
	// 		...(info?.[`${IS_DESCRIPTION_PUBLIC_PROP}`] &&
	// 		info?.[`${DESCRIPTION_PROP}`]
	// 			? [
	// 					{
	// 						title: (
	// 							<Typography.Paragraph italic>
	// 								{info?.[`${DESCRIPTION_PROP}`]}
	// 							</Typography.Paragraph>
	// 						),
	// 						visible: info?.[`${IS_SIZE_PUBLIC_PROP}`],
	// 					},
	// 			  ]
	// 			: []),
	// 		{
	// 			label: (
	// 				<Typography.Text type="secondary">Last updated:</Typography.Text>
	// 			),
	// 			title: (
	// 				<Typography.Text type="secondary">
	// 					{formatTime(info?.[`${UPDATED_ON_PROP}`])}
	// 				</Typography.Text>
	// 			),
	// 		},
	// 	];

	// 	const infoDescription = (
	// 		<Descriptions
	// 			column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
	// 			colon={false}
	// 			title={
	// 				<Typography.Title level={3} className="p-0 m-0 w-75" ellipsis>
	// 					Business Information
	// 				</Typography.Title>
	// 			}
	// 			className="mt-3"
	// 			extra={[
	// 				...(isOwner
	// 					? [
	// 							<Button type="primary" shape="round" key={id}>
	// 								Edit Profile
	// 							</Button>,
	// 					  ]
	// 					: []),
	// 			]}
	// 		>
	// 			{(type === PROFILE_BUSINESS_TYPE_PROP
	// 				? businessData
	// 				: userData || []
	// 			).map((item, idx) => (
	// 				<Descriptions.Item
	// 					key={idx}
	// 					contentStyle={{
	// 						width: "90%",
	// 						...(isOwner && item.visible && { display: "block" }),
	// 					}}
	// 					labelStyle={{
	// 						alignItems: "center",
	// 						...(isOwner &&
	// 							item.visible && {
	// 								alignItems: "baseline",
	// 								paddingTop: ".5rem",
	// 							}),
	// 					}}
	// 					label={<>{item.label}</>}
	// 				>
	// 					{item.title}
	// 					<br />
	// 					{isOwner && item.visible && (
	// 						<div>
	// 							<Typography.Text className="text-danger">
	// 								This information is public to everyone
	// 							</Typography.Text>
	// 						</div>
	// 					)}
	// 				</Descriptions.Item>
	// 			))}
	// 		</Descriptions>
	// 	);

	// 	const infoCard = (
	// 		<Card
	// 			className="bg-transparent"
	// 			bordered={false}
	// 			title={infoTitle}
	// 			loading={isEmptyObject(profile)}
	// 		>
	// 			<Divider />
	// 			{infoDescription}
	// 		</Card>
	// 	);

	// 	const [searchParams] = useSearchParams();
	// 	const keywordParam = searchParams.get(SEARCH_KEYWORD) || "";
	// 	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || SEARCH_DEAL;
	// 	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;
	// 	const { dispatchSearch } = useSearch();
	// 	const { [`${SEARCH_RESULT_OBJ}`]: searchResult = {} } =
	// 		useSelector(thainowReducer);

	// 	const { [`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults = [] } = searchResult;

	// 	const [searching, setSearching] = useState(true);

	// 	const [actionType, setActionType] = useState(SEARCH_SERVICE);

	// 	useEffect(() => {
	// 		if (searching) {
	// 			console.log("searching");
	// 			setSearching(false);

	// 			dispatchSearch(searchTypeParam, {
	// 				[`${POST_OWNER_ID_PROP}`]: id,
	// 			});

	// 			// if (actionType === SEARCH_SERVICE) {
	// 			// 	dispatchSearch(searchTypeParam, {
	// 			// 		[`${POST_OWNER_ID_PROP}`]: id,
	// 			// 	}).then(() => setSearching(false));
	// 			// }
	// 		}
	// 	}, []);

	// 	const serviceTagItems = [
	// 		(props = {}) => (
	// 			<DealBadge
	// 				type="tag"
	// 				active={searchTypeParam === SEARCH_DEAL}
	// 				onClick={() => alert(SEARCH_DEAL)}
	// 				{...props}
	// 			/>
	// 		),

	// 		(props = {}) => (
	// 			<JobBadge
	// 				type="tag"
	// 				active={searchTypeParam === SEARCH_JOB}
	// 				onClick={() => alert(SEARCH_JOB)}
	// 				{...props}
	// 			/>
	// 		),

	// 		(props = {}) => (
	// 			<HousingBadge
	// 				type="tag"
	// 				active={searchTypeParam === SEARCH_HOUSING}
	// 				onClick={() => alert(SEARCH_HOUSING)}
	// 				{...props}
	// 			/>
	// 		),

	// 		(props = {}) => (
	// 			<MarketplaceBadge
	// 				type="tag"
	// 				active={searchTypeParam === SEARCH_MARKETPLACE}
	// 				onClick={() => alert(SEARCH_MARKETPLACE)}
	// 				{...props}
	// 			/>
	// 		),
	// 	];

	// 	const searchKeywordTag = (
	// 		<Tag>
	// 			<div className="tedkvn-center">
	// 				{keywordParam}
	// 				<CloseOutlined
	// 					className="mx-2"
	// 					style={{
	// 						cursor: "pointer",
	// 					}}
	// 					onClick={() =>
	// 						dispatchSearch(searchTypeParam, {
	// 							[`${SEARCH_KEYWORD}`]: "",
	// 						})
	// 					}
	// 				/>
	// 			</div>
	// 		</Tag>
	// 	);

	// 	const serviceTitle = (
	// 		<Space
	// 			direction="horizontal"
	// 			className="hideScrollHorizontal my-3 w-100"
	// 			style={{
	// 				overflowX: "scroll",
	// 			}}
	// 			size={3}
	// 		>
	// 			{serviceTagItems.map((tag, idx) => (
	// 				<React.Fragment key={idx}>
	// 					{tag({
	// 						tagClassName: "p-1 px-3 rounded lh-base",
	// 					})}
	// 				</React.Fragment>
	// 			))}
	// 		</Space>
	// 	);

	// 	const serviceResultHeaderMenu = (
	// 		<Menu
	// 			mode="horizontal"
	// 			className="px-2"
	// 			style={{
	// 				lineHeight: "2rem",
	// 			}}
	// 			items={[
	// 				{
	// 					key: SEARCH_SORT + "2",
	// 					label: "Sort By",
	// 					style: { cursor: "pointer" },
	// 					children: [
	// 						{
	// 							key: SEARCH_SORT_DATE + "3",
	// 							label: "Sort by Date",
	// 						},
	// 						{
	// 							key: SEARCH_SORT_DISTANCE + "4",
	// 							label: "Sort by Distance",
	// 						},
	// 					],
	// 				},
	// 			]}
	// 			onClick={({ key }) => console.log(key)}
	// 		/>
	// 	);

	// 	const serviceResultHeader = (
	// 		<>
	// 			<Row justify="space-between" align="middle" className="my-0 my-md-4">
	// 				<Col>
	// 					<Typography.Title level={3} className="m-0">
	// 						All {keywordParam.length > 0 && `" ${keywordParam} "`} Results
	// 					</Typography.Title>
	// 				</Col>

	// 				<Col>
	// 					{screens?.xs ? (
	// 						<Dropdown overlay={serviceResultHeaderMenu} trigger={["click"]}>
	// 							<Space>
	// 								<MoreOutlined
	// 									className="c-primary-important"
	// 									style={{ cursor: "pointer" }}
	// 								/>
	// 							</Space>
	// 						</Dropdown>
	// 					) : (
	// 						serviceResultHeaderMenu
	// 					)}
	// 				</Col>

	// 				{keywordParam.length > 0 && (
	// 					<Col xs={24} order={3}>
	// 						{searchKeywordTag}
	// 					</Col>
	// 				)}
	// 			</Row>
	// 		</>
	// 	);

	// 	const serviceResult = <>{serviceResultHeader}</>;

	// 	const action = {
	// 		[`${SEARCH_SERVICE}`]: {
	// 			title: serviceTitle,
	// 			children: serviceResult,
	// 			loading: searching,
	// 		},

	// 		[`${SEARCH_WISHLIST}`]: {
	// 			loading: true,
	// 		},
	// 		[`${SEARCH_REVIEW}`]: {
	// 			loading: true,
	// 		},
	// 	};

	// 	const actionTitleOptions = [
	// 		{
	// 			label: "Services",
	// 			value: SEARCH_SERVICE,
	// 		},
	// 		{
	// 			label: "Wish List",
	// 			value: SEARCH_WISHLIST,
	// 		},
	// 		{
	// 			label: "Reviews",
	// 			value: SEARCH_REVIEW,
	// 		},
	// 	];

	// 	const actionTitle = (
	// 		<Segmented block options={actionTitleOptions} onChange={setActionType} />
	// 	);

	// 	const extraActionCard = (
	// 		<>
	// 			{actionTitle}
	// 			<Card
	// 				className="bg-transparent "
	// 				bordered={false}
	// 				title={action?.[`${actionType}`]?.title}
	// 				headStyle={{
	// 					paddingTop: "0",
	// 				}}
	// 				loading={action?.[`${actionType}`]?.loading}
	// 			>
	// 				{action?.[`${actionType}`]?.children}
	// 			</Card>
	// 		</>
	// 	);

	// 	const app = (
	// 		<>
	// 			{header}
	// 			{cover}
	// 			{infoCard}
	// 			{extraActionCard}
	// 		</>
	// 	);
	// 	return app;
	// };

	const app = (
		<>
			{isEmptyObject(profile) ? (
				skeletonCard
			) : (
				<ProfilePage
					isOwner={profile?.[`${ID_PROP}`] === signedProfile?.[`${ID_PROP}`]}
					profile={profile}
				/>
			)}
		</>
	);
	return app;
}

export default ProfilePageContainer;
