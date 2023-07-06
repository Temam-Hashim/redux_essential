import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../../redux/action/UserAction";
import { LoadingButton } from "@mui/lab";

function RightBar() {
  const dispatch = useDispatch();
  let { users, deleteStatus, currentUser, getStatus } = useSelector(
    (state) => state.user
  );

  const currentUserId = currentUser && currentUser.id;
  users = users.filter((user) => user.id !== currentUserId);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div
      style={{
        borderLeft: "1px solid gray",
        backgroundColor: "#eee",
        marginTop: "10px",
      }}
    >
      <h3 className="mt-5">Lists of Users</h3>
      {deleteStatus !== null && deleteStatus !== "loading" && (
        <div className="text-danger">{deleteStatus}</div>
      )}
      <hr />
      {users.map((user) => (
        <div key={user.id}>
          <span>
            <b>Name: </b> {user.full_name}
          </span>
          <br />
          <span>
            <b>Email:</b> {user.email}
          </span>
          <br />
          <span>
            <b>Mobile:</b> {user.mobile}
          </span>
          <br />
          <span>
            <b>Gender:</b> {user.gender}
          </span>
          <br />
          <button
            type="button"
            onClick={() => handleDelete(user.id)}
            className="btn btn-sm btn-danger btn-right"
            style={{ margin: "10px" }}
          >
            {deleteStatus === "loading" ? (
              <LoadingButton loading variant="outlined" sx={{ m: 2 }}>
                Delete
              </LoadingButton>
            ) : (
              "Delete"
            )}
          </button>
          <hr />
        </div>
      ))}
      {users.length === 0 && (
        <span className="text-info m-2">No User found</span>
      )}
      {getStatus === "loading" && (
        <span className="text-info m-2">Fetching Users</span>
      )}
    </div>
  );
}

export default RightBar;
