import React from "react";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/useThunk";
function UserListItem({ user }) {
  const [doRemoveUser, isDeletingUser, deleteError] = useThunk(removeUser);

  const handleDelete = () => {
    doRemoveUser(user);
  };
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row justify-between items-center">
          <Button loading={isDeletingUser} onClick={handleDelete} className="mr-3">
            <GoTrashcan />{" "}
          </Button>
          {deleteError ? <div>Error deleting user</div> : null}
          {user.name}
        </div>
      </div>
    </div>
  );
}

export default UserListItem;
