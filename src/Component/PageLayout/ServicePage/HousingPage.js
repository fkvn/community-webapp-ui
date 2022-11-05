import Icon, {
	AimOutlined,
	DeleteFilled,
	DoubleRightOutlined,
	EditFilled,
	LinkOutlined,
	MailOutlined,
	PhoneOutlined,
	ThunderboltOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Button,
	Card,
	Carousel,
	Col,
	Descriptions,
	Divider,
	Grid,
	Image,
	PageHeader,
	Rate,
	Row,
	Segmented,
	Space,
	Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { isEmptyObject } from "jquery";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
	iconLocationBlack,
	svgAcIconBlack,
	svgCookingIconBlack,
	svgDryerIconBlack,
	svgHousingIcon,
	svgMicrowaveIconBlack,
	svgPetAllowedIconBlack,
	svgRefrigeratorIconBlack,
	svgWasherIconBlack,
	svgWifiIconBlack,
} from "../../../Assest/Asset";
import {
	ADDRESS_PROP,
	AMENITY_AIR_CONDITIONER_PROP,
	AMENITY_COOKING_BASIC_PROP,
	AMENITY_DRYER_PROP,
	AMENITY_LIST_PROP,
	AMENITY_MICROWAVE_PROP,
	AMENITY_PET_ALLOWED_PROP,
	AMENITY_REFRIGERATOR_PROP,
	AMENITY_WASHER_PROP,
	AMENITY_WIFI_PROP,
	ANNUAL_COST_PROP,
	AVG_RATING_PROP,
	CATEGORY_PROP,
	COMPANY_INDUSTRY_PROP,
	CONTACT_INFO_PROP,
	CREATED_ON_PROP,
	DAILY_COST_PROP,
	DEFAULT_HOUSING_INFO,
	DEFAULT_POST_OWNER_INFO,
	DEPOSIT_COST_PROP,
	DESCRIPTION_PROP,
	EDIT_PROP,
	EMAIL_PROP,
	EXPIRED_ON_PROP,
	FORWARD_CLOSE,
	FORWARD_CONTINUE,
	HOUSING_HEADLINE_PROP,
	HOUSING_TYPE_PROP,
	ID_PROP,
	INFO_PROP,
	INTERIOR_BATH_PROP,
	INTERIOR_BED_PROP,
	INTERIOR_GUEST_PROP,
	INTERIOR_PARKING_PROP,
	INTERIOR_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	MONTHLY_COST_PROP,
	NAME_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	POST_OWNER_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
	SEARCH_HOUSING,
	SEARCH_PROFILE,
	SEARCH_QUESTION,
	SEARCH_REVIEW,
	SEARCH_SERVICE,
	SEARCH_TYPE_PROP,
	SERVICE_REVIEW_PROP,
	STATUS_PROP,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import { formatPrice, formatTime } from "../../../Util/Util";
import useImage from "../../Hook/useImage";
import useUrls from "../../Hook/useUrls";
import RemoveService from "../EditService/RemoveService";
import ReviewPage from "../ReviewPage/ReviewPage";

function HousingPage({ isOwner = false, service = {} }) {
	const { forwardUrl } = useUrls();
	const location = useLocation();

	let {
		[`${ID_PROP}`]: id = -1,
		[`${INFO_PROP}`]: info = {},
		[`${AVG_RATING_PROP}`]: avgRating = 0,
		[`${TOTAL_REVIEW_PROP}`]: totalReview = 0,
		[`${POST_OWNER_PROP}`]: postOwner = {},
	} = service;
	const ownerInfo = {
		...DEFAULT_POST_OWNER_INFO,
		...postOwner?.[`${INFO_PROP}`],
	};

	info = { ...DEFAULT_HOUSING_INFO, ...info };

	const [review, setReview] = useState({
		[`${AVG_RATING_PROP}`]: avgRating,
		[`${TOTAL_REVIEW_PROP}`]: totalReview,
	});

	const header = (
		<PageHeader
			ghost={true}
			className="px-0 py-3"
			onBack={() => forwardUrl(FORWARD_CLOSE)}
			title="Back"
		/>
	);

	const [visible, setVisible] = useState({
		value: false,
		idx: 0,
	});
	const { image, avatar } = useImage();

	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const cover = (
		<div>
			<Carousel dots={true} autoplay>
				{(info?.[`${PICTURE_LIST_PROP}`] || []).map((img, idx) => (
					<div key={idx}>
						<div>
							{image({
								width: "100%",
								onClick: () => setVisible({ value: true, idx: idx }),
								preview: { visible: false },
								style: {
									maxHeight: screens.xs ? "15rem" : "30rem",
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
		<Row justify="space-between" className="mt-3">
			<Col xs={24} md={14}>
				<Typography.Title
					level={2}
					ellipsis={{
						rows: 2,
						tooltip: true,
					}}
				>
					{image({
						width: 30,
						src: svgHousingIcon,
					})}
					<span className="mx-2">{info?.[`${TITLE_PROP}`]}</span>
				</Typography.Title>
			</Col>
			{screens.md && (
				<Col>
					<Typography.Text
						key={id}
						type="secondary"
						className="m-0 p-0"
						ellipsis
					>
						Updated {formatTime(info?.[`${UPDATED_ON_PROP}`])}
					</Typography.Text>
				</Col>
			)}
		</Row>
	);

	const infoCard = (
		<Card
			className="bg-transparent"
			bodyStyle={{
				padding: 0,
			}}
			bordered={false}
			loading={isEmptyObject(service)}
		>
			{infoTitle}
			<Row justify="space-start" align="middle">
				<Col xs={24}>
					<Rate
						disabled
						value={review?.[`${AVG_RATING_PROP}`]}
						allowHalf
						style={{ backgroundColor: "gray !important" }}
						className="c-housing-important m-0"
					/>
					<span className="ant-rate-text c-housing-important">
						{review?.[`${TOTAL_REVIEW_PROP}`]} Reviews
					</span>
				</Col>
				<Col xs={24} className="my-3 tedkvn-center">
					<Icon component={() => iconLocationBlack(15)} />
					<Typography.Link
						className="mx-2"
						href={`https://www.google.com/maps/place/${
							info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]
						}/${info?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
							info?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
						}`}
						target="_blank"
						ellipsis
					>
						{info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
					</Typography.Link>
				</Col>
			</Row>
		</Card>
	);

	const [searchParams] = useSearchParams();

	const [actionPage, setActionPage] = useState(
		searchParams.get(SEARCH_TYPE_PROP) === SEARCH_REVIEW
			? SEARCH_REVIEW
			: SEARCH_SERVICE
	);

	const actionTitleOptions = [
		{
			label: "Details",
			value: SEARCH_SERVICE,
		},
		// {
		// 	label: "FAQ",
		// 	value: SEARCH_QUESTION,
		// },
		{
			label: "Reviews",
			value: SEARCH_REVIEW,
		},
	];

	const actionTitle = (
		<Segmented
			block
			defaultValue={actionPage}
			options={actionTitleOptions}
			onChange={(value) => setActionPage(value)}
		/>
	);

	const descriptionData = [
		{
			label: image({
				width: 20,
				src: svgHousingIcon,
			}),
			title: (
				<Typography.Text
					className="c-housing"
					style={{
						width: "95%",
					}}
					ellipsis={{
						tooltip: true,
					}}
				>
					{HOUSING_HEADLINE_PROP.toUpperCase()} SERVICE
					{info?.[`${EXPIRED_ON_PROP}`] && (
						<small className="text-secondary">
							{" "}
							- Expired at {info?.[`${EXPIRED_ON_PROP}`]}
						</small>
					)}
				</Typography.Text>
			),
		},
		{
			label: (
				<Space size={5}>
					<ThunderboltOutlined />
					<span className="px-1">Category:</span>
				</Space>
			),
			...(info?.[`${CATEGORY_PROP}`]
				? {
						title: (
							<Typography.Text
								type="success"
								ellipsis={{
									tooltip: true,
								}}
							>
								{(info?.[`${HOUSING_TYPE_PROP}`] || "").toUpperCase()}{" "}
								{(info?.[`${CATEGORY_PROP}`] || "").toUpperCase()}
							</Typography.Text>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Interior:</span>
				</Space>
			),
			...(!isEmptyObject(info?.[`${INTERIOR_PROP}`])
				? {
						title: (
							<Typography.Text
								className="c-primary-important"
								ellipsis={{
									tooltip: true,
								}}
							>
								{info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_GUEST_PROP}`] &&
									`${
										info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_GUEST_PROP}`]
									} Guest(s)`}

								{info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_BED_PROP}`] &&
									` - ${
										info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_BED_PROP}`]
									} Bed(s)`}

								{info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_BATH_PROP}`] &&
									` - ${
										info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_BATH_PROP}`]
									} Bath(s)`}

								{info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_PARKING_PROP}`] &&
									` - ${
										info?.[`${INTERIOR_PROP}`]?.[`${INTERIOR_PARKING_PROP}`]
									} Parking(s)`}
							</Typography.Text>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Daily Cost:</span>
				</Space>
			),
			...(info?.[`${DAILY_COST_PROP}`]
				? {
						title: (
							<Typography.Link ellipsis>
								${formatPrice(info?.[`${DAILY_COST_PROP}`])}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Monthly Cost:</span>
				</Space>
			),
			...(info?.[`${MONTHLY_COST_PROP}`]
				? {
						title: (
							<Typography.Link ellipsis>
								${formatPrice(info?.[`${MONTHLY_COST_PROP}`])}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Annual Cost:</span>
				</Space>
			),
			...(info?.[`${ANNUAL_COST_PROP}`]
				? {
						title: (
							<Typography.Link ellipsis>
								${formatPrice(info?.[`${ANNUAL_COST_PROP}`])}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Deposit Cost:</span>
				</Space>
			),
			...(info?.[`${DEPOSIT_COST_PROP}`]
				? {
						title: (
							<Typography.Link ellipsis>
								${formatPrice(info?.[`${DEPOSIT_COST_PROP}`])}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<DoubleRightOutlined />
					<span className="px-1">Description:</span>
				</Space>
			),
			...(info?.[`${DESCRIPTION_PROP}`]
				? {
						title: (
							<Typography.Paragraph italic>
								{info?.[`${DESCRIPTION_PROP}`]}
							</Typography.Paragraph>
						),
				  }
				: {}),
		},
	];

	const description = (
		<Descriptions
			column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
			colon={false}
			className="mt-4"
			title="Service Description"
			extra={[
				...(isOwner
					? [
							<Space key={id}>
								<Button
									type="primary"
									shape="round"
									{...(screens.xs && { size: "small" })}
									onClick={() =>
										forwardUrl(
											FORWARD_CONTINUE,
											"",
											`/${EDIT_PROP}/${SEARCH_SERVICE}/${SEARCH_HOUSING}/${id}`,
											`/${SEARCH_SERVICE}/${SEARCH_HOUSING}/${id}`
										)
									}
								>
									<EditFilled />
								</Button>
								<RemoveService
									ownerId={postOwner?.[`${ID_PROP}`]}
									serviceId={id}
								>
									<Button
										type="danger"
										shape="round"
										{...(screens.xs && { size: "small" })}
									>
										<DeleteFilled />
									</Button>
								</RemoveService>
							</Space>,
					  ]
					: []),
			]}
		>
			{descriptionData.map((item, idx) => (
				<Descriptions.Item
					key={idx}
					label={item.label}
					labelStyle={{
						alignItems: "center",
					}}
				>
					{item?.title ? (
						item.title
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
				</Descriptions.Item>
			))}
		</Descriptions>
	);

	const amenitiesIcon = {
		[`${AMENITY_AIR_CONDITIONER_PROP}`]: svgAcIconBlack,
		[`${AMENITY_WIFI_PROP}`]: svgWifiIconBlack,
		[`${AMENITY_WASHER_PROP}`]: svgWasherIconBlack,
		[`${AMENITY_REFRIGERATOR_PROP}`]: svgRefrigeratorIconBlack,
		[`${AMENITY_COOKING_BASIC_PROP}`]: svgCookingIconBlack,
		[`${AMENITY_DRYER_PROP}`]: svgDryerIconBlack,
		[`${AMENITY_MICROWAVE_PROP}`]: svgMicrowaveIconBlack,
		[`${AMENITY_PET_ALLOWED_PROP}`]: svgPetAllowedIconBlack,
	};

	const amenitiesData = (info?.[`${AMENITY_LIST_PROP}`] || []).map((item) => {
		return {
			label: <Image src={amenitiesIcon?.[`${item.toUpperCase()}`]} />,
			title: (
				<Typography.Text
					className="c-primary-important"
					style={{
						marginTop: ".1rem",
					}}
					ellipsis={{
						tooltip: true,
					}}
				>
					{item}
				</Typography.Text>
			),
		};
	});

	const amenities = amenitiesData?.length > 0 && (
		<Descriptions
			column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
			colon={false}
			className="mt-4"
			title="Available Amenities"
		>
			{amenitiesData.map((item, idx) => (
				<Descriptions.Item
					key={idx}
					label={item.label}
					labelStyle={{
						alignItems: "center",
					}}
				>
					{item?.title ? (
						item.title
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
				</Descriptions.Item>
			))}
		</Descriptions>
	);

	const contactData = [
		{
			label: <MailOutlined />,
			...(info?.[`${CONTACT_INFO_PROP}`]?.[`${EMAIL_PROP}`]
				? {
						title: (
							<Typography.Link
								href={`mailto:${
									info?.[`${CONTACT_INFO_PROP}`]?.[`${EMAIL_PROP}`]
								}`}
							>
								{info?.[`${CONTACT_INFO_PROP}`]?.[`${EMAIL_PROP}`]}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: <PhoneOutlined />,
			...(info?.[`${CONTACT_INFO_PROP}`]?.[`${PHONE_PROP}`]
				? {
						title: (
							<Typography.Link
								href={`tel:${
									info?.[`${CONTACT_INFO_PROP}`]?.[`${PHONE_PROP}`]
								}`}
							>
								{info?.[`${CONTACT_INFO_PROP}`]?.[`${PHONE_PROP}`]}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: <LinkOutlined />,
			...(info?.[`${CONTACT_INFO_PROP}`]?.[`${WEBSITE_PROP}`]
				? {
						title: (
							<Typography.Link
								href={info?.[`${CONTACT_INFO_PROP}`]?.[`${WEBSITE_PROP}`]}
								target="_blank"
							>
								{info?.[`${CONTACT_INFO_PROP}`]?.[`${WEBSITE_PROP}`]}
							</Typography.Link>
						),
				  }
				: {}),
		},
	];

	const contactInformation = (
		<Descriptions
			column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
			colon={false}
			className="mt-4"
			title="Contact Information"
		>
			{contactData.map((item, idx) => (
				<Descriptions.Item
					key={idx}
					label={item.label}
					labelStyle={{
						alignItems: "center",
					}}
				>
					{item?.title ? (
						item.title
					) : (
						<span className="text-secondary">Unavailable</span>
					)}
				</Descriptions.Item>
			))}
		</Descriptions>
	);

	const ownerCard = (
		<Card
			className="bg-transparent pb-0"
			bordered={false}
			headStyle={{
				padding: 0,
			}}
			bodyStyle={{
				padding: "1rem 0",
				paddingBottom: 0,
			}}
			title={
				<Typography.Title level={5} className="m-0">
					Posted By
				</Typography.Title>
			}
			extra={[
				<Typography.Link
					key={id}
					className="m-0"
					onClick={() =>
						forwardUrl(
							FORWARD_CONTINUE,
							location?.pathname + location?.search || "/",
							`/${SEARCH_PROFILE}/${postOwner?.[`${ID_PROP}`]}`
						)
					}
					ellipsis
				>
					Visit Owner Page
				</Typography.Link>,
			]}
		>
			<Meta
				avatar={avatar({
					inputProps: {
						src: ownerInfo?.[`${PICTURE_PROP}`],
					},
				})}
				title={
					<Typography.Title
						level={3}
						ellipsis
						className="m-0"
						onClick={() =>
							forwardUrl(
								FORWARD_CONTINUE,
								location?.pathname + location?.search || "/",
								`/${SEARCH_PROFILE}/${postOwner?.[`${ID_PROP}`]}`
							)
						}
					>
						<Typography.Link>{ownerInfo?.[`${NAME_PROP}`]}</Typography.Link>
					</Typography.Title>
				}
				description={
					<>
						<Descriptions colon={false} size="small">
							<DescriptionsItem className="pb-1">
								<span>
									<Rate
										disabled
										defaultValue={postOwner?.[`${AVG_RATING_PROP}`] || 0}
										allowHalf
										style={{
											backgroundColor: "gray !important",
											fontSize: ".9rem",
										}}
										className="c-housing-important m-0"
									/>
									<span className="ant-rate-text c-housing-important">
										{postOwner?.[`${TOTAL_REVIEW_PROP}`] || 0} Reviews
									</span>
								</span>
							</DescriptionsItem>

							<DescriptionsItem
								className="pb-0"
								label={<UserOutlined />}
								labelStyle={{
									alignItems: "center",
								}}
							>
								{postOwner?.[`${PROFILE_TYPE_PROP}`] ===
									PROFILE_BUSINESS_TYPE_PROP && ownerInfo?.[`${STATUS_PROP}`]}

								{postOwner?.[`${PROFILE_TYPE_PROP}`] ===
									PROFILE_USER_TYPE_PROP &&
									`Member since ${
										(ownerInfo?.[`${CREATED_ON_PROP}`] || "")
											.split(" ")?.[0]
											.split("-")?.[2]
									}`}
							</DescriptionsItem>
							{postOwner?.[`${PROFILE_TYPE_PROP}`] ===
								PROFILE_BUSINESS_TYPE_PROP && (
								<DescriptionsItem
									label={<AimOutlined />}
									labelStyle={{
										alignItems: "center",
									}}
								>
									{ownerInfo?.[`${COMPANY_INDUSTRY_PROP}`]}
								</DescriptionsItem>
							)}
						</Descriptions>
					</>
				}
			/>
		</Card>
	);

	const action = {
		[`${SEARCH_SERVICE}`]: (
			<>
				{description}
				{amenities}
				{contactInformation}
				<Divider className="my-2" />
				{ownerCard}
			</>
		),
		[`${SEARCH_QUESTION}`]: <></>,
		[`${SEARCH_REVIEW}`]: (
			<ReviewPage
				type={SERVICE_REVIEW_PROP}
				revieweeId={id}
				totalReview={review?.[`${TOTAL_REVIEW_PROP}`]}
				avgRating={review?.[`${AVG_RATING_PROP}`]}
				setReview={(values = {}) => setReview({ ...review, ...values })}
			/>
		),
	};

	const extraActionCard = (
		<>
			{actionTitle}
			<Card
				className="bg-transparent pb-0"
				bordered={false}
				headStyle={{
					paddingTop: "0",
				}}
				bodyStyle={{
					padding: "0",
				}}
			>
				{action?.[`${actionPage}`]}
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

export default HousingPage;
