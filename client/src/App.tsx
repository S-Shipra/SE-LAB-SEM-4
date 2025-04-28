import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { Home } from "./pages/home.tsx";
import { Login } from "./pages/login.tsx";
import { Sign } from "./pages/signup.tsx";
// import { DashboardCard } from "./pages/dashboardCard.tsx";
import { Analyze } from "./pages/analyze.tsx";
import { Blog } from "./pages/journaling.tsx";
import { Profile } from "./pages/profile.tsx";
import { useDispatch, useSelector } from "react-redux";

type RootState = {
  isLogin: boolean;
};

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.isLogin);

  const handleLogout = () => {
    try {
      dispatch(logout());
      alert("Logout Successfully");
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const linkStyle = {
    marginLeft: "10px",
    marginRight: "10px",
    textDecoration: "none",
    color: "#FFF6E9",
    textAlign: "center",
  };

  return (
    <div>
      <Router>
        <nav className="bg-blue-600/80 backdrop-blur-sm rounded-b-xl px-6 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-black hover:text-blue-200 px-3 py-1 text-sm font-medium"
            >
              Home
            </Link>
            {!isLogin && (
              <>
                <Link
                  to="/login"
                  className="text-black hover:text-blue-200 px-3 py-1 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-black hover:text-blue-200 px-3 py-1 text-sm font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
            {isLogin && (
              <>
                <Link
                  to="/journaling"
                  className="text-black hover:text-blue-200 px-3 py-1 text-sm font-medium"
                >
                  Journaling
                </Link>
                <Link
                  to="/analyze"
                  className="text-black hover:text-blue-200 px-3 py-1 text-sm font-medium"
                >
                  Analyze your condition
                </Link>
                <Link
                  to="/chatbot"
                  className="text-black hover:text-blue-200 px-3 py-1 text-sm font-medium"
                >
                  Chatbot
                </Link>
                <Link
                  to="/profile"
                  className="text-black hover:text-blue-200 px-3 py-1 text-sm font-medium"
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/journaling" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analyze" element={<Analyze />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10 text-xl">
                You are not on a valid page
              </h1>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
