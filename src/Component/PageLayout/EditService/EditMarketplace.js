import {
	Button,
	Checkbox,
	Col,
	Divider,
	Form,
	Row,
	Space,
	Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useState } from "react";
import {
	CATEGORY_PROP,
	CONDITION_PROP,
	CONTACT_INFO_PROP,
	COST_PROP,
	DATE_PROP,
	DEFAULT_MARKETPLACE_INFO,
	EMAIL_PROP,
	EXPIRED_ON_PROP,
	ID_PROP,
	INFO_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LOCATION_OBJ,
	LOCATION_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	TITLE_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import useAddress from "../../Hook/FormHook/useAddress";
import useContactInfo from "../../Hook/FormHook/useContactInfo";
import useDatePicker from "../../Hook/FormHook/useDatePicker";
import useNumber from "../../Hook/FormHook/useNumber";
import usePictureWall from "../../Hook/FormHook/UsePictureWall";
import usePostStatus from "../../Hook/FormHook/usePostStatus";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useTextarea from "../../Hook/FormHook/useTextarea";
import useUsername from "../../Hook/FormHook/useUsername";
import usePost from "../../Hook/usePost";

function EditMarketplace({ service = {}, editing = false, ownerId = null }) {
	const [form] = useForm();
	const {
		[`${ID_PROP}`]: id = -1,
		[`${INFO_PROP}`]: { [`${PICTURE_LIST_PROP}`]: pictureList = [], ...info },
	} = {
		...service,
		[`${INFO_PROP}`]: {
			...DEFAULT_MARKETPLACE_INFO,
			...service?.[`${INFO_PROP}`],
		},
	};

	const [moreInfor, setMoreInfor] = useState(editing);
	const [updating, setUpdating] = useState(false);

	const { updateMarketplace, createMarketplace } = usePost();

	const header = (
		<Row justify="center" className="text-center">
			<Col>
				<Typography.Title level={1} className="c-marketplace-important">
					Product Marketplace For Sell or Trade
				</Typography.Title>
				{editing && (
					<Typography.Title level={5} className="c-primary-important">
						Please review carefully and click "Save and Update" after updating
						the service information
					</Typography.Title>
				)}
			</Col>
		</Row>
	);

	const title = useUsername({
		itemProps: {
			name: TITLE_PROP,
			label: "Product Title ",
		},
		inputProps: {
			placeholder: "E.g. Used car, good condition macbook pro",
		},
	});

	const address = useAddress({
		itemProps: {
			label: "Sell or Trade Area / Post Area?",
			labelCol: { span: 24 },
		},
		inputProps: { prefix: "" },
		defaultLocation: editing ? info?.[`${LOCATION_PROP}`] || {} : {},
	});

	const coverPictures = usePictureWall({
		form: form,
		itemProps: {
			label: "Upload product’s photos",
			labelCol: { span: 24 },
		},
		required: true,
		cropAspect: 16 / 9,
		[`${PICTURE_LIST_PROP}`]: (editing ? pictureList : []).map((res) => {
			return { url: res };
		}),
	});

	const contactInfo = useContactInfo({
		info: editing ? info?.[`${CONTACT_INFO_PROP}`] : {},
	});

	const status = usePostStatus();

	const description = useTextarea({
		itemProps: {
			label: "Product Description",
			labelCol: { span: 24 },
		},
		inputProps: {
			placeholder: "Give people more information about this place",
		},
	});

	const condition = useRadioGroup({
		form: form,
		options: [
			{
				value: "New",
				title: "New",
			},
			{
				value: "Liked New",
				title: "Liked New",
			},
			{
				value: "Used",
				title: "Used",
			},
		],
		itemProps: {
			name: CONDITION_PROP,
			label: "Product Condition",
			labelCol: { span: 24 },
		},
		otherDefault:
			["New", "Liked New", "Used"].indexOf(info?.[`${CONDITION_PROP}`]) < 0
				? true
				: false,
		required: false,
		withOther: true,
	});

	const category = useRadioGroup({
		form: form,
		options: [
			{
				value: "Electronics",
				title: "Electronics",
			},
			{
				value: "Clothing and Accessories",
				title: "Clothing and Accessories",
			},
			{
				value: "Phone & Computer",
				title: "Phone & Computer",
			},
			{
				value: "Classifieds",
				title: "Classifieds",
			},
			{
				value: "Vehicles",
				title: "Vehicles",
			},
			{
				value: "Home and Garden",
				title: "Home and Garden",
			},
		],
		itemProps: {
			name: CATEGORY_PROP,
			label: "Product Category ",
			labelCol: { span: 24 },
		},
		otherDefault:
			[
				"Electronics",
				"Clothing and Accessories",
				"Phone & Computer",
				"Classifieds",
				"Vehicles",
				"Home and Garden",
			].indexOf(info?.[`${CATEGORY_PROP}`]) < 0
				? true
				: false,
		required: false,
		withOther: true,
		otherPlaceholder: "E.g. Family, Education, Book, E-Book",
	});

	const cost = useNumber({
		itemProps: {
			name: COST_PROP,
			label: "Product Cost Starts",
		},
	});

	const expiredOn = useDatePicker({
		itemProps: {
			label: "Expiration Date",
		},
		inputProps: {
			showTime: { defaultValue: moment("00:00:00", "HH:mm:ss") },
			format: "MM/DD/YYYY HH:mm:ss",
		},
	});

	const withMoreInfo = (
		<>
			<Divider className="m-0">
				<Checkbox
					checked={moreInfor}
					onChange={(e) => {
						setUpdating(true);
						setMoreInfor(e.target.checked);
					}}
					disabled={editing}
				>
					More Information
				</Checkbox>
			</Divider>
			{moreInfor && (
				<>
					{condition}
					{cost}
					{category}
					{expiredOn}
					{description}
				</>
			)}
		</>
	);

	const fetchContactInfo = () => {
		const contactInfoField = form.getFieldValue(CONTACT_INFO_PROP);

		const contactInfo = {
			...(contactInfoField?.[`${IS_EMAIL_PUBLIC_PROP}`] && {
				[`${EMAIL_PROP}`]: contactInfoField?.[`${EMAIL_PROP}`],
			}),
			...(contactInfoField?.[`${IS_PHONE_PUBLIC_PROP}`] && {
				[`${PHONE_PROP}`]: contactInfoField?.[`${PHONE_PROP}`],
			}),
			...(contactInfoField?.[`${IS_WEBSITE_PUBLIC_PROP}`] && {
				[`${WEBSITE_PROP}`]: contactInfoField?.[`${WEBSITE_PROP}`],
			}),
		};

		return contactInfo;
	};

	const submitHandle = () => {
		const submitInfo = {
			...form.getFieldsValue(),
			...form.getFieldValue(LOCATION_OBJ),
			[`${EXPIRED_ON_PROP}`]: form.getFieldValue(DATE_PROP)
				? form.getFieldValue(DATE_PROP).toDate()
				: null,
			[`${CONTACT_INFO_PROP}`]: fetchContactInfo(),
		};

		form
			.validateFields()
			.then(
				// () => console.log(submitInfo)
				editing
					? updateMarketplace(id, ownerId, submitInfo)
					: createMarketplace(ownerId, submitInfo)
			)
			.catch((e) => console.log(e))
			.finally(() => setUpdating(false));
	};

	const infoForm = (
		<Form
			className="my-4 "
			form={form}
			{...(editing && {
				initialValues: {
					...info,
					[`${DATE_PROP}`]: info?.[`${EXPIRED_ON_PROP}`]
						? moment(new Date(info?.[`${EXPIRED_ON_PROP}`]))
						: "",
					...(["Apartment", "Room", "House", "Condo"].indexOf(
						info?.[`${CATEGORY_PROP}`]
					) < 0 && {
						[`${CATEGORY_PROP}`]: "Other",
						[`${CATEGORY_PROP}-Other`]: info?.[`${CATEGORY_PROP}`] || "",
					}),
					...(["New", "Liked New", "Used"].indexOf(
						info?.[`${CONDITION_PROP}`]
					) < 0 && {
						[`${CONDITION_PROP}`]: "Other",
						[`${CONDITION_PROP}-Other`]: info?.[`${CONDITION_PROP}`] || "",
					}),
				},
			})}
			onFinish={submitHandle}
			onFieldsChange={() => setUpdating(true)}
		>
			<Space size={15} direction="vertical" className="w-100 my-2 my-xl-4 ">
				{title}
				{address}
				{coverPictures}
				{contactInfo}
				{status}
				{withMoreInfo}
				<Row justify="center" className="mt-4">
					<Col>
						<Button
							type="primary"
							size="large"
							shape="round"
							block
							htmlType="submit"
							// onClick={submitHandle}
							disabled={!updating}
						>
							{editing ? "Save and Update" : "Save and Post"}
						</Button>
					</Col>
				</Row>
			</Space>
		</Form>
	);

	const app = (
		<Row justify="center" className="m-4 m-xl-5">
			<Col>
				{header}
				{infoForm}
			</Col>
		</Row>
	);

	return app;
}

export default EditMarketplace;
