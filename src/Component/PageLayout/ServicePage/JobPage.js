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
import { useCallback, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { iconLocationBlack, svgJobIcon } from "../../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	COMPANY_INDUSTRY_PROP,
	CONTACT_INFO_PROP,
	CREATED_ON_PROP,
	DEFAULT_JOB_INFO,
	DEFAULT_POST_OWNER_INFO,
	DESCRIPTION_PROP,
	EDIT_PROP,
	EMAIL_PROP,
	EXPERIENCE_PROP,
	EXPIRED_ON_PROP,
	FORWARD_CLOSE,
	FORWARD_CONTINUE,
	ID_PROP,
	INFO_PROP,
	IS_REMOTE_PROP,
	JOB_HEADLINE_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	NAME_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	POSITION_LIST_PROP,
	POST_OWNER_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
	SALARY_PROP,
	SEARCH_JOB,
	SEARCH_PROFILE,
	SEARCH_QUESTION,
	SEARCH_REVIEW,
	SEARCH_SERVICE,
	SEARCH_TYPE_PROP,
	SKILL_PROP,
	STATUS_PROP,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import { formatSentenseCase, formatTime } from "../../../Util/Util";
import useImage from "../../Hook/useImage";
import useUrls from "../../Hook/useUrls";
import RemoveService from "../EditService/RemoveService";

function JobPage({ isOwner = false, service = {} }) {
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

	info = { ...DEFAULT_JOB_INFO, ...info };

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
						width: 25,
						src: svgJobIcon,
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
						defaultValue={avgRating}
						allowHalf
						style={{ backgroundColor: "gray !important" }}
						className="c-housing-important m-0"
					/>
					<span className="ant-rate-text c-housing-important">
						{totalReview} Reviews
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
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || SEARCH_SERVICE;

	const [actionCall, setActionCall] = useState({
		actionType: SEARCH_SERVICE,
		searching: false,
	});

	const initSearch = useCallback(
		async (
			actionType = SEARCH_SERVICE
			// searchType = searchTypeParam,
			// params = {}
		) => {
			// console.log(actionType);
			setActionCall({
				actionType: actionType,
				searching: actionType === SEARCH_SERVICE ? false : true,
			});

			// onSearchHandle(actionType, searchType, params).then(() =>
			// 	setActionCall({
			// 		actionType: actionType,
			// 		searching: false,
			// 	})
			// );
		},
		[actionCall?.searching, id, searchTypeParam]
	);

	const actionTitleOptions = [
		{
			label: "Details",
			value: SEARCH_SERVICE,
		},
		{
			label: "FAQ",
			value: SEARCH_QUESTION,
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

	const descriptionData = [
		{
			label: image({
				width: 18,
				src: svgJobIcon,
			}),
			title: (
				<Typography.Text
					className="c-job"
					style={{
						width: "95%",
					}}
					ellipsis={{
						tooltip: true,
					}}
				>
					{JOB_HEADLINE_PROP.toUpperCase()} SERVICE
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
					<span className="px-1">Postion:</span>
				</Space>
			),
			...(info?.[`${POSITION_LIST_PROP}`]?.length > 0
				? {
						title: (
							<Typography.Text
								type="success"
								ellipsis={{
									tooltip: true,
								}}
							>
								{info?.[`${POSITION_LIST_PROP}`]
									.map((postion) => formatSentenseCase(postion))
									?.join(", ")}
							</Typography.Text>
						),
				  }
				: {}),
		},
		...(info?.[`${IS_REMOTE_PROP}`]
			? [
					{
						label: <AimOutlined />,
						title: (
							<Typography.Link ellipsis>Remote work available</Typography.Link>
						),
					},
			  ]
			: []),
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Experience:</span>
				</Space>
			),
			...(info?.[`${EXPERIENCE_PROP}`]
				? {
						title: (
							<Typography.Link ellipsis>
								{info?.[`${EXPERIENCE_PROP}`]}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Salary:</span>
				</Space>
			),
			...(info?.[`${SALARY_PROP}`]
				? {
						title: (
							<Typography.Link ellipsis>
								{info?.[`${SALARY_PROP}`]}
							</Typography.Link>
						),
				  }
				: {}),
		},
		{
			label: (
				<Space size={5}>
					<AimOutlined />
					<span className="px-1">Skill:</span>
				</Space>
			),
			...(info?.[`${SKILL_PROP}`]
				? {
						title: (
							<Typography.Link ellipsis>
								{info?.[`${SKILL_PROP}`]}
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
											`/${EDIT_PROP}/${SEARCH_SERVICE}/${SEARCH_JOB}/${id}`,
											`/${SEARCH_SERVICE}/${SEARCH_JOB}/${id}`
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
		[`${SEARCH_REVIEW}`]: <></>,
	};

	const extraActionCard = (
		<>
			{actionTitle}
			<Card
				className="bg-transparent pb-0"
				bordered={false}
				bodyStyle={{
					padding: "1rem 0",
				}}
				loading={actionCall?.searching}
			>
				{action?.[`${actionCall?.actionType}`]}
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

export default JobPage;
