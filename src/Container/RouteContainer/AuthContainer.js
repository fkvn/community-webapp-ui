import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
	submitErrorHandlerPromise
} from "../../redux-store/dispatchPromise";
import {
	ACCESS_TOKEN_PROP, THAINOW_USER_OBJ
} from "../../Util/ConstVar";
import {signoutUserPromise} from "../../Util/Util";

function AuthContainer({ children = {} }) {
	/* Description

		Prerequisite -> When sign in the following information must be save:

		1. Storage.user {access_token, type, user = {}}
		2. Storage.profile {type, id, name, profileUrl }		

		A. We need to authorize account first before going to the following page:

		2. Switch Profile
		3. Register business
		4. My Profile (user / company)
		5. Change password
		6. Post Services
		7. Comment / Reply Reviews
		8. Ask / Answer Questions
	
		B. Auth Process 

		1. Check if local storage user is not empty
		2. Check if token is still available
		3. Delete storage user if either 1 and 2 is false and redirect to sign in
		4. if 1 and 2 are true, check if profile is empty in storage 
		5. if 4 is true, fetch profile as userProfile for both storage and redux
		7. if 4 is false and check if empty in redux, fetch profile from storage 

		C. After B, we make sure that we have user (in storage) and profile (in storage and redux)

		2. Switch Profile:
		
		2.1 Fetch user from storage and profile in redux.
		2.2 If either user or profile is empty -> display ERROR_MESSAGE and go back
		2.3 Otherwise, get companies from user and update Profile (storage and redux) after switching.
		
		3. Register Business

		3.1 Fetch user from storage -> if empty -> display ERROR_MESSAGE and go back
		3.2 Otherwise, register business and go back

		4. My Profile:

		4.1 Fetch Profile (id) from redux 
		4.2 Fetch profile (detail) info from Back-end
		4.3 If either 4.1 or 4.2 fails -> display ERROR_MESSAGE and go back 
		4.4 Otherwise, display and update profile info (if save) for the both storage (user storage if userProfile) and redux 

		5. Change Password

		5.1 Fetch Profile from redux
		5.2 Check if userProfile
		5.3 if either 5.1 and 5.2 fails -> display ERROR_MESSAGE and go back
		5.2 Otherwise, ask for current and new password -> update and go back

		6. Post Services

		6.1 Fetch Profile from redux -> if empty -> display ERROR_MESSAGE and go back
		6.2. Otherwise, create post with profile information and redirect to Post single-page (after posted / or saved as draft)

		7. Comment / Reply Reviews

		7.1 Fetch Profile from redux -> if empty -> sign out and display as Guest
		7.2 Otherwise, leave comments

		8. Ask / Answer Questions

		8.1 Fetch Profile from redux -> if empty -> sign out and display as Guest
		8.2 Otherwise, leave question / answer
		

	*/

	const navigate = useNavigate();
	const location = useLocation();
	const continueURL = location.state?.continue || "/";

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const validateToken = (access_token = "") => {
		if (access_token.length > 0) {
			let isExpiredToken = true;

			try {
				isExpiredToken = jwt_decode(access_token).exp < Date.now() / 1000;
			} catch (e) {}

			return !isExpiredToken;
		}
		return false;
	};

	const validateSignInCredentials = () => {
		const storageUser =
			JSON.parse(localStorage.getItem(THAINOW_USER_OBJ)) || {};

		const access_token = storageUser?.[`${ACCESS_TOKEN_PROP}`] || "";

		const isValidToken = validateToken(access_token);

		if (!isValidToken) {
			submitErrorHandlerPromise(
				"Your credentials are incorrect or have expired  .... Please sign in again!"
			).catch(() => {
				signoutUserPromise().then(() =>
					setTimeout(
						() =>
							navigate("/signin", {
								state: {
									continue: continueURL,
								},
							}),
						2000
					)
				);
			});
		} else {
			setIsAuthenticated(true)
		}
	};

	const init = () => {
		if (!isAuthenticated) {
			validateSignInCredentials();
		}
	};

	useEffect(() => {
		init();
	});

	const app = <>{isAuthenticated && children}</>;
	return app;
}

export default AuthContainer;
