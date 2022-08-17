import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function GoogleAuthContainer() {
	const [isLoading, setIsLoading] = useState(true);

	const handleCredentialResponse = (response) => {
		console.log("Encoded JWT ID token: " + response.credential);
		console.log(jwt_decode(response.credential));
	};

	useEffect(() => {
		if (isLoading && window.google.accounts) {
			new window.google.accounts.id.initialize({
				client_id:
					"776649368023-066tf4h17jo8m2bdfbjbjo7lov8moln8.apps.googleusercontent.com",
				callback: handleCredentialResponse,
			});

			setIsLoading(false);
		} else {
			window.document.cookie = "SameSite=Lax";
			new window.google.accounts.id.renderButton(
				document.getElementById("buttonDiv"),
				{ theme: "outline", size: "large" } // customization attributes
			);
		}
	});

	const app = (
		<>
			{!isLoading && (
				<>
					<div id="buttonDiv"></div>
				</>
			)}
		</>
	);
	return app;
}

export default GoogleAuthContainer;
