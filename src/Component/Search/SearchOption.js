import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useSearchParams } from "react-router-dom";
import {
	SEARCH_SORT,
	SEARCH_SORT_ACS,
	SEARCH_SORT_DATE,
	SEARCH_SORT_DESC,
	SEARCH_SORT_DISTANCE,
	SEARCH_SORT_ORDER,
} from "../../Util/ConstVar";
import useSearch from "../Hook/useSearch";

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

	const sortOptions = {
		key: SEARCH_SORT,
		label: (
			<>
				Sort By {sortParam}{" "}
				{sortOrderParam === SEARCH_SORT_DESC ? (
					<ArrowUpOutlined style={{ verticalAlign: "none" }} />
				) : (
					<ArrowDownOutlined />
				)}
			</>
		),
		style: { cursor: "pointer", zIndex: 200, backgroundColor: "white" },
		children: [
			{
				key: SEARCH_SORT_DATE,
				label: (
					<>
						Sort by Date{" "}
						{sortOrderParam === SEARCH_SORT_DESC ? (
							<ArrowUpOutlined style={{ verticalAlign: "none" }} />
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
		],
	};

	const menuItems = [sortOptions];

	const menuActions = ({ key = "" }) => {
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

	const searchOptionMenu = (
		<Menu
			mode="horizontal"
			className="mt-3 mb-1 bg-transparent border-0"
			triggerSubMenuAction="click"
			style={{
				lineHeight: "1.8rem",
			}}
			items={menuItems}
			onClick={menuActions}
		/>
	);

	const app = searchOptionMenu;
	return app;
}

export default SearchOption;
