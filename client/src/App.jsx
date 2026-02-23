import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

// Lazy loading delle pagine
const LandingPage = React.lazy(() => import("./jobs/pages/LandingPage"));
const UsersJobs = React.lazy(() => import("./jobs/pages/UsersJobs"));
const ShowUserJob = React.lazy(() => import("./jobs/pages/ShowUserJob"));
const NewJob = React.lazy(() => import("./jobs/pages/NewJob"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<UsersJobs />} />
        <Route path="/jobs/:jobId" element={<ShowUserJob />} />
        <Route path="/jobs/new" element={<NewJob />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }>
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
