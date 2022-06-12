import EmailFromGroupControl from "../../../../../Component/Form/FormGroupControl/EmailFormGroupControl";
import PhoneFromGroupControl from "../../../../../Component/Form/FormGroupControl/PhoneFormGroupControl";
import PrevstepFormGroupControl from "../../../../../Component/Form/FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../../../../../Component/Form/FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../../../../../Component/Form/FormGroupControl/SubmitButtonFormGroupControl";

import * as dispatchPromise from "../../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../../Util/ConstVar";

function SendVerifyCodeContainer({
	storageObjName = "",
	onSubmitLoading = false,
	onBack = () => {},
	EmailRenderFormControl = () => {},
	PhoneRenderFormControl = () => {},
}) {
	const verifyMethod =
		dispatchPromise.getState()[`${storageObjName}`][
			`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`
		];

	const headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p className="text-center">
						Now we have to verify your
						{verifyMethod === constVar.STORAGE_EMAIL_PROP
							? " email address "
							: verifyMethod === constVar.STORAGE_PHONE_PROP
							? " phone number "
							: ""}
					</p>
					<p className="text-center">
						To continue, please enter a valid{" "}
						{verifyMethod === constVar.STORAGE_EMAIL_PROP
							? " email address "
							: verifyMethod === constVar.STORAGE_PHONE_PROP
							? " phone number "
							: ""}
					</p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const emailFormGroupControl = (
		<EmailFromGroupControl
			required={true}
			storageObjName={storageObjName}
			RenderFormControl={EmailRenderFormControl}
			saveAndLoadValue={false}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			required={true}
			storageObjName={storageObjName}
			RenderFormControl={PhoneRenderFormControl}
			saveAndLoadValue={false}
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
		<>
			{" "}
			{headline}
			{verifyMethod === constVar.STORAGE_EMAIL_PROP
				? emailFormGroupControl
				: verifyMethod === constVar.STORAGE_PHONE_PROP
				? phoneFormGroupControl
				: ""}
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					className="px-5"
					title="Send verification code"
					show={onSubmitLoading}
				/>
			</div>
			<div className="text-center">
				<PrevstepFormGroupControl
					className="px-5"
					variant="link"
					title="Go Back and verify by another way"
					onClick={() => onBack(onBackCallBack)}
				/>
			</div>
		</>
	);
	return app;
}

export default SendVerifyCodeContainer;
