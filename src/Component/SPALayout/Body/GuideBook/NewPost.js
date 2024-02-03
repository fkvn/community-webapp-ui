import { useSelector } from "react-redux";
import { USER_REDUCER } from "../../../../Util/ConstVar";
import FormPageHeader from "../../Header/FormPageHeader";

function NewGuideBookPost() {
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);

	const newPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
		"GUIDEBOOK_CREATE",
	];

	const App = () => (
		<>
			<FormPageHeader />
		</>
	);

	return <App />;
}

export default NewGuideBookPost;
