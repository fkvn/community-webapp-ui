import { Card, Skeleton } from "antd";

function SkeletonCard({ active = true, loading = true, cover = true }) {
	const app = (
		<Card
			cover={
				cover && (
					<div className="custom-center mt-5 " style={{ padding: "0 3.3rem" }}>
						<Skeleton.Avatar shape="circle" size={150} active={active} />
					</div>
				)
			}
			className="m-4 overflow-hidden"
		>
			<Skeleton loading={loading} active={active} />
		</Card>
	);

	return app;
}

export default SkeletonCard;
