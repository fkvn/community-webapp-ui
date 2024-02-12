import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { POLICY_PATH, TERM_PATH } from "../../Util/ConstVar";

function TermAgreement({ divProps = {}, tranProps = {} }) {
	const App = () => (
		<div {...divProps} style={{ fontSize: "1rem" }}>
			<Trans i18nKey={"term_privacy_msg"} {...tranProps}>
				By continuing, you agree to ThaiNow
				<Link to={TERM_PATH}>Term of Service </Link>
				and <Link to={POLICY_PATH}>Privacy Policy </Link>
			</Trans>
		</div>
	);
	return <App />;
}

export default TermAgreement;
