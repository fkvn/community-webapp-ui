import PrevstepFormGroupControl from "../../../../../Component/Form/FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../../../../../Component/Form/FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../../../../../Component/Form/FormGroupControl/SubmitButtonFormGroupControl";

import * as dispatchPromise from "../../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../../Util/ConstVar";

function SelectVerifyMethodContainer({
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
				<>
					<p className="text-center">
						Hi,{" "}
						<span className="fw-bold">{getCallerName(storageObjName)}. </span>
						Thanks for signing up.{" "}
					</p>
					<p className="text-center">
						To build a healthy community, please choose your preferred method
						below to verify your identity.
					</p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const emailVerificationBtn = (
		<SubmitButtonFormGroupControl
			show={onSubmitLoading}
			formGroupClassName="text-center pt-3"
			className="px-5"
			id="email-verification-btn"
			title="Email Verification"
			customSubmit={true}
			onClick={(e) => {
				onSelectVerifyMethod("email");

				// dispatch submit event
				const form = e.target.form;
				form.dispatchEvent(new Event("submit"));
			}}
		/>
	);

	const smsVerificationBtn = (
		<SubmitButtonFormGroupControl
			show={onSubmitLoading}
			formGroupClassName="text-center pt-3"
			className="px-5"
			id="sms-verification-btn"
			title="SMS Verification"
			variant="success"
			customSubmit={true}
			onClick={(e) => {
				onSelectVerifyMethod("phone");

				// dispatch submit event
				const form = e.target.form;
				form.dispatchEvent(new Event("submit"));
			}}
		/>
	);

	const app = (
		<>
			{" "}
			{headline}
			{emailVerificationBtn}
			{smsVerificationBtn}
			<div className="text-center ">
				<PrevstepFormGroupControl
					className="p-0 mb-1"
					variant="link"
					title="Go Back"
					onClick={() => onBack()}
				/>
			</div>
		</>
	);
	return app;
}

export default SelectVerifyMethodContainer;
