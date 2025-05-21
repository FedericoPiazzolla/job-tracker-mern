import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserJobs from "./jobs/pages/UserJobs";
import MainNavigation from "./shared/Navigation/MainNavigation";
import LandingPage from "./jobs/pages/LandingPage";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/u1/jobs" element={<UserJobs />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
