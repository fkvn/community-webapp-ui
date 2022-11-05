import Icon, {
	AimOutlined,
	LinkOutlined,
	MailOutlined,
	PhoneOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Button,
	Card,
	Carousel,
	Descriptions,
	Divider,
	Grid,
	Image,
	PageHeader,
	Rate,
	Segmented,
	Space,
	Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { isEmptyObject } from "jquery";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { iconLocationBlack } from "../../../Assest/Asset";
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
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_REVIEW_PROP,
	PROFILE_TYPE_PROP,
	SEARCH_BUSINESS,
	SEARCH_KEYWORD,
	SEARCH_PROFILE,
	SEARCH_REVIEW,
	SEARCH_SERVICE,
	SEARCH_TYPE_PROP,
	SIZE_PROP,
	STATUS_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import useImage from "../../Hook/useImage";

import { formatTime } from "../../../Util/Util";
import useUrls from "../../Hook/useUrls";
import ReviewPage from "../ReviewPage/ReviewPage";
import SearchResultPage1 from "./SearchResultPage1";

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
									maxHeight: screens.xs ? "15rem" : "30rem",
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
		<Meta
			className="mt-2"
			{...(info?.[`${PICTURE_LIST_PROP}`]?.length > 0 && {
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
							value={review?.[`${AVG_RATING_PROP}`]}
							allowHalf
							style={{ backgroundColor: "gray !important" }}
							className="c-housing-important m-0"
						/>
						<span className="ant-rate-text c-housing-important">
							{review?.[`${TOTAL_REVIEW_PROP}`]} Reviews
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
								href={`https://www.google.com/maps/place/${
									info?.[`${NAME_PROP}`]
								}/@${info?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
									info?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
								} `}
								target="_blank"
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
								href={`https://www.google.com/maps/place/${
									info?.[`${NAME_PROP}`]
								}/@${info?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
									info?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
								} `}
								target="_blank"
							>
								{info?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
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

	const action = {
		[`${SEARCH_SERVICE}`]: (
			<SearchResultPage1
				withBusiness={false}
				withOwner={true}
				ownerId={id}
				withBrowsingText={false}
				withCardTitle={false}
			/>
		),
		// [`${SEARCH_WISHLIST}`]: <></>,
		[`${SEARCH_REVIEW}`]: (
			<ReviewPage
				type={PROFILE_REVIEW_PROP}
				revieweeId={id}
				totalReview={review?.[`${TOTAL_REVIEW_PROP}`]}
				avgRating={review?.[`${AVG_RATING_PROP}`]}
				setReview={(values = {}) => setReview({ ...review, ...values })}
			/>
		),
	};

	const actionTitleOptions = [
		{
			label: "Services",
			value: SEARCH_SERVICE,
		},

		{
			label: "Reviews",
			value: SEARCH_REVIEW,
		},
	];

	const [actionPage, setActionPage] = useState(
		searchParams.get(SEARCH_TYPE_PROP) === SEARCH_REVIEW
			? SEARCH_REVIEW
			: SEARCH_SERVICE
	);

	const actionTitle = (
		<Segmented
			block
			defaultValue={actionPage}
			options={actionTitleOptions}
			onChange={(value) => setActionPage(value)}
		/>
	);

	const extraActionCard = (
		<>
			{actionTitle}
			<Card
				className="bg-transparent "
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

export default ProfilePage;
