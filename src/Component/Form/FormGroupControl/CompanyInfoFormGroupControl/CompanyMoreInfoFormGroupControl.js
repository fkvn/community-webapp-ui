import React from "react";
import { Accordion, Form } from "react-bootstrap";
import CompanyEmailFormControlContainer from "../../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyEmailFormControlContainer";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import EmailFromGroupControl from "../EmailFormGroupControl";

function CompanyMoreInfoFormGroupControl({
	storageObjName = "",
	formGroupClassName = "",
}) {
	// toggle when users want to save extra info for their customers
	const onSubmitExtraInfoHandler = () => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_COMPANY_SUBMIT_EXTRA_INFO_VALIDATION,
			!util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_SUBMIT_EXTRA_INFO_VALIDATION}`
			]
		);
	};

	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<Accordion flush>
				<Accordion.Item eventKey="0">
					<Accordion.Header
						as="h2"
						className="link-primary"
						id="company-more-info-header"
						onClick={onSubmitExtraInfoHandler}
					>
						More Information about your business (Optional)
					</Accordion.Header>
					<Accordion.Body className="px-0">
						<EmailFromGroupControl
							required={true}
							storageObjName={storageObjName}
							RenderFormControl={CompanyEmailFormControlContainer}
						/>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Form.Group>
	);
	return app;
}

export default CompanyMoreInfoFormGroupControl;
