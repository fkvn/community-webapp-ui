import React from "react";
import { Button, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import FormContainer from "../../Container/FormContainer/FormContainer";
import * as constVar from "../../Util/ConstVar";
import FormHeader from "../Form/FormLayout/FormHeader";
import NewBusinessSignupForm from "../Form/FormLayout/NewBusinessSignupForm";

function BusinessSignup({
	storageObjName = constVar.THAINOW_BUSINESS_SIGN_UP_STORAGE_OBJ,
	industryList = [],
	stepHandlers = [],
	onCloseHandler = () => {},
	onBackHandlerPromise = () => {},
}) {
	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const formHeader = (
		<FormHeader
			title={
				<Row>
					<p id="signup-header" className="p-0 m-0 d-block d-md-flex">
						<span style={{ fontSize: "1.2rem" }}>Create Business Account</span>
						<Button
							variant="link"
							href={"/signup" + continueParams}
							className="px-0 pt-0 my-0 pb-0 px-md-2 pb-md-1 text-start d-block d-md-inline-block"
						>
							<small>Switch account</small>
						</Button>
					</p>
				</Row>
			}
			onClose={onCloseHandler}
		/>
	);

	const FormBody = {
		FormComponent: NewBusinessSignupForm,
		storageObjName: storageObjName,
		industryList: industryList,
	};

	const app = FormContainer(
		formHeader,
		FormBody,
		stepHandlers,
		onBackHandlerPromise
	);

	return app;
}

export default BusinessSignup;