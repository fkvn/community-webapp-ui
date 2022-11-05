import {
	Button,
	Card,
	Col,
	Comment,
	Grid,
	List,
	Rate,
	Row,
	Space,
	Tooltip,
	Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
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
								ellipsis
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
						<Rate
							disabled
							value={review?.[`${RATE_PROP}`]}
							allowHalf
							style={{ backgroundColor: "gray !important", fontSize: ".8rem" }}
							className="c-housing-important m-0"
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

	// const rateSection = (
	// 	<Row justify="center" className="my-4">
	// 		<Col>
	// 			<Card type="ghost">
	// 				<Meta
	// 					className="m-4 tedkvn-center"
	// 					title={profile?.[`${INFO_PROP}`]?.[`${NAME_PROP}`]}
	// 					avatar={avatar({
	// 						inputProps: {
	// 							src: profile?.[`${INFO_PROP}`]?.[`${PICTURE_PROP}`],
	// 						},
	// 					})}
	// 				>
	// 					dadsds
	// 				</Meta>
	// 			</Card>
	// 		</Col>
	// 	</Row>
	// );

	const reviewList = (
		<Card
			className="bg-transparent border-0"
			headStyle={{
				padding: 0,
			}}
			bodyStyle={{
				padding: 0,
			}}
			title={
				<Meta
					title={<Typography.Text ellipsis>Customer Review</Typography.Text>}
					description={
						<span className="p-">
							<Rate
								disabled
								value={avgRating}
								allowHalf
								style={{ backgroundColor: "gray !important" }}
								className="c-housing-important m-0"
							/>
							<span className="ant-rate-text c-housing-important">
								{totalReview} Reviews
							</span>
						</span>
					}
				/>
			}
			{...(screens.sm && {
				extra: [
					<Button
						type="link"
						key={0}
						onClick={() => setNewReviewOpen(true)}
						disabled={profile?.[`${ID_PROP}`] === revieweeId}
					>
						Rate your experience
					</Button>,
				],
			})}
		>
			<List
				className="p-0"
				// header={`${totalReview} Reviews`}
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
		<Row justify="center" className="my-3 ">
			<Col xs={24}>{reviewList}</Col>
			{(newReviewOpen || editReview?.open) && (
				<AuthContainer
					key={0}
					closeUrl="/"
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

			{/* <Modal
				title={
					<div className="tedkvn-center-left">
						{avatar({
							inputProps: {
								size: 35,
								src: profile?.[`${INFO_PROP}`]?.[`${PICTURE_PROP}`],
							},
						})}{" "}
						<Typography.Text ellipsis className="px-2">
							Rate your experience
						</Typography.Text>
					</div>
				}
				open={!isEmptyObject(profile) && newReview?.open}
				onOk={handleOk}
				confirmLoading={newReview?.confirmLoading}
				onCancel={handleCancel}
				okButtonProps={{
					style: { display: "block !important" },
				}}
				cancelButtonProps={{ style: { display: "block !important" } }}
				okText="Submit Review"
				centered
				zIndex={1000}
			>
				<Form form={form}>
					<Form.Item
						className="tedkvn-center"
						name={RATE_PROP}
						initialValue={5}
						rules={[
							{
								validator(_, value) {
									if (value < 0.5)
										return Promise.reject("Rate can't be less than 0.5");
									else return Promise.resolve();
								},
							},
						]}
					>
						<Rate
							allowHalf
							allowClear={false}
							style={{
								backgroundColor: "gray !important",
								fontSize: "1.8rem",
							}}
							className="c-housing-important m-0"
						/>
					</Form.Item>
					{useTextarea({
						itemProps: {
							name: COMMENT_PROP,
						},
						inputProps: {
							placeholder: "Enter your comments (optional)",
						},
						showLabel: false,
					})}
				</Form>
			</Modal> */}
		</Row>
	);

	return loading ? <SkeletonCard cover={false} /> : app;
}

export default ReviewPage;
