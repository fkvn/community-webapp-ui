function ProfileContainer() {
	const profile = {
		type: "Guest",
		guest: {
			profileUrl: "",
		},
		user: {
			id: "",
			profileUrl: "",
			username: "",
			location: {
				publicLocation: false,
				description: "",
				placeid: "",
				locality: "",
				state: "",
				zipcode: "",
			},
			firstname: "",
			lastname: "",
			email: "",
			publicEmail: false,
			phone: "",
			publicPhone: false,
		},
		company: [
			{
				id: "",
				logoUrl: "",
				location: {
					publicLocation: false,
					description: "",
					placeid: "",
					locality: "",
					state: "",
					zipcode: "",
				},
				description: "",
				industry: "",
				website: "",
				email: "",
				phone: "",
				founded: "",
				size: "",
				administrator: "",
				administratorRole: "",
			},
		],
	};

	const app = <></>;
	return app;
}

export default ProfileContainer;
