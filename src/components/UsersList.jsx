import React, { useEffect} from "react";
import { useSelector } from "react-redux";
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

  if (isLoadingUsers) return <Skeleton times={6} className="h-10 w-full" />;
  if (loadingUsersError) return <div>Error fetching data</div>;

  const renderedUsers = data.map((user) => (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m2 text-xl">Users</h1>
        {isCreatingUser ? (
          "Creating user..."
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUserError ? creatingUserError : null}
      </div>
      {renderedUsers}
    </div>
  );
}
