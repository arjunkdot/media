import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const removeUser = createAsyncThunk("users/remove", async (user) => {
  const response = await axios.delete(`http://localhost:3305/users/${user.id}`);
// may also return the user object
  return response.data;
});

export { removeUser };
