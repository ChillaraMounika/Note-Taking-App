import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesProvider } from "./context/NoteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<NotesProvider>
		<App />
	</NotesProvider>
);