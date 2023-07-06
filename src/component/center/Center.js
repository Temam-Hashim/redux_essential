import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUser } from "../../redux/action/UserAction.js";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { clearError } from "../../redux/reducer/UserReducer.js";

function Center() {
  const dispatch = useDispatch();
  const { addError, addStatus } = useSelector((state) => state.user);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const random = Math.random() * 100;

  const userData = {
    full_name: name,
    email: email,
    gender: gender,
    mobile: mobile,
    password: "xyz",
    account_no: "10002345" + random,
    branch: "Bole",
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addUser(userData));
    // dispatch(clearError());
  };

  return (
    <div className="center m-5">
      <h3>Add New User</h3>
      {/* <span>{error}</span> */}
      {addStatus !== null && (
        <div className="text-info bg-secondary">{addStatus}</div>
      )}
      <form className="form mb-2" style={{ border: "1px solid gray" }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control m-2"
            style={{ width: "90%" }}
            placeholder="your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control m-2"
            style={{ width: "90%" }}
            placeholder="your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control m-2"
            style={{ width: "90%" }}
            placeholder="your mobile"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            className="form-control m-2"
            style={{ width: "90%" }}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male" defaultValue={"Male"}>
              Male
            </option>
            <option value="Female">Female</option>
          </select>
        </div>
        {addError && <div className="text-danger">{addError}</div>}
        {addStatus === "loading" ? (
          <LoadingButton
            loading
            variant="contained"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            sx={{ m: 2 }}
          >
            Adding..
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ width: "75%", mb: 2 }}
            onClick={handleAdd}
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}

export default Center;
