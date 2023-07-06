import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/action/UserAction.js";
import { logout, clearError } from "../../redux/reducer/UserReducer.js";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";

function LeftBar() {
  const dispatch = useDispatch();
  const { currentUser, updateError, updateStatus } = useSelector(
    (state) => state.user
  );
  const [name, setName] = React.useState(currentUser.full_name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [mobile, setMobile] = React.useState(currentUser.mobile);
  const [gender, setGender] = React.useState(currentUser.gender);
  const [change, setChange] = React.useState(false);
  const currentUserId = currentUser.id;

  const userData = {
    full_name: name,
    email: email,
    gender: gender,
    id: currentUserId,
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    dispatch(clearError());
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // Check if any field is changed
  React.useEffect(() => {
    setChange(
      name !== currentUser.full_name ||
        email !== currentUser.email ||
        gender !== currentUser.gender ||
        mobile !== currentUser.mobile
    );
  }, [name, email, mobile, gender, currentUser]);

  return (
    <div
      className="leftBar"
      style={{
        borderRight: "1px solid gray",
        backgroundColor: "#eee",
        marginTop: "10px",
        height: "100%",
      }}
    >
      <div className="updateUser">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
            borderBottom: "1px",
          }}
        >
          <h>Update Profile Info</h>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            size="small"
            sx={{ height: 32 }}
          >
            Logout
          </Button>
        </div>

        {updateError && <div className="text-danger">{updateError}</div>}
        {updateStatus && <div className="text-info">{updateStatus}</div>}
        <form className="form mb-2">
          <div className="form-group">
            <input
              type="text"
              value={name}
              className="form-control m-2"
              style={{ width: "90%" }}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={email}
              className="form-control m-2"
              style={{ width: "90%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={mobile}
              className="form-control m-2"
              style={{ width: "90%" }}
              onChange={(e) => setMobile(e.target.value)}
            />
            <select
              className="form-control m-2"
              style={{ width: "90%" }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value={currentUser.gender}>{currentUser.gender}</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* <span className="bg-danger">{error}</span> */}

          {updateStatus === "loading" ? (
            <LoadingButton
              loading
              loadingIndicator="updating.."
              variant="contained"
              sx={{ m: 2 }}
            >
              updating..
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!change}
              onClick={handleUpdate}
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <h3 className="mt-5">Current User</h3>
      <hr />
      <span>
        Name: <i>{currentUser.full_name}</i>
      </span>
      <hr />
      <span>
        Email: <i>{currentUser.email}</i>
      </span>
      <hr />
      <span>
        Mobile: <i>{currentUser.mobile}</i>
      </span>
      <hr />
      <span>
        Gender: <i>{currentUser.gender}</i>
      </span>

      <hr />
    </div>
  );
}

export default LeftBar;
