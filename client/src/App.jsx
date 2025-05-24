import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersJobs from "./jobs/pages/UsersJobs";
import ShowUserJob from "./jobs/pages/ShowUserJob";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LandingPage from "./jobs/pages/LandingPage";
import Auth from "./user/pages/Auth";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/u1/jobs" element={<UsersJobs />} />
          <Route path="/u1/jobs/j1" element={<ShowUserJob />} />{" "}
          {/*da sostituire con job id reale preso dl database */}
          <Route path="/auth" element={<Auth />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
