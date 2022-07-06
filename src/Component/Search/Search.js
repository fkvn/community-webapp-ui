import FormContainer from "../../Container/FormContainer/FormContainer";
import SearchForm from "../Form/FormLayout/SearchForm";

function Search() {
	const id = "search";

	const FormBody = {
		FormComponent: SearchForm,
	};

	const app = FormContainer(id, <></>, FormBody);

	return app;
}

export default Search;
