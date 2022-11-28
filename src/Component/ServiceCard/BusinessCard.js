import { Card, Carousel, Col, Grid, Row, Space, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useLocation, useNavigate } from "react-router-dom";
import { svgBusinessIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CLOSE_URL,
	COMPANY_INDUSTRY_PROP,
	COMPANY_NAME_PROP,
	DEFAULT_BUSINESS_INFO,
	DEFAULT_CARD_INFO,
	DESCRIPTION_PROP,
	ID_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	NAME_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	SEARCH_PROFILE,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";

import useImage from "../Hook/useImage";
import RateDisplay from "../RateDisplay/RateDisplay";

function BusinessCard({ card = DEFAULT_CARD_INFO }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const navigate = useNavigate();
	const location = useLocation();
	const { image } = useImage();

	const { info, ...rest } = card;

	const detailInfo = { ...DEFAULT_BUSINESS_INFO, ...info };
	const basicInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const serviceTagOverlay = (
		<div className="bg-business-important service-tag-overlay">
			<Space
				direction="horizontal"
				className="px-3 pt-1"
				style={{
					width: "90%",
				}}
				size={10}
			>
				{image({
					width: 21,
					src: svgBusinessIconWhite,
				})}
				<Typography.Title level={5} className="text-white m-0 mb-1" ellipsis>
					{detailInfo?.[`${COMPANY_INDUSTRY_PROP}`].toUpperCase()}
					{" BUSINESS "}
				</Typography.Title>
			</Space>
		</div>
	);

	const title = (
		<Typography.Title
			className="m-0 p-0 c-primary-important"
			level={3}
			ellipsis
		>
			{detailInfo?.[`${NAME_PROP}`]}
		</Typography.Title>
	);

	const cover = (
		<div style={{ position: "relative" }}>
			<Carousel dots={true} autoplay dotPosition="right">
				<div style={{ position: "relative" }}>
					<div className="w-100">
						{image({
							width: "100%",
							style: {
								height: screens.xl ? "23rem" : "18rem",
							},
							src: detailInfo?.[`${PICTURE_PROP}`],
						})}
					</div>
				</div>
				{detailInfo?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
					<div key={idx}>
						<div>
							{image({
								width: "100%",
								style: {
									height: screens.xl ? "23rem" : "18rem",
								},
								src: img,
							})}
						</div>
					</div>
				))}
			</Carousel>

			{serviceTagOverlay}
		</div>
	);

	const body = (
		<>
			<Row
				justify="space-between"
				className="m-2 mx-3"
				style={{
					paddingLeft: ".2rem",
				}}
				align="middle"
			>
				<Col style={{ width: "60%" }}>{title}</Col>
				<Col style={{ maxWidth: "30%" }}>
					<Typography.Text ellipsis className="text-muted">
						{/* Updated{" "} */}
						{formatTime(detailInfo?.[`${UPDATED_ON_PROP}`]) ||
							detailInfo?.[`${UPDATED_ON_PROP}`]?.split(" ")?.[0]}
					</Typography.Text>
				</Col>
				<Col xs={24} className=" mt-1">
					<RateDisplay
						value={basicInfo?.[`${AVG_RATING_PROP}`]}
						totalReview={basicInfo?.[`${TOTAL_REVIEW_PROP}`]}
					/>
				</Col>
				<Col xs={24} className="mt-2 mb-3" style={{ fontSize: ".95rem" }}>
					<Meta
						title={
							<Typography.Paragraph className="m-0 mb-1" ellipsis>
								{detailInfo?.[`${DESCRIPTION_PROP}`]}
							</Typography.Paragraph>
						}
						description={
							<Typography.Text
								className="c-primary-important"
								onClick={() =>
									window.open(
										`https://www.google.com/maps/place/${
											detailInfo?.[`${COMPANY_NAME_PROP}`]
										}/@${detailInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
											detailInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
										} `,
										"_blank"
									)
								}
								ellipsis
							>
								{detailInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
							</Typography.Text>
						}
					/>
				</Col>
			</Row>
		</>
	);

	const defaultCard = (
		<Typography.Link
			onClick={() =>
				navigate(`/${SEARCH_PROFILE}/${basicInfo?.[`${ID_PROP}`]}`, {
					state: {
						[`${CLOSE_URL}`]: location?.pathname + location?.search || "/",
					},
				})
			}
		>
			<Card cover={cover}>{body}</Card>
		</Typography.Link>
	);

	// const mobileBody = screens.xs && (
	// 	<Row
	// 		justify="space-between"
	// 		className="m-2"
	// 		style={{
	// 			paddingLeft: ".2rem",
	// 		}}
	// 	>
	// 		<Col xs={24}>{title}</Col>
	// 		<Col>
	// 			<span>
	// 				<Rate
	// 					disabled
	// 					defaultValue={basicInfo?.[`${AVG_RATING_PROP}`]}
	// 					allowHalf
	// 					style={{ fontSize: "1rem" }}
	// 					className="c-housing-important m-0"
	// 				/>
	// 			</span>
	// 		</Col>
	// 		<Col xs={24} className="my-2">
	// 			<Meta
	// 				description={
	// 					<Typography.Text
	// 						className="c-primary-important"
	// 						onClick={() =>
	// 							window.open(
	// 								`https://www.google.com/maps/place/${
	// 									detailInfo?.[`${COMPANY_NAME_PROP}`]
	// 								}/@${detailInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
	// 									detailInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
	// 								} `,
	// 								"_blank"
	// 							)
	// 						}
	// 						ellipsis
	// 					>
	// 						{detailInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
	// 					</Typography.Text>
	// 				}
	// 			/>
	// 		</Col>
	// 	</Row>
	// );

	// const mobileCard = screens.xs && (
	// 	<Typography.Link
	// 		onClick={() =>
	// 			navigate(`/${SEARCH_PROFILE}/${basicInfo?.[`${ID_PROP}`]}`, {
	// 				state: {
	// 					[`${CLOSE_URL}`]: location?.pathname + location?.search || "/",
	// 				},
	// 			})
	// 		}
	// 	>
	// 		<Card cover={cover}>{body}</Card>
	// 	</Typography.Link>
	// );

	const app = defaultCard;
	return app;
}

export default BusinessCard;
