import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Row, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import {
	SEARCH_SORT,
	SEARCH_SORT_ACS,
	SEARCH_SORT_DATE,
	SEARCH_SORT_DESC,
	SEARCH_SORT_DISTANCE,
	SEARCH_SORT_ORDER,
} from "../../Util/ConstVar";
import useSearch from "../Hook/SearchHook/useSearch";
import SearchFilter from "./SearchFilter/SearchFilter";
import SearchSort from "./SearchSort";

function SearchOption() {
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams();
	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;
	const sortOrderParam =
		searchParams.get(SEARCH_SORT_ORDER) || SEARCH_SORT_DESC;

	const onSearchHanlder = ({ params = {} }) =>
		dispatchSearch({
			params: {
				...params,
			},
		});

	const sortItems = [
		{
			key: SEARCH_SORT_DATE,
			label: (
				<>
					Sort By Date{" "}
					{sortOrderParam === SEARCH_SORT_DESC ? (
						<ArrowUpOutlined />
					) : (
						<ArrowDownOutlined />
					)}
				</>
			),
		},
		{
			key: SEARCH_SORT_DISTANCE,
			label: "Sort by Distance",
		},
		{
			key: "Dasds",
			label: "Sort by Distance",
		},
	];

	const onSortClick = ({ key = "" }) => {
		switch (key) {
			case SEARCH_SORT_DATE:
			case SEARCH_SORT_DISTANCE:
				onSearchHanlder({
					params: {
						[`${SEARCH_SORT}`]: key,
						[`${SEARCH_SORT_ORDER}`]:
							sortOrderParam === SEARCH_SORT_DESC
								? SEARCH_SORT_ACS
								: SEARCH_SORT_DESC,
					},
				});
				break;

			default:
				break;
		}
	};

	const sortOption = (
		<Dropdown
			menu={{ items: [{ key: 1, label: "sss" }], onClick: onSortClick }}
		>
			<Button
				onClick={(e) => e.preventDefault()}
				className="border-0"
				style={{
					lineHeight: "1.8rem",
					minWidth: 0,
					flex: "auto",
					borderRadius: "50px",
				}}
			>
				Sort By {sortParam}
				{sortParam === SEARCH_SORT_DATE &&
					(sortOrderParam === SEARCH_SORT_DESC ? (
						<ArrowDownOutlined />
					) : (
						<ArrowUpOutlined />
					))}
			</Button>
		</Dropdown>
	);

	const app = (
		<Row align="middle" className="mt-3 mb-1 ">
			<Col xs={24}>
				<Space direction="horizontal" size={20} className="w-100">
					<SearchFilter />
					<SearchSort />
				</Space>
			</Col>
		</Row>
	);
	return app;
}

export default SearchOption;
