import FormContainer from "../../Container/FormContainer/FormContainer";
import SearchForm from "../Form/FormLayout/SearchForm";

function Search({ direction = "", gap = 3 }) {
	const id = "search";

	const FormBody = {
		FormComponent: SearchForm,
		direction: direction,
		gap: gap,
	};

	const app = FormContainer({
		id: id,
		body: FormBody,
		noHeader: true,
		stepHandlers: [1],
	});

	return app;
}

export default Search;
