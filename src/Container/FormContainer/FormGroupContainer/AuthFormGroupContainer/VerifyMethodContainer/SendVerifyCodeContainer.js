import { Stack } from "react-bootstrap";
import EmailFromGroupControl from "../../../../../Component/Form/FormGroupControl/EmailFormGroupControl";
import PhoneFromGroupControl from "../../../../../Component/Form/FormGroupControl/PhoneFormGroupControl";
import PrevstepFormGroupControl from "../../../../../Component/Form/FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../../../../../Component/Form/FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../../../../../Component/Form/FormGroupControl/SubmitButtonFormGroupControl";

import * as dispatchPromise from "../../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../../Util/ConstVar";

function SendVerifyCodeContainer({
	title = "",
	storageObjName = "",
	headlineGap = 3,
	onSubmitLoading = false,
	onBack = () => {},
	EmailRenderFormControl = () => {},
	PhoneRenderFormControl = () => {},
}) {
	const verifyMethod =
		dispatchPromise.getState()[`${storageObjName}`]?.[
			`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`
		] || "";

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
								{" "}
								Hi, <span className="fw-bold">there</span>
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
						Awesome, now please enter a valid{" "}
						{verifyMethod === constVar.STORAGE_EMAIL_PROP
							? " email address "
							: verifyMethod === constVar.STORAGE_PHONE_PROP
							? " phone number "
							: ""}
					</div>
				</Stack>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const emailFormGroupControl = (
		<EmailFromGroupControl
			required={true}
			RenderFormControl={EmailRenderFormControl}
			renderProps={{ saveAndLoadValue: false }}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			required={true}
			RenderFormControl={PhoneRenderFormControl}
			renderProps={{ saveAndLoadValue: false }}
		/>
	);

	const onBackCallBack = () => {
		switch (storageObjName) {
			case constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ:
				dispatchPromise.patchSignupUserInfo({
					[`${constVar.STORAGE_EMAIL_PROP}`]: "",
					[`${constVar.STORAGE_PHONE_PROP}`]: "",
				});
				break;
			default:
				break;
		}
	};

	const app = (
		<Stack className="w-100" gap={4}>
			{" "}
			{headline}
			<div className="w-75 mx-auto" style={{ maxWidth: "25rem" }}>
				{verifyMethod === constVar.STORAGE_EMAIL_PROP
					? emailFormGroupControl
					: verifyMethod === constVar.STORAGE_PHONE_PROP
					? phoneFormGroupControl
					: ""}
				<div className="mt-4">
					<PrevstepFormGroupControl
						className="px-0"
						variant="link"
						title={`Go Back ${
							verifyMethod === constVar.STORAGE_EMAIL_PROP
								? "and verify by SMS instead"
								: verifyMethod === constVar.STORAGE_PHONE_PROP
								? "and verify by Email instead"
								: ""
						}`}
						onClick={() => onBack(onBackCallBack)}
					/>
				</div>
			</div>
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					className="px-5"
					title="Send verification code"
					isLoading={onSubmitLoading}
				/>
			</div>
		</Stack>
	);
	return app;
}

export default SendVerifyCodeContainer;
