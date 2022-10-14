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
import { svgBusinessIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	BUSINESS_HEADLINE_PROP,
	COMPANY_INDUSTRY_PROP,
	COMPANY_NAME_PROP,
	DEFAULT_BUSINESS_INFO,
	DEFAULT_CARD_INFO,
	DESCRIPTION_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	NAME_PROP,
	PICTURE_LIST_PROP,
	PICTURE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";

import useImage from "../Hook/useImage";

function BusinessCard({ card = DEFAULT_CARD_INFO }) {
	const { info, ...rest } = card;

	const businessInfo = { ...DEFAULT_BUSINESS_INFO, ...info };
	const cardInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const { image } = useImage();

	// const imageOverlay = (
	// 	<div
	// 		style={{
	// 			width: "100%",
	// 			position: "absolute",
	// 			top: 0,
	// 			right: 0,
	// 			zIndex: 5000,
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
				zIndex: 5000,
				border: "1px solid whitesmoke",
				borderRadius: "0 1rem 1rem 0rem",
			}}
			className="bg-business-important"
		>
			<Space direction="horizontal">
				<div className="tedkvn-center">
					{image({
						width: 25,
						src: svgBusinessIconWhite,
					})}
				</div>
				<Meta
					// className="w-50"
					title={
						<Typography.Title
							level={5}
							className="text-white mb-0 w-100"
							ellipsis
						>
							{businessInfo?.[`${COMPANY_INDUSTRY_PROP}`].toUpperCase()}
						</Typography.Title>
					}
					description={
						<Typography.Title className="text-white m-0" level={5} ellipsis>
							{BUSINESS_HEADLINE_PROP}
						</Typography.Title>
					}
				/>
			</Space>
		</div>
	);

	const title = (
		<Meta
			className="tedkvn-center-left"
			avatar={<Avatar src={businessInfo?.[`${PICTURE_PROP}`]} />}
			title={
				<Typography.Title className="m-0 p-0 c-primary-important" level={3}>
					{businessInfo?.[`${NAME_PROP}`]}
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
			<Carousel dots={true} autoplay>
				<div style={{ position: "relative" }}>
					<div className="w-100">
						{image({
							width: "100%",
							style: { maxHeight: "18rem", objectFit: "cover" },
							src: businessInfo?.[`${PICTURE_PROP}`],
						})}
					</div>
				</div>
				{businessInfo?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
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
			<Row justify="space-between" align="middle" className="mb-2">
				<Col>
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
				</Col>
				<Col>
					<Typography.Text ellipsis className="text-muted">
						{formatTime(businessInfo?.[`${UPDATED_ON_PROP}`])}
					</Typography.Text>
				</Col>
			</Row>

			<Row justify="space-between" className="">
				<Col className="w-75">
					<Meta
						className="w-75"
						title={
							<Typography.Title level={4} className="m-0 mb-1" ellipsis>
								{businessInfo?.[`${DESCRIPTION_PROP}`]}
							</Typography.Title>
						}
						description={
							<Typography.Text
								className="c-primary-important"
								onClick={() =>
									window.open(
										`https://www.google.com/maps/place/${
											businessInfo?.[`${COMPANY_NAME_PROP}`]
										}/@${businessInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
											businessInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
										} `,
										"_blank"
									)
								}
								ellipsis
							>
								{businessInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
							</Typography.Text>
						}
					/>
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

export default BusinessCard;
