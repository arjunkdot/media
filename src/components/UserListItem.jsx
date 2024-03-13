import React from "react";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/useThunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
function UserListItem({ user }) {
  const [doRemoveUser, isDeletingUser, deleteError] = useThunk(removeUser);

  const handleDelete = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button loading={isDeletingUser} onClick={handleDelete} className="mr-3">
        <GoTrashcan />{" "}
      </Button>
      {deleteError ? <div>Error deleting user</div> : null}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UserListItem;
