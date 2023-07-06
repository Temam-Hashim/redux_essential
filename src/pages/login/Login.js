import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/UserAction";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!mobile || !password) {
      setErrorMessage("Please enter both Mobile and password");
      return;
    }
    dispatch(login({ mobile, password }));
  };

  const { loginError, isAuthenticated, loginStatus } = useSelector(
    (state) => state.user
  );
  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div
        className="col-md-6 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "gold",
          color: "black",
          padding: "10px",
          margin: "10px",
          height: "400px",
        }}
      >
        <form className="w-75 h-50">
          <h2 className="text-primary mb-2">Login Page</h2>
          <div class="form-group w-100">
            <input
              type="text"
              name="mobile"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              class="form-control p-2 mb-3 "
              placeholder="Enter your Mobile"
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              class="form-control p-2 mt-3  w-100"
              placeholder="Type your Password"
              aria-describedby="helpId"
            />
          </div>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          {loginError && <div className="text-danger">{loginError}</div>}
          {loginStatus === "loading" ? (
            <LoadingButton
              loading
              variant="contained"
              loadingPosition="start"
              sx={{ m: 2 }}
              startIcon={<SaveIcon />}
            >
              Authenticating..
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="info"
              sx={{ width: "90%", m: 2, backgroundColor: "black" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </form>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}

export default Login;
