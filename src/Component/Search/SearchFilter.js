import { Button } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	SEARCH_DEAL,
	SEARCH_FILTER,
	SEARCH_TYPE_PROP,
} from "../../Util/ConstVar";
import ModalDealFilter from "./ModalDealFilter";

function SearchFilter({ buttonProps = {} } = {}) {
	const [searchParams] = useSearchParams();
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";
	const filterParam = searchParams.get(SEARCH_FILTER) || false;

	const [openFilter, setOpenFilter] = useState(false);

	const fetchFilter = () => {
		switch (searchTypeParam) {
			case SEARCH_DEAL:
				return (
					<ModalDealFilter
						open={openFilter}
						onHide={() => setOpenFilter(false)}
					/>
				);
		}
	};

	const filterButton = () => (
		<Button
			type="primary"
			className={`${!filterParam ? "bg-white text-dark" : "border-0"}`}
			style={{ borderRadius: "1rem" }}
			onClick={() => setOpenFilter(true)}
			{...buttonProps}
		>
			{filterParam ? "Filter Applied" : "Add Filter"}
		</Button>
	);

	const app = (
		<>
			{filterButton()}
			{openFilter && fetchFilter()}
		</>
	);
	return app;
}

export default SearchFilter;
