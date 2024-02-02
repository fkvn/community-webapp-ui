import React from "react";

function useHorizontalScroll() {
	const ref = React.createRef();

	const scroll = (offset = 100, amountOffset = 10, threshold = 100) => {
		if (ref.current) {
			let scrollAmount = 0;
			var slideTimer = setInterval(function () {
				ref.current.scrollLeft += offset;
				scrollAmount += amountOffset;
				if (scrollAmount >= threshold) {
					window.clearInterval(slideTimer);
				}
			}, 25);
		}
	};

	const scrollContainer = (chilrden) => (
		<div
			ref={ref}
			className="hideScrollHorizontal"
			style={{ overflow: "auto" }}
		>
			{chilrden}
		</div>
	);

	return {
		scrollContainer,
		scroll,
	};
}

export default useHorizontalScroll;
