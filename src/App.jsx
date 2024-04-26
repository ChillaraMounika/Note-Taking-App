import React from "react";
import SelectNotes from "./components/SelectNotes/SelectNotes";
import RightSide from "./components/RightSide/RightSide";
import "./App.css";

function App() {
	return (
		<div className="App">
			<SelectNotes />
			<RightSide />
		</div>
	);
}

export default App;