import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import Router from "./components/Router";
import {firebase, firebaseApp} from "./database";
import "./assets/styles/main.scss";
const container = document.getElementById("root");
const root = createRoot(container as any);
root.render(
    <StrictMode>
        <Router firebase={firebase} databaseApp={firebaseApp} />
    </StrictMode>,
);
