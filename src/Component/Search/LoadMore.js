import { Button, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import {
	SEARCH_FETCH_RESULT_PROP,
	SEARCH_PAGE_PROP,
	SEARCH_RESULT_OBJ,
	SEARCH_TOTAL_PAGE_PROP,
} from "../../Util/ConstVar";
import useSearch from "../Hook/SearchHook/useSearch";

function LoadMore({ title = "Load More", buttonProps = {} }) {
	const [searchParams] = useSearchParams();

	const pageParam = searchParams.get(SEARCH_PAGE_PROP) || 1;

	const {
		[`${SEARCH_RESULT_OBJ}`]: {
			[`${SEARCH_TOTAL_PAGE_PROP}`]: totalPage = pageParam,
			[`${SEARCH_FETCH_RESULT_PROP}`]: fetchResults = [],
		} = {},
	} = useSelector(thainowReducer);

	const { dispatchSearch } = useSearch();

	const searchLoadMore = () =>
		dispatchSearch({
			params: {
				[`${SEARCH_PAGE_PROP}`]: Number(pageParam) + 1,
			},
			loadMore: true,
			currentFetchResults: [...fetchResults],
			backToTop: false,
		});

	const app = (
		<Row justify="center">
			<Col>
				<Button {...buttonProps} onClick={searchLoadMore}>
					{title}
				</Button>
			</Col>
		</Row>
	);
	return pageParam < totalPage ? app : <></>;
}

export default LoadMore;
