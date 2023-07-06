import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Design from "./component/design";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/reducer/UserReducer";

function App() {
  const dispatch = useDispatch();
  const tokenExpiration = useSelector((state) => state.user.tokenExpiration);
  React.useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      const currentTime = new Date().getTime();
      if (tokenExpiration && currentTime > parseInt(tokenExpiration, 10)) {
        dispatch(logout());
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(checkTokenExpiration);
    };
  }, [dispatch, tokenExpiration]);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/login"
            element={isAuthenticated ? <Navigate to="../" /> : <Login />}
          />
          <Route
            exact
            path="/design"
            element={isAuthenticated ? <Design /> : <Navigate to="../login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
