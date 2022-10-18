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
import { svgHousingIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CATEGORY_PROP,
	DEFAULT_CARD_INFO,
	DEFAULT_HOUSING_CARD,
	DEFAULT_POST_OWNER_INFO,
	HOUSING_HEADLINE_PROP,
	ID_PROP,
	INFO_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	NAME_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";
import useImage from "../Hook/useImage";

function HousingCard({ card = DEFAULT_CARD_INFO }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { info, postOwner, ...rest } = card;

	const postOwnerInfo = { ...DEFAULT_POST_OWNER_INFO, ...postOwner };
	const housingInfo = { ...DEFAULT_HOUSING_CARD, ...info };
	const cardInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const { image } = useImage();

	const serviceTagOverlay = (
		<div
			style={{
				position: "absolute",
				width: "100%",
				left: 0,
				bottom: 5,
				zIndex: 800,
				opacity: "90%",
			}}
			className="bg-housing-important"
		>
			<Space direction="horizontal" className="w-100 p-2 px-3">
				<div className="tedkvn-center h-100">
					{image({
						width: screens?.xs ? 20 : 25,
						src: svgHousingIconWhite,
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
								{housingInfo?.[`${CATEGORY_PROP}`]?.length > 0 && (
									<>
										{housingInfo?.[`${CATEGORY_PROP}`].toUpperCase()}
										{" - "}
									</>
								)}{" "}
								{HOUSING_HEADLINE_PROP.toUpperCase()}
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
		<div style={{ position: "relative" }}>
			<Carousel
				dots={{
					className: "py-5",
				}}
				autoplay
			>
				{housingInfo?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
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
				<Col style={{ maxWidth: "80%" }}>
					<Meta
						title={
							<Typography.Title level={3} className="m-0 " ellipsis>
								{housingInfo?.[`${TITLE_PROP}`]}
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
					<Typography.Text ellipsis className="text-muted mt-1">
						{formatTime(housingInfo?.[`${UPDATED_ON_PROP}`])}
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
									housingInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]
								},${housingInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]}`,
								"_blank"
							)
						}
						ellipsis
					>
						{housingInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
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

export default HousingCard;
