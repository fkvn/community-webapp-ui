import useSearch from "./useSearch";

const useClearFilter = () => {
	const { dispatchSearch } = useSearch();

	return () =>
		dispatchSearch({
			filter: false,
		});
};

export default useClearFilter;
