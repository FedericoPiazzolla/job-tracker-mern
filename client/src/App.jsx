import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import UserJobs from "./jobs/pages/UserJobs";

function App() {
  return (
    <Router>
      <main>
        <UserJobs />
      </main>
    </Router>
  );
}

export default App;
