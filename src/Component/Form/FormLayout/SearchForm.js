import { Col, Row } from "react-bootstrap";
import SearchInputFormControlContainer from "../../../Container/FormContainer/FormControlContainer/SearchFormControlContainer/SearchInputFormControlContainer";

function SearchForm({ expanded = true }) {
	const searchInput = <SearchInputFormControlContainer />;

	const app = (
		<>
			{expanded ? (
				<Row className="w-100">
					<Col xs={5}>{searchInput}</Col>
					<Col xs={5}>{searchInput}</Col>
					<Col xs={2}>dsad</Col>
				</Row>
			) : (
				<></>
			)}
		</>
	);

	return app;
}

export default SearchForm;
