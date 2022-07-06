import { Stack } from "react-bootstrap";
import PrevstepFormGroupControl from "../../../../../Component/Form/FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../../../../../Component/Form/FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../../../../../Component/Form/FormGroupControl/SubmitButtonFormGroupControl";

import * as asset from "../../../../../Assest/Asset";
import * as dispatchPromise from "../../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../../Util/ConstVar";

function SelectVerifyMethodContainer({
	title = {},
	headlineGap = 3,
	storageObjName = "",
	onSubmitLoading = false,
	onSelectVerifyMethod = () => {},
	onBack = () => {},
}) {
	const getCallerName = (storageObjName = "") => {
		let callerName = "there";

		switch (storageObjName) {
			case constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ:
				callerName =
					dispatchPromise.getState()[
						`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`
					]?.[`${constVar.STORAGE_USERNAME_PROP}`] || "there";
				break;

			case constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ:
				callerName =
					dispatchPromise.getState()[
						`${constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ}`
					]?.[`${constVar.STORAGE_COMPANY_NAME_PROP}`] || "there";
				break;

			default:
				break;
		}

		return callerName;
	};

	const headline = (
		<ReadOnlyFormGroupControl
			title={
				<Stack gap={headlineGap}>
					<div className="fs-3 text-center">
						{title ? (
							title
						) : (
							<>
								Hi,{" "}
								<span className="fw-bold">
									{getCallerName(storageObjName)}.{" "}
								</span>
								Thanks for signing up.{" "}
							</>
						)}
					</div>
					<div className="w-100 text-center">
						Congratulations,{" "}
						<span className="fw-bold">{getCallerName(storageObjName)} </span>.
						You're almost done.
					</div>

					<div className="w-100 text-center">
						Let's verify your identity to protect a healthy Community
					</div>

					<div className="w-100 text-center text-danger">
						ThaiNow users must be verified before they can sign in.
					</div>
				</Stack>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const emailVerificationBtn = (
		<SubmitButtonFormGroupControl
			show={onSubmitLoading}
			formGroupClassName="text-center pt-3"
			className="px-5"
			id="email-verification"
			title="Email Verification"
			variant="white"
			withIcon={true}
			iconSrc={asset.icons[`${constVar.ICON_EMAIL_BLACK}`]}
			customSubmit={true}
			onClick={() => {
				onSelectVerifyMethod("email");

				// dispatch submit event
				// const form = e.target.form;
				// form.dispatchEvent(new Event("submit"));
			}}
		/>
	);

	const smsVerificationBtn = (
		<SubmitButtonFormGroupControl
			isLoading={onSubmitLoading}
			formGroupClassName="text-center pt-3"
			className="px-5"
			id="sms-verification"
			title="SMS Verification"
			variant="white"
			withIcon={true}
			iconSrc={asset.icons[`${constVar.ICON_PHONE_BLACK}`]}
			customSubmit={true}
			// buttonStyle={{ border: "1px solid rgba(102, 102, 102, 0.5) !important" }}
			onClick={() => {
				onSelectVerifyMethod("phone");

				// dispatch submit event
				// const form = e.target.form;
				// form.dispatchEvent(new Event("submit"));
			}}
		/>
	);

	const app = (
		<Stack className="w-100" gap={4}>
			{" "}
			{headline}
			{emailVerificationBtn}
			{smsVerificationBtn}
			<div className="text-center mt-5">
				<PrevstepFormGroupControl
					variant="secondary"
					title="Go Back"
					onClick={() => onBack()}
				/>
			</div>
		</Stack>
	);
	return app;
}

export default SelectVerifyMethodContainer;
