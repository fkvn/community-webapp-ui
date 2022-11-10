import { Rate } from "antd";

function RateDisplay({
	disabled = true,
	value = 0,
	totalReview = 0,
	allowHalf = true,
	rateProps = {
		style: { fontSize: "1.2rem" },
		className: "c-housing-important m-0",
	},
	reviewTextProps: { className = "", ...props } = {},
	displayReview = true,
} = {}) {
	const app = (
		<span className="rate-span">
			<span>
				<Rate
					disabled={disabled}
					value={value || 0}
					allowHalf={allowHalf}
					{...rateProps}
				/>
			</span>
			{displayReview && (
				<span
					className={`ant-rate-text c-housing-important ${className}`}
					{...props}
				>
					{totalReview || 0} Reviews
				</span>
			)}
		</span>
	);
	return app;
}

export default RateDisplay;
