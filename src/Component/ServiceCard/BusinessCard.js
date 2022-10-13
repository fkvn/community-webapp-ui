import { ShareAltOutlined } from "@ant-design/icons";
import {
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
import { imageThainowLogo, svgBusinessIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	COMPANY_FOUNDED_PROP,
	COMPANY_INDUSTRY_PROP,
	COMPANY_NAME_PROP,
	COMPANY_REVENUE_PROP,
	COVER_PICTURES_PROP,
	DESCRIPTION_PROP,
	EMAIL_PROP,
	ID_PROP,
	IS_DESCRIPTION_PUBLIC_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	IS_SIZE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LAT_PROP,
	LNG_PROP,
	LOCATION_PROP,
	PHONE_PROP,
	PICTURE_PROP,
	SEARCH_BUSINESS,
	SEARCH_TYPE_PROP,
	SIZE_PROP,
	STATUS_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";

import useImage from "../Hook/useImage";

const defaultBusinessInfo = {
	[`${COVER_PICTURES_PROP}`]: [],
	[`${DESCRIPTION_PROP}`]: "",
	[`${IS_DESCRIPTION_PUBLIC_PROP}`]: true,
	[`${EMAIL_PROP}`]: "",
	[`${IS_EMAIL_PUBLIC_PROP}`]: true,
	[`${COMPANY_FOUNDED_PROP}`]: "",
	[`${COMPANY_INDUSTRY_PROP}`]: "",
	[`${COMPANY_NAME_PROP}`]: "",
	[`${PHONE_PROP}`]: "",
	[`${IS_PHONE_PUBLIC_PROP}`]: true,
	[`${PICTURE_PROP}`]: imageThainowLogo,
	[`${COMPANY_REVENUE_PROP}`]: "",
	[`${SIZE_PROP}`]: "",
	[`${IS_SIZE_PUBLIC_PROP}`]: true,
	[`${STATUS_PROP}`]: "UNREGISTERED",
	[`${UPDATED_ON_PROP}`]: "",
	[`${WEBSITE_PROP}`]: "",
	[`${IS_WEBSITE_PUBLIC_PROP}`]: true,
	[`${LOCATION_PROP}`]: {},
};

const defaultCardInfo = {
	[`${ID_PROP}`]: -1,
	[`${TOTAL_REVIEW_PROP}`]: 0,
	[`${AVG_RATING_PROP}`]: 0,
	[`${SEARCH_TYPE_PROP}`]: SEARCH_BUSINESS,
};

function BusinessCard({ card = defaultCardInfo }) {
	const { info, ...rest } = card;

	const businessInfo = { ...defaultBusinessInfo, ...info };
	const cardInfo = { ...defaultCardInfo, ...rest };

	const { image } = useImage();

	const imageOverlay = (
		<div
			style={{
				width: "100%",
				position: "absolute",
				top: 0,
				right: 0,
				zIndex: 5000,
				borderRadius: "1rem 1rem 0 0",
				opacity: "70%",
			}}
			className="bg-secondary p-1 "
		>
			<Space direction="horizontal" className="float-end">
				<Button
					type="ghost border-0 mx-3"
					icon={
						<ShareAltOutlined
							style={{
								fontSize: "1.5rem",
								color: "white",
							}}
						/>
					}
				></Button>
			</Space>
		</div>
	);

	const serviceTagOverlay = (
		<div
			style={{
				position: "absolute",
				maxWidth: "100%",
				maxHeight: "4rem",
				padding: ".5rem 1.2rem .5rem 0.5rem",
				left: 0,
				bottom: 20,
				zIndex: 5000,
				// opacity: "90%",
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
						<Typography.Text className="text-white">
							Thai Business
						</Typography.Text>
					}
				/>
			</Space>
		</div>
	);

	const app = (
		<Card
			style={{ maxWidth: "100%", borderRadius: "1rem" }}
			className="overflow-hidden"
			cover={
				<Carousel dots={false}>
					<div>
						<div style={{ position: "relative" }}>
							<div className="w-100">
								{image({
									width: "100%",
									style: { maxHeight: "20rem", objectFit: "cover" },
									src: businessInfo?.[`${PICTURE_PROP}`],
								})}
							</div>
							{imageOverlay}
							{serviceTagOverlay}
						</div>
					</div>
				</Carousel>
			}
		>
			<Row justify="space-between" className="mb-2">
				<Col className="w-75">
					<Meta
						className="w-75"
						title={businessInfo?.[`${COMPANY_NAME_PROP}`]}
						description={
							<Typography.Link
								href={`https://www.google.com/maps/place/${
									businessInfo?.[`${COMPANY_NAME_PROP}`]
								}/@${businessInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]},${
									businessInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]
								} `}
								target="_blank"
								ellipsis
							>
								{businessInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
							</Typography.Link>
						}
					/>
				</Col>
				<Col>
					<Typography.Text ellipsis className="text-muted">
						{formatTime(businessInfo?.[`${UPDATED_ON_PROP}`])}
					</Typography.Text>
				</Col>
			</Row>

			<Row justify="space-between" align="middle" className="mt-2">
				<Col>
					<span>
						<Rate
							disabled
							defaultValue={cardInfo?.[`${AVG_RATING_PROP}`]}
							allowHalf
							style={{ fontSize: "1rem" }}
							className="c-housing-important"
						/>
						<span className="ant-rate-text c-housing-important">
							{cardInfo?.[`${TOTAL_REVIEW_PROP}`]} Reviews
						</span>
					</span>
				</Col>

				<Col>
					<Typography.Link onClick={() => alert("single-page")}>
						See More
					</Typography.Link>
				</Col>
			</Row>
		</Card>
	);
	return app;
}

export default BusinessCard;
