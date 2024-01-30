import { Breadcrumb } from "antd";
import { Link, useLocation, useMatches } from "react-router-dom";

// Must use with React Router Breadcrumb
function BreadcrumbContainer({ extra = false, extraCrumbs = {} }) {
	const { pathname } = useLocation();

	const matches = useMatches();

	let crumbs = matches
		// first get rid of any matches that don't have handle and crumb
		.filter((match) => Boolean(match.handle?.crumb))
		// now map them into an array of elements, passing the loader
		// data to each one
		.map((match) => {
			// adjust for Breadcrumb component of ant design framework
			const { path = pathname, title = "" } = match.handle.crumb(match.data);
			if (path === pathname) return { title: title };
			else
				return {
					title: (
						<Link to={path} className="text-decoration-none text-primary">
							{title}
						</Link>
					),
				};
		});

	if (extra) {
		crumbs = [...crumbs, { ...extraCrumbs }];
	}

	const App = () => (
		<>
			<Breadcrumb items={crumbs} separator=">" />
		</>
	);
	return <App />;
}

export default BreadcrumbContainer;
