import RouteContainer from "./Component/Route/RouteContainer";
import useFirebase from "./firebase";

function App() {
	const {} = useFirebase();

	return <RouteContainer />;
}

export default App;
