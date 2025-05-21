import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserJobs from "./jobs/pages/UserJobs";
import MainNavigation from "./shared/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <UserJobs />
      </main>
    </Router>
  );
}

export default App;
