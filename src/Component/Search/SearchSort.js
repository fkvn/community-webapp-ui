import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
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

function SearchSort() {
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams();
	const sortParam = searchParams.get(SEARCH_SORT) || SEARCH_SORT_DATE;
	const sortOrderParam =
		searchParams.get(SEARCH_SORT_ORDER) || SEARCH_SORT_DESC;

	const handleSearchSort = ({ params = {} }) =>
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
	];

	const onSortClick = ({ key = "" }) => {
		switch (key) {
			case SEARCH_SORT_DATE:
			case SEARCH_SORT_DISTANCE:
				handleSearchSort({
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
		<Dropdown menu={{ items: sortItems, onClick: onSortClick }}>
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

	const app = sortOption;
	return app;
}

export default SearchSort;
