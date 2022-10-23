import { Button, Col, Form, Row, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
	DEFAULT_USER_INFO,
	FIRSTNAME_PROP,
	INFO_PROP,
	LASTNAME_PROP,
	NAME_PROP,
} from "../../Util/ConstVar";
import usePictureWall from "../Hook/FormHook/UsePictureWall";
import useUsername from "../Hook/FormHook/useUsername";

function EditProfile({ profile = {} }) {
	const [form] = useForm();
	const { [`${INFO_PROP}`]: info } = {
		...profile,
		[`${INFO_PROP}`]: { ...DEFAULT_USER_INFO, ...profile?.[`${INFO_PROP}`] },
	};

	const header = (
		<>
			<Typography.Title level={5} type="danger">
				Please don't forget to save and review carefully while updating the
				profile information
			</Typography.Title>
		</>
	);

	const infoForm = (
		<Form className="my-4 " form={form}>
			<Space
				size={20}
				direction="vertical"
				className="w-100 my-2 my-xl-4 "
				style={{ maxWidth: "35rem" }}
			>
				{useUsername({ initialValue: info?.[`${NAME_PROP}`] }, {})}
				{useUsername(
					{
						name: FIRSTNAME_PROP,
						label: "First Name",
						initialValue: info?.[`${FIRSTNAME_PROP}`],
					},
					{},
					false
				)}
				{useUsername(
					{
						name: LASTNAME_PROP,
						label: "Last Name",
						initialValue: info?.[`${LASTNAME_PROP}`],
					},
					{},
					false
				)}
				{usePictureWall({
					form: form,
					itemProps: {
						label: "Cover pictures",
					},
				})}
				<Button onClick={() => form.validateFields()}>Submit</Button>
			</Space>
		</Form>
	);

	const app = (
		<Row justify="center" className="m-4 m-xl-5 ">
			<Col>
				{header}
				{infoForm}
			</Col>
		</Row>
	);
	return app;
}

export default EditProfile;
