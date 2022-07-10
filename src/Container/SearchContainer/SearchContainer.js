import { Button } from "react-bootstrap";
import Search from "../../Component/Search/Search";

function SearchContainer({ expanded = true }) {
	const app = (
		<>
			{expanded && <Search direction="horizontal" />}
			{!expanded && <Button>Search Now</Button>}
		</>
	);

	return app;
}

export default SearchContainer;
