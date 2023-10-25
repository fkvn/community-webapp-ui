import { Button, Popconfirm } from "antd";
import usePost from "../../Hook/usePost";

function RemoveService({
	ownerId = null,
	serviceId = null,
	forward = true,
	children = <Button type="primary">Open Popconfirm with Promise</Button>,
}) {
	const { removeService } = usePost();

	const confirm = () => removeService(serviceId, ownerId, forward);

	const app = (
		<Popconfirm
			title="Are you sure to remove this service?"
			okText="Yes"
			onConfirm={confirm}
			okButtonProps={{ size: "middle", type: "danger", className: "my-2" }}
			cancelButtonProps={{ size: "middle" }}
			onOpenChange={() => console.log("open change")}
		>
			{children}
		</Popconfirm>
	);
	return app;
}

export default RemoveService;
