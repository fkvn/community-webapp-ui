import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function LoadingButton({ loadingMsg = "Loading...", defaultMsg = "Submit" }) {
	const [isLoading, setLoading] = useState(false);

	const simulateNetworkRequest = () => {
		return new Promise((resolve) => setTimeout(resolve, 2000));
	};

	const handleClick = () => setLoading(true);

	useEffect(() => {
		if (isLoading) {
			simulateNetworkRequest().then(() => {
				setLoading(false);
			});
		}
	}, [isLoading]);

	const app = (
		<Button
			variant="primary"
			disabled={isLoading}
			onClick={!isLoading ? handleClick : null}
		>
			{isLoading ? loadingMsg : defaultMsg}
		</Button>
	);

	return app;
}

export default LoadingButton;
