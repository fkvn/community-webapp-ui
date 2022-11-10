import { Card, Carousel, Col, Grid, Row, Space, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useLocation, useNavigate } from "react-router-dom";
import { svgHousingIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CLOSE_URL,
	DEFAULT_CARD_INFO,
	DEFAULT_HOUSING_INFO,
	DESCRIPTION_PROP,
	HOUSING_HEADLINE_PROP,
	ID_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	PICTURE_LIST_PROP,
	SEARCH_HOUSING,
	SEARCH_SERVICE,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";
import useImage from "../Hook/useImage";
import RateDisplay from "../RateDisplay/RateDisplay";

function HousingCard({ card = DEFAULT_CARD_INFO }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const navigate = useNavigate();
	const location = useLocation();
	const { image } = useImage();

	const { info, postOwner, ...rest } = card;

	// const ownerInfo = { ...DEFAULT_POST_OWNER_INFO, ...postOwner };
	const detailInfo = { ...DEFAULT_HOUSING_INFO, ...info };
	const basicInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const serviceTagOverlay = (
		<div className="bg-housing-important service-tag-overlay">
			<Space
				direction="horizontal"
				className="px-3 pt-2 pb-1"
				style={{
					width: "90%",
				}}
				size={10}
			>
				{image({
					width: 20,
					src: svgHousingIconWhite,
				})}
				<Typography.Title level={5} className="text-white m-0 mb-1" ellipsis>
					{HOUSING_HEADLINE_PROP.toUpperCase()}
					{" SERVICE "}
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
			{detailInfo?.[`${TITLE_PROP}`]}
		</Typography.Title>
	);

	const cover = (
		<div style={{ position: "relative" }}>
			<Carousel dots={true} autoplay>
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
		<Row
			justify="space-between"
			className="m-2 mx-3"
			style={{
				paddingLeft: ".2rem",
			}}
		>
			<Col style={{ width: "80%" }}>{title} </Col>
			<Col style={{ maxWidth: "20%" }}>
				<Typography.Text ellipsis className="text-muted ">
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
										detailInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]
									}/${detailInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
										detailInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
									}`,
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
	);

	const defaultCard = (
		<Typography.Link
			onClick={() =>
				navigate(
					`/${SEARCH_SERVICE}/${SEARCH_HOUSING}/${basicInfo?.[`${ID_PROP}`]}`,
					{
						state: {
							[`${CLOSE_URL}`]: location?.pathname + location?.search || "/",
						},
					}
				)
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
	// 									detailInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]
	// 								}/${detailInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
	// 									detailInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
	// 								}`,
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
	// 			navigate(
	// 				`/${SEARCH_SERVICE}/${SEARCH_HOUSING}/${basicInfo?.[`${ID_PROP}`]}`,
	// 				{
	// 					state: {
	// 						[`${CLOSE_URL}`]: location?.pathname + location?.search || "/",
	// 					},
	// 				}
	// 			)
	// 		}
	// 	>
	// 		<Card cover={cover}>{mobileBody}</Card>
	// 	</Typography.Link>
	// );

	const app = defaultCard;

	return app;
}

export default HousingCard;
