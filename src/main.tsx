import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { TimeLogProvider } from "./context/TimeLogContext";
import { InvoiceProvider } from "./context/InvoiceContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <TimeLogProvider>
          <InvoiceProvider>
            <App />
          </InvoiceProvider>
        </TimeLogProvider>
      </TaskProvider>
    </ProjectProvider>
  </React.StrictMode>
);
