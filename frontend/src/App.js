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
          element={isAuthenticated ? null : <Register />}
        />


        {/* <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />

        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;