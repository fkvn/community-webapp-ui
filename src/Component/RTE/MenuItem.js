import { Button } from "antd";

function MenuItem({ icon, title, action, isActive = null }) {
	return (
		<Button
			type={isActive && isActive() ? "primary" : "default"}
			className={`custom-center p-2 border-0`}
			onClick={action}
			title={title}
		>
			{icon}
		</Button>
	);
}
export default MenuItem;
