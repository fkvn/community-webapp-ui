import { BrowserRouter } from "react-router-dom";
import RouterBuilder from "../src/Container/RouteContainer/RouteBuilder";

function App() {
	return (
		<BrowserRouter>
			<RouterBuilder />
		</BrowserRouter>
	);
}

export default App;
