import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import SwitchProfile from "../../Component/Profile/SwitchProfile";
import AuthContainer from "./AuthContainer";

function SwitchProfileContainer() {
	const app = (
		<AuthContainer
			closeUrl="/"
			continueUrl="/signin"
			successUrl="/switch-profiles"
		>
			<div id="switch-profiles" className="pb-2">
				{usePageHeader()}
				<SwitchProfile />
			</div>
		</AuthContainer>
	);
	return app;
}

export default SwitchProfileContainer;
