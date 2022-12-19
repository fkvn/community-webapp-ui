import { Button } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	SEARCH_DEAL,
	SEARCH_FILTER,
	SEARCH_JOB,
	SEARCH_TYPE_PROP,
} from "../../../Util/ConstVar";
import ModalDealFilter from "./ModalDealFilter";
import ModalJobFilter from "./ModalJobFilter";

function SearchFilter({ buttonProps = {} } = {}) {
	const [searchParams] = useSearchParams();
	const searchTypeParam = searchParams.get(SEARCH_TYPE_PROP) || "";
	const filterParam = searchParams.get(SEARCH_FILTER) || false;

	const [openFilter, setOpenFilter] = useState(false);

	const fetchFilter = () => {
		const props = {
			open: openFilter,
			onHide: () => setOpenFilter(false),
		};

		switch (searchTypeParam) {
			case SEARCH_DEAL:
				return <ModalDealFilter {...props} />;
			case SEARCH_JOB:
				return <ModalJobFilter {...props} />;
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
