import { Trans } from "react-i18next";

function TermAgreement({ divProps = {}, tranProps = {} }) {
	const app = (
		<div {...divProps} style={{ fontSize: "1rem" }}>
			<Trans i18nKey={"term_privacy_msg"} {...tranProps}>
				By continuing, you agree to ThaiNow
				<a href="">Term of Service </a>
				and <a href="/">Privacy Policy </a>
			</Trans>
		</div>
	);
	return app;
}

export default TermAgreement;
