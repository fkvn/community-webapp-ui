import { Avatar, Card, Carousel, Grid, List, Space, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	imageBannerBg,
	imageDealSample,
	imageHousingSample,
	imageJobSample,
	imageMarketplaceSample,
	imageTestimonialSample1,
	imageTestimonialSample2,
	imageTestimonialSample3,
	imageTestimonialSample4,
	imageTestimonialSample5,
} from "../../../Assest/Asset";
import global from "../../../Assest/Style/scss/base/_global.scss";
import {
	SEARCH_BUSINESS,
	SEARCH_DEAL,
	SEARCH_HOUSING,
	SEARCH_JOB,
	SEARCH_MARKETPLACE,
	SEARCH_TYPE_PROP,
} from "../../../Util/ConstVar";
import AppStoreBadge from "../../Badge/AppStoreBadge";
import BusinessBadge from "../../Badge/BusinessBadge";
import DealBadge from "../../Badge/DealBadge";
import GooglePlayBadge from "../../Badge/GooglePlayBadge";
import HousingBadge from "../../Badge/HousingBadge";
import JobBadge from "../../Badge/JobBadge";
import MarketplaceBadge from "../../Badge/MarketplaceBadge";

function LandingPage() {
	const { useBreakpoint } = Grid;

	const screens = useBreakpoint();

	const { Title } = Typography;

	const navigate = useNavigate();

	const [recommendItems, setRecommendItems] = useState([]);

	const resourceItems = [
		(props = {}) => (
			<BusinessBadge
				onClick={() =>
					navigate(`/search?${SEARCH_TYPE_PROP}=${SEARCH_BUSINESS}`)
				}
				{...props}
			/>
		),
		(props = {}) => (
			<DealBadge
				onClick={() => navigate(`/search?${SEARCH_TYPE_PROP}=${SEARCH_DEAL}`)}
				{...props}
			/>
		),

		(props = {}) => (
			<JobBadge
				onClick={() => navigate(`/search?${SEARCH_TYPE_PROP}=${SEARCH_JOB}`)}
				{...props}
			/>
		),
		(props = {}) => (
			<HousingBadge
				onClick={() =>
					navigate(`/search?${SEARCH_TYPE_PROP}=${SEARCH_HOUSING}`)
				}
				{...props}
			/>
		),
		(props = {}) => (
			<MarketplaceBadge
				onClick={() =>
					navigate(`/search?${SEARCH_TYPE_PROP}=${SEARCH_MARKETPLACE}`)
				}
				{...props}
			/>
		),
	];

	const [testimonialIdx, setTestimonialIdx] = useState(0);

	const testimonialItems = [
		{
			name: "Consul Ithikorn Tritasavit",
			position: "Consular Officer - Economic and Protocol Section",
			speech:
				"ThaiNow is the first platform of its kind that offers employment opportunities and other information about Thai businesses in the United States. This application will certainly bring the Thai community in Thailand and overseas closer. I sincerely wish the ThaiNow mobile application sustained success.",
			src: imageTestimonialSample1,
		},
		{
			name: "Pop",
			position: "President of Thai Town Council Of Los Angeles",
			speech:
				"As President of the Thai Town Council Of Los Angeles, I believe that ThaiNow will be a hub for Thai communities overseas, allowing Thai businesses to connect easily with customers. It will be a tool for Thai businesses to help sell their products & services and great support for Thais looking for jobs, apartments, or good deals.",
			src: imageTestimonialSample2,
		},
		{
			name: "Jacky",
			position: "Restaurant Owner",
			speech:
				"After trying the ThaiNow application, I feel it's a great alternative to other apps. It's a quick and easy way to find jobs, housing, good deals on Thai restaurants, and even provides a great marketplace to sell products. Also, you can choose Thai as a language preference. It's like a one-stop-shop app!",
			src: imageTestimonialSample3,
		},
		{
			name: "Rose H.",
			position: "Event Organizer",
			speech:
				"For me, ThaiNow is not just any application but it is a community, an assistant, and a friend that I can count on for anything I need. This is a must-have mobile application if you love anything related to Thai culture and Thailand. This app will be your good friend abroad.",
			src: imageTestimonialSample4,
		},
		{
			name: "Preeya",
			position: "Japanese Restaurant Chain Manager",
			speech:
				"If you are looking for the right person for your company, you need to check out ThaiNow all in one platform for Thai people. I was looking for a Host and a server for my restaurant and I had almost given up. I was browsing through the platform just to see what they had to offer and it was amazingly easy to use and practical. Thanks, ThaiNow! ",
			src: imageTestimonialSample5,
		},
	];

	const fetchRecommendItems = () =>
		Promise.resolve([
			{
				title: "DEAL OF THE WEEK",
				bg: global.primaryColor,
				src: imageDealSample,
				content:
					"ANNUAL/SEASON PASSES: Save $10 on Passes online vs Front Gate",
				owner: "Super Deal",
			},
			{
				title: "ROOM FOR RENT",
				bg: global.housingColor,
				src: imageHousingSample,
				content: "ห้องว่างรายเดือนแถว Silverlake เดินทางสะดวก",
				owner: "ThaiNow",
			},
			{
				title: "JOB AVAILABLE",
				bg: global.jobColor,
				src: imageJobSample,
				content: "PHP Programmer",
				owner: "Southern California State University",
			},
			{
				title: "STAFF PICK ITEM",
				bg: global.marketplaceColor,
				src: imageMarketplaceSample,
				content: "บริการสิ​นเชื่อบ้าน ที่เดียวครบ จบทุกความต้องการเรื่องบ้าน",
				owner: "Asia",
			},
		]);

	useEffect(() => {
		fetchRecommendItems().then((res) => setRecommendItems(res));
	}, []);

	const banner = (
		<Carousel className="m-4 " dots={false}>
			<div>
				<div
					style={{
						height: "fit-content",
						textAlign: "center",
						backgroundImage: `url(${imageBannerBg})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						borderRadius: ".8rem",
						padding: "2rem",
					}}
				>
					<Title level={3} className="text-white pt-2">
						Explore and Search For Thai Resources
					</Title>
					<Title level={5} className="text-white pt-2">
						Connect Thai overseas to hangout and socialize.
					</Title>
					<Space
						direction="horizontal"
						gap={20}
						className="pt-5 pb-2 overflow-hidden"
					>
						<AppStoreBadge className="mx-1 mx-lg-3" />
						<GooglePlayBadge className="mx-1 mx-lg-3" />
					</Space>
				</div>
			</div>
		</Carousel>
	);

	const resources = (
		<>
			{" "}
			<Title className="c-primary-important text-center m-0">
				Resource Categories
			</Title>
			<Space
				direction="horizontal"
				className="w-100 custom-center text-center"
				wrap
			>
				{resourceItems.map((item, idx) => (
					<React.Fragment key={idx}>
						{item({
							containerClassName: "m-4 m-xxl-5",
						})}
					</React.Fragment>
				))}
			</Space>
		</>
	);

	const recommendations = (
		<List
			className="w-100 p-2 px-3 p-xxl-5"
			grid={{ xs: 1, column: 2 }}
			dataSource={recommendItems}
			renderItem={(item) => (
				<List.Item className="m-0 my-3 m-md-4 ">
					<Card
						title={item.title}
						headStyle={{ backgroundColor: item.bg, color: "white" }}
						className="overflow-hidden"
						cover={
							<img
								alt="example"
								src={item.src}
								style={{
									height: "13rem",
									objectFit: "cover",
								}}
							/>
						}
					>
						<Meta
							className="p-4"
							title={item.content}
							description={item.owner}
						/>
					</Card>
				</List.Item>
			)}
		/>
	);

	const testimonials = (
		<Card
			title={
				<Title className="c-primary-important text-center mt-2 ">
					Testimonials
					<div>
						<svg
							width="49"
							height="12"
							viewBox="0 0 49 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								width="49"
								height="12"
								rx="6"
								fill="url(#paint0_linear_648_8154)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_648_8154"
									x1="-18.5839"
									y1="-7.47413"
									x2="-17.7765"
									y2="9.52253"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#B2EBF2" />
									<stop offset="1" stopColor="#D1C4E9" />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</Title>
			}
			headStyle={{ border: 0 }}
			className="m-0 m-md-4 text-center px-0 px-xxl-5"
			style={{ backgroundColor: "transparent " }}
			bordered={false}
			bodyStyle={{ padding: "0" }}
		>
			<Meta
				className="text-dark px-4 mt-4"
				description={
					<Typography.Paragraph italic>
						{testimonialItems[testimonialIdx].speech}
					</Typography.Paragraph>
				}
			/>
			<Title level={2} className="mt-4 c-housing-important">
				{testimonialItems[testimonialIdx].name}
			</Title>
			<Title level={5}>{testimonialItems[testimonialIdx].position}</Title>

			<Avatar.Group
				className="custom-center mt-4"
				maxCount={screens.xs ? 3 : 5}
				maxPopoverTrigger="click"
			>
				{testimonialItems.map((item, idx) => (
					<Avatar
						key={idx}
						size={{
							xs: idx === testimonialIdx ? 100 : 50,
							md: idx === testimonialIdx ? 200 : 100,
							lg: idx === testimonialIdx ? 200 : 100,
							xl: idx === testimonialIdx ? 200 : 100,
							xxl: idx === testimonialIdx ? 200 : 100,
						}}
						className="mx-2 mx-md-4"
						src={item.src}
						onClick={() => setTestimonialIdx(idx)}
						onMouseOver={() => setTestimonialIdx(idx)}
					/>
				))}
			</Avatar.Group>
		</Card>
	);

	const app = (
		<>
			{banner} {resources} {recommendations} {testimonials}
		</>
	);

	return app;
}

export default LandingPage;
