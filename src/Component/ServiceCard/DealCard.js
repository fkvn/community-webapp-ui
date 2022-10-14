import { ShareAltOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Card,
	Carousel,
	Col,
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
				maxWidth: "100%",
				maxHeight: "4rem",
				padding: ".5rem 1.2rem .5rem 0.5rem",
				left: 0,
				bottom: 30,
				zIndex: 800,
				border: "1px solid whitesmoke",
				borderRadius: "0 1rem 1rem 0rem",
			}}
			className="bg-primary-important"
		>
			<Space direction="horizontal">
				<div className="tedkvn-center">
					{image({
						width: 20,
						src: svgDealIconWhite,
					})}
				</div>
				<Meta
					{...(dealInfo?.[`${CATEGORY_PROP}`]?.length > 0 && {
						title: (
							<Typography.Title
								level={5}
								className="text-white mb-0 w-100"
								ellipsis
							>
								{dealInfo?.[`${CATEGORY_PROP}`].toUpperCase()}
							</Typography.Title>
						),
					})}
					description={
						<Typography.Title level={5} ellipsis className="text-white m-0 ">
							{DEAL_HEADLINE_PROP}
						</Typography.Title>
					}
				/>
			</Space>
		</div>
	);

	const title = (
		<Meta
			// className="tedkvn-center-left"
			avatar={
				<Avatar src={postOwnerInfo?.[`${INFO_PROP}`]?.[`${PICTURE_PROP}`]} />
			}
			title={
				<Typography.Title className="m-0 p-0 c-primary-important" level={3}>
					{postOwner?.[`${INFO_PROP}`]?.[`${NAME_PROP}`]}
				</Typography.Title>
			}
			// description={
			// 	<small>
			// 		{postOwnerInfo?.[`${PROFILE_TYPE_PROP}`] ===
			// 		PROFILE_BUSINESS_TYPE_PROP
			// 			? postOwner?.[`${INFO_PROP}`]?.[`${COMPANY_INDUSTRY_PROP}`]
			// 			: `Member since ${formatTime(
			// 					postOwnerInfo?.[`${INFO_PROP}`]?.[`${CREATED_ON_PROP}`]
			// 			  )}`}
			// 	</small>
			// }
		/>
	);

	const cover = (
		<div style={{ position: "relative" }}>
			<Carousel
				dots={true}
				// autoplay
			>
				{dealInfo?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
					<div key={idx}>
						<div>
							{image({
								width: "100%",
								style: { maxHeight: "18rem", objectFit: "cover" },
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
				<Col className="w-75">
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
									className="c-housing-important m-0"
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
				style={{ maxWidth: "100%", borderRadius: "1rem" }}
				className="overflow-hidden"
				cover={cover}
				extra={[
					<Button
						type="ghost border-0"
						icon={
							<ShareAltOutlined
								style={{
									fontSize: "1.4rem",
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
