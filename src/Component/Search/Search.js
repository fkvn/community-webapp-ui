import FormContainer from "../../Container/FormContainer/FormContainer";
import SearchForm from "../Form/FormLayout/SearchForm";

function Search() {
	const FormBody = {
		FormComponent: SearchForm,
	};

	const app = FormContainer(() => {}, FormBody);

	return app;
}

export default Search;
