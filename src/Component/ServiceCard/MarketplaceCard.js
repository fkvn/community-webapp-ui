import { Card, Carousel, Col, Grid, Rate, Row, Space, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useLocation, useNavigate } from "react-router-dom";
import { svgMarketplaceIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CLOSE_URL,
	DEFAULT_CARD_INFO,
	DEFAULT_MARKETPLACE_INFO,
	DEFAULT_POST_OWNER_INFO,
	ID_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	MARKETPLACE_HEADLINE_PROP,
	PICTURE_LIST_PROP,
	SEARCH_MARKETPLACE,
	SEARCH_SERVICE,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";
import useImage from "../Hook/useImage";
import Share from "../Share/Share";

function MarketplaceCard({ card = DEFAULT_CARD_INFO, withCardTitle = true }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const navigate = useNavigate();
	const location = useLocation();
	const { image } = useImage();

	const { info, postOwner, ...rest } = card;

	const ownerInfo = { ...DEFAULT_POST_OWNER_INFO, ...postOwner };
	const detailInfo = { ...DEFAULT_MARKETPLACE_INFO, ...info };
	const basicInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const serviceTagOverlay = (
		<div className="bg-marketplace-important service-tag-overlay">
			<Space
				direction="horizontal"
				className=" p-0 px-2 py-1 py-md-2 px-md-3"
				style={{
					width: "80%",
				}}
			>
				<div className="tedkvn-center h-100">
					{image({
						width: screens.md === true ? 20 : 20,
						src: svgMarketplaceIconWhite,
					})}
				</div>

				<Typography.Title level={5} className="text-white m-0 p-0" ellipsis>
					<span
						{...(screens.xs === true && {
							style: { fontSize: ".9rem" },
						})}
					>
						{MARKETPLACE_HEADLINE_PROP.toUpperCase()} {" SERVICE "}
					</span>
				</Typography.Title>
			</Space>
		</div>
	);

	const title = (
		<Typography.Title
			className="m-0 p-0 c-primary-important"
			level={screens.xs ? 5 : 3}
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
									height: screens.xs ? "9rem" : "18rem",
								},
								src: img,
							})}
						</div>
					</div>
				))}
			</Carousel>
			<div
				style={{
					position: "absolute",
					top: 10,
					right: 10,
					backgroundColor: "white",
					border: "1px solid whitesmoke",
					borderRadius: "50%",
					zIndex: 799,
				}}
			>
				<Share
					iconProps={{
						style: {
							fontSize: "1.1rem",
						},
					}}
				/>
			</div>
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
			<Col style={{ width: "80%" }}>{title}</Col>
			<Col>
				<Typography.Text ellipsis className="text-muted mt-1">
					{formatTime(detailInfo?.[`${UPDATED_ON_PROP}`]) ||
						detailInfo?.[`${UPDATED_ON_PROP}`]?.split(" ")?.[0]}
				</Typography.Text>
			</Col>
			<Col>
				<span>
					<Rate
						disabled
						defaultValue={basicInfo?.[`${AVG_RATING_PROP}`]}
						allowHalf
						style={{ fontSize: "1rem" }}
						className="c-housing-important m-0"
					/>
				</span>
				<span className="ant-rate-text c-housing-important">
					{basicInfo?.[`${TOTAL_REVIEW_PROP}`]} Reviews
				</span>
			</Col>
			<Col xs={24} className="my-2">
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
			</Col>
		</Row>
	);

	const defaultCard = (
		<Typography.Link
			onClick={() =>
				navigate(
					`/${SEARCH_SERVICE}/${SEARCH_MARKETPLACE}/${
						basicInfo?.[`${ID_PROP}`]
					}`,
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

	const mobileBody = screens.xs && (
		<Row
			justify="space-between"
			className="m-2"
			style={{
				paddingLeft: ".2rem",
			}}
		>
			<Col xs={24}>{title}</Col>
			<Col>
				<span>
					<Rate
						disabled
						defaultValue={basicInfo?.[`${AVG_RATING_PROP}`]}
						allowHalf
						style={{ fontSize: "1rem" }}
						className="c-housing-important m-0"
					/>
				</span>
			</Col>
			<Col xs={24} className="my-2">
				<Meta
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

	const mobileCard = screens.xs && (
		<Typography.Link
			onClick={() =>
				navigate(
					`/${SEARCH_SERVICE}/${SEARCH_MARKETPLACE}/${
						basicInfo?.[`${ID_PROP}`]
					}`,
					{
						state: {
							[`${CLOSE_URL}`]: location?.pathname + location?.search || "/",
						},
					}
				)
			}
		>
			<Card cover={cover}>{mobileBody}</Card>
		</Typography.Link>
	);

	const app = screens.xs ? mobileCard : defaultCard;

	return app;
}

export default MarketplaceCard;
