import {
	Card,
	Col,
	Comment,
	Grid,
	List,
	Row,
	Space,
	Tooltip,
	Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContainer from "../../../Container/AuthContainer/AuthContainer";
import { patchSearchResultInfoPromise } from "../../../redux-store/dispatchPromise";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import {
	AVG_RATING_PROP,
	CLOSE_URL,
	COMMENT_PROP,
	ID_PROP,
	INFO_PROP,
	NAME_PROP,
	PICTURE_PROP,
	PROFILE_OBJ,
	RATE_PROP,
	REVIEWER_PROP,
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_PROFILE,
	SEARCH_RESULT_OBJ,
	SEARCH_REVIEW,
	TOTAL_COUNT_PROP,
	TOTAL_REVIEW_PROP,
	TYPE_PROP,
	UPDATED_ON_PROP,
} from "../../../Util/ConstVar";
import { formatTime } from "../../../Util/Util";
import useImage from "../../Hook/useImage";
import useSearch from "../../Hook/useSearch";
import RateDisplay from "../../RateDisplay/RateDisplay";
import LoadMore from "../../Search/LoadMore";
import SkeletonCard from "../../Skeleton/SkeletonCard";
import EditReview from "./EditReview";

function ReviewPage({
	type = "",
	revieweeId = null,
	totalReview = 0,
	setReview = () => {},
	avgRating = 0,
} = {}) {
	const navigate = useNavigate();
	const location = useLocation();

	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const {
		[`${PROFILE_OBJ}`]: profile = {},
		[`${SEARCH_RESULT_OBJ}`]: {
			[`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults = [],
		} = {},
	} = useSelector(thainowReducer);

	const [loading, setLoading] = useState(true);
	const [newReviewOpen, setNewReviewOpen] = useState(false);
	const [editReview, setEditReview] = useState({
		open: false,
		idx: -1,
		review: {},
	});

	const { avatar } = useImage();
	const { dispatchSearch } = useSearch();

	const normalizeReviews = (reviews = []) => {
		return reviews.map((review, idx) => {
			return {
				actions: [
					...(profile?.[`${ID_PROP}`] ===
					review?.[`${REVIEWER_PROP}`]?.[`${ID_PROP}`]
						? [
								<span
									key={`edit-${idx}`}
									className="c-housing-important"
									onClick={() =>
										setEditReview({
											open: true,
											idx: idx,
											review: review,
										})
									}
								>
									Edit reply
								</span>,
						  ]
						: []),
					// <span
					// 	key={`reply-${idx}`}
					// 	// onClick={() =>
					// 	// 	setNewReview({
					// 	// 		...newReview,
					// 	// 		open: true,
					// 	// 	})
					// 	// }
					// >
					// 	Reply to
					// </span>,
				],
				author: (
					<Space>
						<Tooltip
							title={
								review?.[`${REVIEWER_PROP}`]?.[`${INFO_PROP}`]?.[
									`${NAME_PROP}`
								] || undefined
							}
						>
							<Typography.Link
								onClick={() =>
									navigate(
										`/${SEARCH_PROFILE}/${
											review?.[`${REVIEWER_PROP}`]?.[`${ID_PROP}`]
										}`,
										{
											state: {
												[`${CLOSE_URL}`]:
													location?.pathname + location?.search || "/",
											},
										}
									)
								}
							>
								{review?.[`${REVIEWER_PROP}`]?.[`${INFO_PROP}`]?.[
									`${NAME_PROP}`
								] || undefined}
							</Typography.Link>
						</Tooltip>
					</Space>
				),
				avatar: avatar({
					inputProps: {
						size: 40,
						src: review?.[`${REVIEWER_PROP}`]?.[`${INFO_PROP}`]?.[
							`${PICTURE_PROP}`
						],
					},
				}),
				content: (
					<Typography.Paragraph className="p-0 m-0">
						<RateDisplay
							value={review?.[`${RATE_PROP}`]}
							displayReview={false}
						/>
						<Typography.Paragraph className="mt-2 mb-0">
							{review?.[`${COMMENT_PROP}`]}
						</Typography.Paragraph>
					</Typography.Paragraph>
				),
				datetime: (
					<Tooltip title={review?.[`${UPDATED_ON_PROP}`]}>
						<span>{formatTime(review?.[`${UPDATED_ON_PROP}`])}</span>
					</Tooltip>
				),
			};
		});
	};

	const searchReviewHandle = (params = {}) =>
		dispatchSearch({
			type: SEARCH_REVIEW,
			params: {
				[`${ID_PROP}`]: revieweeId,
				[`${TYPE_PROP}`]: type,
				...params,
			},
			backToTop: false,
		}).then(
			({
				[`${TOTAL_COUNT_PROP}`]: totalCount = 0,
				[`${AVG_RATING_PROP}`]: avgRating = 0,
			} = {}) => {
				setReview({
					[`${TOTAL_REVIEW_PROP}`]: totalCount,
					[`${AVG_RATING_PROP}`]: avgRating,
				});
			}
		);

	const handleNewReviewOk = (review = {}) => {
		const updatedReviewList = [{ ...review }, ...fetchResults];

		const newAvg = (
			(totalReview * avgRating + review?.[`${RATE_PROP}`]) /
			(totalReview + 1)
		).toFixed(1);

		setReview({
			[`${TOTAL_REVIEW_PROP}`]: totalReview + 1,
			[`${AVG_RATING_PROP}`]: newAvg,
		});

		patchSearchResultInfoPromise({
			[`${SEARCH_FETCH_RESULT_PROP}`]: updatedReviewList,
		});

		setNewReviewOpen(false);
	};

	const handleEditReviewOk = (review) => {
		const newAvg = (
			(totalReview * avgRating -
				fetchResults[editReview?.idx]?.[`${RATE_PROP}`] +
				review?.[`${RATE_PROP}`]) /
			totalReview
		).toFixed(1);

		setReview({
			[`${AVG_RATING_PROP}`]: newAvg,
		});

		fetchResults[editReview?.idx] = review;
		patchSearchResultInfoPromise({
			[`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults,
		});
		setEditReview({ open: false });
	};

	useEffect(() => {
		if (loading) {
			searchReviewHandle().then(() => setLoading(false));
		}
	}, []);

	const rateSection = (
		<Row justify="center">
			<Col
				xs={24}
				md={12}
				className="text-center bg-white p-5"
				style={{
					marginTop: "1rem",
					marginBottom: "3rem",
					borderRadius: "1rem",
					cursor: "pointer",
				}}
				onClick={() => setNewReviewOpen(true)}
			>
				<Typography.Title level={3}>Rate your experience</Typography.Title>
				<RateDisplay
					value={5}
					displayReview={false}
					rateProps={{
						className: "c-housing",
						style: {
							fontSize: "2rem",
						},
					}}
				/>
				<div className="pt-3">
					<Typography.Text className="c-primary " style={{ fontSize: "1rem" }}>
						Share feedback to people
					</Typography.Text>
				</div>
			</Col>
		</Row>
	);

	const header = (
		<Row justify="space-between" className="mb-3">
			<Col>
				<Space direction="vertical">
					<Typography.Title level={3} className="m-0">
						Customer Review
					</Typography.Title>
					<RateDisplay value={avgRating} totalReview={totalReview} />
				</Space>
			</Col>
		</Row>
	);

	const reviewList = (
		<Card
			className="info-description bg-transparent border-0"
			headStyle={{
				padding: 0,
			}}
			bodyStyle={{
				padding: 0,
			}}
		>
			{header}
			<List
				className="p-0"
				itemLayout="horizontal"
				dataSource={normalizeReviews(fetchResults)}
				renderItem={(item) => (
					<li>
						<Comment
							actions={item.actions}
							author={item.author}
							avatar={item.avatar}
							content={item.content}
							datetime={item.datetime}
						/>
					</li>
				)}
				loadMore={<LoadMore />}
			/>
		</Card>
	);

	const app = (
		<Row justify="center" className="my-3" id="review-page">
			<Col xs={24}>
				{" "}
				{rateSection}
				{reviewList}
			</Col>
			{(newReviewOpen || editReview?.open) && (
				<AuthContainer
					key={0}
					closeUrl={location?.pathname + location?.search || "/"}
					continueUrl="/signin"
					successUrl={location?.pathname + location?.search || "/"}
				>
					{newReviewOpen && (
						<EditReview
							open={newReviewOpen}
							editing={false}
							type={type}
							revieweeId={revieweeId}
							profile={profile}
							onCancel={() => setNewReviewOpen(false)}
							onOk={handleNewReviewOk}
						/>
					)}
					{editReview?.open && (
						<EditReview
							open={editReview?.open}
							review={editReview?.review}
							type={type}
							profile={profile}
							onCancel={() =>
								setEditReview({
									open: false,
								})
							}
							onOk={handleEditReviewOk}
						/>
					)}
				</AuthContainer>
			)}
		</Row>
	);

	return loading ? <SkeletonCard cover={false} /> : app;
}

export default ReviewPage;
