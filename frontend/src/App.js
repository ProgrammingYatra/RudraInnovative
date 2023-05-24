import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import { loadUser } from "./action/User";
import NotFound from "./pages/notfound/NotFound";
import Home from "./pages/home/Home";
import Register from "./components/register/Register";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import About from "./pages/about/About";
import Logout from "./pages/logout/Logout";
import UserProfile from "./components/userProfile/UserProfile";

function App() {
  <ToastContainer />;
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />

        <Route
          path="/register"
          element={isAuthenticated ? <Home/> : <Register />}
        />

        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/about"
          element={isAuthenticated && <About /> }
        />
        <Route
          path="/logout"
          element={isAuthenticated && <Logout /> }
        />
        <Route
          path="/user"
          element={isAuthenticated && <UserProfile /> }
        />

        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />

        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
        />

        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
