import React from "react";
import { Accordion, Form } from "react-bootstrap";

function CompanyMoreInfoFormGroupControl({
	sessionStorageObjName = "",
	formGroupClassName = "",
}) {
	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<Accordion flush>
				<Accordion.Item eventKey="0">
					<Accordion.Header
						as="h2"
						className="link-primary"
						id="company-more-info-header"
					>
						More Information for your consumers
					</Accordion.Header>
					<Accordion.Body>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Form.Group>
	);
	return app;
}

export default CompanyMoreInfoFormGroupControl;
