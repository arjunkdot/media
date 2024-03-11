import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UserListItem from "./UserListItem";
import { useThunk } from "../hooks/useThunk";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUsers, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUsers();
  };

  let content;
  if (isLoadingUsers) content = <Skeleton times={6} className="h-10 w-full" />;
  else if (loadingUsersError) content = <div>Error fetching data</div>;
  else {
    content = data.map((user) => (
      <UserListItem key={user.id} user={user} />
    ));
  }

  return (
    <div>
      <div className="flex flex-row justify-between my-3">
        <h1 className="m2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError ? creatingUserError : null}
      </div>
      {content}
    </div>
  );
}
