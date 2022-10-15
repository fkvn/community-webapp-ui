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
import { svgDealIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CATEGORY_PROP,
	DEAL_HEADLINE_PROP,
	DEFAULT_CARD_INFO,
	DEFAULT_DEAL_INFO,
	DEFAULT_POST_OWNER_INFO,
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

function DealCard({ card = DEFAULT_CARD_INFO }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { info, postOwner, ...rest } = card;

	const postOwnerInfo = { ...DEFAULT_POST_OWNER_INFO, ...postOwner };
	const dealInfo = { ...DEFAULT_DEAL_INFO, ...info };
	const cardInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const { image } = useImage();

	// const imageOverlay = (
	// 	<div
	// 		style={{
	// 			width: "100%",
	// 			position: "absolute",
	// 			top: 0,
	// 			right: 0,
	// 			zIndex: 800,
	// 			// borderRadius: "1rem 1rem 0 0",
	// 			opacity: "70%",
	// 		}}
	// 		className="bg-secondary p-1 "
	// 	>
	// 		<Space direction="horizontal" className="float-end">
	// 			<Button
	// 				type="ghost border-0 mx-3"
	// 				icon={
	// 					<ShareAltOutlined
	// 						style={{
	// 							fontSize: "1.5rem",
	// 							color: "white",
	// 						}}
	// 					/>
	// 				}
	// 			></Button>
	// 		</Space>
	// 	</div>
	// );

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
			className="bg-primary-important"
		>
			<Space direction="horizontal" className="w-100 p-2 px-3">
				<div className="tedkvn-center h-100">
					{image({
						width: screens?.xs ? 15 : 20,
						src: svgDealIconWhite,
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
								{dealInfo?.[`${CATEGORY_PROP}`]?.length > 0 && (
									<>
										{dealInfo?.[`${CATEGORY_PROP}`].toUpperCase()}
										{" - "}
									</>
								)}{" "}
								{DEAL_HEADLINE_PROP.toUpperCase()}
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
				{dealInfo?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
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
								{dealInfo?.[`${TITLE_PROP}`]}
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
						{formatTime(dealInfo?.[`${UPDATED_ON_PROP}`])}
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
									dealInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]
								},${dealInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]}`,
								"_blank"
							)
						}
						ellipsis
					>
						{dealInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
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

export default DealCard;
