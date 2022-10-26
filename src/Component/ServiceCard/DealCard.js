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
import { useLocation, useNavigate } from "react-router-dom";
import { svgDealIconWhite } from "../../Assest/Asset";
import {
	ADDRESS_PROP,
	AVG_RATING_PROP,
	CATEGORY_PROP,
	CLOSE_URL,
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
	SEARCH_DEAL,
	TITLE_PROP,
	TOTAL_REVIEW_PROP,
	UPDATED_ON_PROP,
} from "../../Util/ConstVar";
import { formatTime } from "../../Util/Util";
import useImage from "../Hook/useImage";

function DealCard({ card = DEFAULT_CARD_INFO }) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const navigate = useNavigate();
	const location = useLocation();

	const { info, postOwner, ...rest } = card;

	const ownerInfo = { ...DEFAULT_POST_OWNER_INFO, ...postOwner };
	const detailInfo = { ...DEFAULT_DEAL_INFO, ...info };
	const basicInfo = { ...DEFAULT_CARD_INFO, ...rest };

	const { image } = useImage();

	const serviceTagOverlay = (
		<div className="bg-primary-important service-tag-overlay">
			<Space
				direction="horizontal"
				className=" p-0 px-2 py-1 py-md-2 px-md-3"
				style={{
					width: "80%",
				}}
			>
				<div className="tedkvn-center h-100">
					{image({
						width: screens.md === true ? 20 : 15,
						src: svgDealIconWhite,
					})}
				</div>

				<Typography.Title level={5} className="text-white m-0 p-0" ellipsis>
					<span
						{...(screens.xs === true && {
							style: { fontSize: ".9rem" },
						})}
					>
						{(screens.xs
							? detailInfo?.[`${TITLE_PROP}`]
							: detailInfo?.[`${CATEGORY_PROP}`]
						).toUpperCase()}{" "}
						{screens.md && DEAL_HEADLINE_PROP.toUpperCase()}
					</span>
				</Typography.Title>
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
					src={ownerInfo?.[`${INFO_PROP}`]?.[`${PICTURE_PROP}`]}
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

	const shareButton = (
		<Button
			key={basicInfo?.[`${ID_PROP}`]}
			type="ghost border-0"
			icon={
				<ShareAltOutlined
					style={{
						fontSize: screens.xs ? "1rem" : "1.4rem",
					}}
					className="c-primary"
				/>
			}
		/>
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
									maxHeight: screens.xs ? "10rem" : "25rem",
								},
								src: img,
							})}
						</div>
					</div>
				))}
			</Carousel>
			{screens.xs && (
				<div
					style={{
						position: "absolute",
						top: 10,
						right: 10,
						backgroundColor: "white",
						border: "1px solid whitesmoke",
						borderRadius: "50%",
					}}
				>
					{shareButton}
				</div>
			)}
			{serviceTagOverlay}
		</div>
	);

	const body = (
		<>
			<Row justify="space-between" className="my-3">
				<Col style={{ maxWidth: "80%" }}>
					<Meta
						title={
							<Typography.Title level={3} className="m-0 " ellipsis>
								{detailInfo?.[`${TITLE_PROP}`]}
							</Typography.Title>
						}
						description={
							<span>
								<Rate
									disabled
									defaultValue={basicInfo?.[`${AVG_RATING_PROP}`]}
									allowHalf
									style={{ fontSize: "1rem" }}
									className="c-housing-important m-0 mt-1"
								/>
								<span className="ant-rate-text c-housing-important">
									{basicInfo?.[`${TOTAL_REVIEW_PROP}`]} Reviews
								</span>
							</span>
						}
					/>
				</Col>
				<Col>
					<Typography.Text ellipsis className="text-muted mt-1">
						{formatTime(detailInfo?.[`${UPDATED_ON_PROP}`])}
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
									detailInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]
								},${detailInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]}`,
								"_blank"
							)
						}
						ellipsis
					>
						{detailInfo?.[`${LOCATION_PROP}`]?.[`${ADDRESS_PROP}`]}
					</Typography.Text>
				</Col>
			</Row>
		</>
	);

	const defaultCard = (
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
						key={basicInfo?.[`${ID_PROP}`]}
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

	const mobileBody = (
		<>
			<Row justify="space-between" className="my-2 ">
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
			</Row>

			<Row justify="space-between">
				<Col className="w-100">
					<Meta
						description={
							<Typography.Text
								className="c-primary-important"
								onClick={() =>
									window.open(
										`https://www.google.com/maps/place/${
											detailInfo?.[`${LOCATION_PROP}`]?.[`${LAT_PROP}`]
										},${detailInfo?.[`${LOCATION_PROP}`]?.[`${LNG_PROP}`]}`,
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

	const mobileCard = (
		<Typography.Link
			onClick={() =>
				navigate(`/${SEARCH_DEAL}/${basicInfo?.[`${ID_PROP}`]}`, {
					state: {
						[`${CLOSE_URL}`]: location?.pathname + location?.search || "/",
					},
				})
			}
		>
			<Card
				style={{ maxWidth: "100%", borderRadius: "1rem" }}
				className=" overflow-hidden"
				cover={cover}
			>
				{mobileBody}
			</Card>
		</Typography.Link>
	);

	const app = screens.md ? defaultCard : mobileCard;
	return app;
}

export default DealCard;
