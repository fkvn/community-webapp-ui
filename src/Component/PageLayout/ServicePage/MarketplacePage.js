import Icon, {
	AimOutlined,
	DeleteFilled,
	DoubleRightOutlined,
	EditFilled,
	ExclamationCircleFilled,
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
	Dropdown,
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
import DescriptionsItem from "antd/lib/descriptions/Item";
import { isEmptyObject } from "jquery";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { iconLocationBlack, svgMarketplaceIcon } from "../../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CATEGORY_PROP,
	COMPANY_INDUSTRY_PROP,
	CONDITION_PROP,
	CONTACT_INFO_PROP,
	COST_PROP,
	CREATED_ON_PROP,
	DEFAULT_MARKETPLACE_INFO,
	DEFAULT_POST_OWNER_INFO,
	DESCRIPTION_PROP,
	EDIT_PROP,
	EMAIL_PROP,
	EXPIRED_ON_PROP,
	FORWARD_CLOSE,
	FORWARD_CONTINUE,
	ID_PROP,
	INFO_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	MARKETPLACE_HEADLINE_PROP,
	NAME_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	POST_OWNER_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
	REPORT_SERVICE_TYPE_PROP,
	SEARCH_MARKETPLACE,
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
import { formatTime } from "../../../Util/Util";
import useImage from "../../Hook/useImage";
import useUrls from "../../Hook/useUrls";
import Share from "../../Share/Share";
import BlockService from "../EditService/BlockService";
import RemoveService from "../EditService/RemoveService";
import Report from "../Report/Report";
import ReviewPage from "../ReviewPage/ReviewPage";

function MarketplacePage({ isOwner = false, service = {} }) {
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

	info = { ...DEFAULT_MARKETPLACE_INFO, ...info };

	const [review, setReview] = useState({
		[`${AVG_RATING_PROP}`]: avgRating,
		[`${TOTAL_REVIEW_PROP}`]: totalReview,
	});

	const headerExtraMoreMenu = (
		<Menu
			items={[
				{
					key: "BLOCK",
					label: (
						<BlockService
							serviceId={id}
							iconOnly={false}
							buttonProps={{
								className: "border-0 bg-transparent text-dark",
								shape: "",
							}}
						/>
					),
				},
				{
					key: "REPORT",
					label: (
						<Report
							key={0}
							type={REPORT_SERVICE_TYPE_PROP}
							typeId={id}
							iconOnly={false}
							buttonProps={{
								className: "border-0 bg-transparent text-dark",
								shape: "",
							}}
						/>
					),
				},
			]}
		/>
	);

	const header = (
		<PageHeader
			ghost={true}
			className="px-0 py-3"
			onBack={() => forwardUrl(FORWARD_CLOSE)}
			title="Back"
			extra={[
				<Share key={0} url={window.location.href} />,
				<Dropdown key={1} overlay={headerExtraMoreMenu}>
					<Button type="danger" className="px-2" shape="round">
						<ExclamationCircleFilled style={{ fontSize: "1rem" }} />
					</Button>
				</Dropdown>,
			]}
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
						src: svgMarketplaceIcon,
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
				width: 18,
				src: svgMarketplaceIcon,
			}),
			title: (
				<Typography.Text
					className="c-marketplace"
					style={{
						width: "95%",
					}}
					ellipsis={{
						tooltip: true,
					}}
				>
					{MARKETPLACE_HEADLINE_PROP.toUpperCase()} SERVICE
					{info?.[`${EXPIRED_ON_PROP}`] && (
						<small className="text-danger">
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
								{info?.[`${CATEGORY_PROP}`]}
							</Typography.Text>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Condition:</span>
				</Space>
			),
			...(info?.[`${CONDITION_PROP}`]
				? {
						title: (
							<Typography.Text
								type="success"
								ellipsis={{
									tooltip: true,
								}}
							>
								{info?.[`${CONDITION_PROP}`]}
							</Typography.Text>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Cost starts at:</span>
				</Space>
			),
			...(info?.[`${COST_PROP}`]
				? {
						title: (
							<Typography.Text
								type="success"
								ellipsis={{
									tooltip: true,
								}}
							>
								${info?.[`${COST_PROP}`]}
							</Typography.Text>
						),
				  }
				: {}),
			span: info?.[`${DESCRIPTION_PROP}`] ? 2 : 1,
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
											`/${EDIT_PROP}/${SEARCH_SERVICE}/${SEARCH_MARKETPLACE}/${id}`,
											`/${SEARCH_SERVICE}/${SEARCH_MARKETPLACE}/${id}`
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
					span={item?.span ? item.span : 1}
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

export default MarketplacePage;
