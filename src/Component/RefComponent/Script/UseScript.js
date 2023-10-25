import { useEffect } from "react";
import { loadScript } from "../../Util/Util";

const useScript = (url) => {
	useEffect(() => {
		const script = loadScript(url, true, true);

		return () => {
			document.body.removeChild(script);
		};
	}, [url]);
};

export default useScript;
