import { ShareAltOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Card,
	Carousel,
	Col,
	Grid,
	Rate,
	Row,
	Space,
	Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { svgMarketplaceIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CONDITION_PROP,
	DEFAULT_CARD_INFO,
	DEFAULT_MARKETPLACE_CARD,
	DEFAULT_POST_OWNER_INFO,
	ID_PROP,
	INFO_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	MARKETPLACE_HEADLINE_PROP,
	NAME_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";
import useImage from "../Hook/useImage";

function MarketplaceCard({ card = DEFAULT_CARD_INFO }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { info, postOwner, ...rest } = card;

	const postOwnerInfo = { ...DEFAULT_POST_OWNER_INFO, ...postOwner };
	const marketplaceInfo = { ...DEFAULT_MARKETPLACE_CARD, ...info };
	const cardInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const { image } = useImage();

	const serviceTagOverlay = (
		<div className="bg-marketplace-important service-tag-overlay">
			<Space direction="horizontal" className="w-100 p-2 px-3">
				<div className="tedkvn-center h-100">
					{image({
						width: screens?.xs ? 20 : 25,
						src: svgMarketplaceIconWhite,
					})}
				</div>
				<Meta
					title={
						<Typography.Title level={5} className="text-white m-0 p-1" ellipsis>
							<span
								{...(screens?.xs && {
									style: { fontSize: ".8rem" },
								})}
							>
								{marketplaceInfo?.[`${CONDITION_PROP}`]?.length > 0 && (
									<>
										{marketplaceInfo?.[`${CONDITION_PROP}`].toUpperCase()}
										{" - "}
									</>
								)}{" "}
								{MARKETPLACE_HEADLINE_PROP.toUpperCase()}
							</span>
						</Typography.Title>
					}
				/>
			</Space>
		</div>
	);

	const title = (
		<Meta
			className="tedkvn-center-left m-0 m-sm-1"
			avatar={
				<Avatar
					className="m-0 mx-sm-2"
					size={{ xs: 24 }}
					src={postOwnerInfo?.[`${INFO_PROP}`]?.[`${PICTURE_PROP}`]}
				/>
			}
			title={
				<Typography.Title
					className="m-0 p-0 c-primary-important"
					level={screens?.xs ? 5 : 3}
				>
					{postOwner?.[`${INFO_PROP}`]?.[`${NAME_PROP}`]}
				</Typography.Title>
			}
		/>
	);

	const cover = (
		<div>
			<Carousel
				dots={{
					className: "py-5",
				}}
				autoplay
			>
				{marketplaceInfo?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
					<div key={idx}>
						<div>
							{image({
								width: "100%",
								style: {
									maxHeight: screens?.xs ? "15rem" : "18rem",
									objectFit: "cover",
								},
								src: img,
							})}
						</div>
					</div>
				))}
			</Carousel>
			{/* {imageOverlay} */}
			{serviceTagOverlay}
		</div>
	);

	const body = (
		<>
			<Row justify="space-between" className="mb-2">
				<Col>
					<Meta
						title={
							<Typography.Title level={3} className="m-0 " ellipsis>
								{marketplaceInfo?.[`${TITLE_PROP}`]}
							</Typography.Title>
						}
						description={
							<span>
								<Rate
									disabled
									defaultValue={cardInfo?.[`${AVG_RATING_PROP}`]}
									allowHalf
									style={{ fontSize: "1rem" }}
									className="c-housing-important m-0 mt-1"
								/>
								<span className="ant-rate-text c-housing-important">
									{cardInfo?.[`${TOTAL_REVIEW_PROP}`]} Reviews
								</span>
							</span>
						}
					/>
				</Col>
				<Col>
					<Typography.Text ellipsis className="text-muted">
						{formatTime(marketplaceInfo?.[`${UPDATED_ON_PROP}`])}
					</Typography.Text>
				</Col>
			</Row>

			<Row justify="space-between" align="middle" className="mt-2">
				<Col>
					<Typography.Text
						className="c-primary-important"
						onClick={() =>
							window.open(
								`https://www.google.com/maps/place/${
									marketplaceInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]
								},${marketplaceInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]}`,
								"_blank"
							)
						}
						ellipsis
					>
						{marketplaceInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
					</Typography.Text>
				</Col>
			</Row>
		</>
	);

	const app = (
		<Typography.Link href="/">
			<Card
				title={title}
				headStyle={{
					padding: "0 0.5rem",
				}}
				style={{ maxWidth: "100%", borderRadius: "1rem" }}
				className="overflow-hidden"
				cover={cover}
				extra={[
					<Button
						key={cardInfo?.[`${ID_PROP}`]}
						type="ghost border-0"
						icon={
							<ShareAltOutlined
								style={{
									fontSize: screens?.xs ? "1.1rem" : "1.4rem",
								}}
								className="c-primary"
							/>
						}
					/>,
				]}
			>
				{body}
			</Card>
		</Typography.Link>
	);
	return app;
}

export default MarketplaceCard;
