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
import { svgBusinessIcon } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
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

function BusinessCard({ card = DEFAULT_CARD_INFO }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { info, ...rest } = card;

	const businessInfo = { ...DEFAULT_BUSINESS_INFO, ...info };
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
			className="bg-dark"
		>
			<Space direction="horizontal" className="w-100 p-2 px-3">
				<div className="tedkvn-center h-100">
					{image({
						width: screens?.xs ? 20 : 25,
						src: svgBusinessIcon,
					})}
				</div>
				<Meta
					title={
						<Typography.Title
							level={5}
							className="c-business-important m-0 p-1"
							ellipsis
						>
							<span
								{...(screens?.xs && {
									style: { fontSize: ".8rem" },
								})}
							>
								{businessInfo?.[`${COMPANY_INDUSTRY_PROP}`].toUpperCase()}
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
					src={businessInfo?.[`${PICTURE_PROP}`]}
				/>
			}
			title={
				<Typography.Title
					className="m-0 p-0 c-primary-important"
					level={screens?.xs ? 5 : 3}
					ellipsis
				>
					{businessInfo?.[`${NAME_PROP}`]}
				</Typography.Title>
			}
		/>
	);

	const cover = (
		<div style={{ position: "relative" }}>
			<Carousel dots={true} autoplay>
				<div style={{ position: "relative" }}>
					<div className="w-100">
						{image({
							width: "100%",
							style: {
								maxHeight: screens?.xs ? "15rem" : "18rem",
								objectFit: "cover",
							},
							src: businessInfo?.[`${PICTURE_PROP}`],
						})}
					</div>
				</div>
				{businessInfo?.[`${PICTURE_LIST_PROP}`].map((img, idx) => (
					<div key={idx}>
						<div>
							{image({
								width: "100%",
								style: {
									maxHeight: screens?.xs ? "7.5rem" : "18rem",
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

			<Row justify="space-between">
				<Col className="w-75">
					<Meta
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
		<Typography.Link href={`/${SEARCH_PROFILE}/${cardInfo?.[`${ID_PROP}`]}`}>
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

export default BusinessCard;
