import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_data: {},
  user_loggedin_id: 0,
  email: "",
  first_name: "",
  last_name: "",
  role: "",
  user_projects: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_user_id: (state, action) => {
      state.user_loggedin_id = action.payload;
    },
    set_logged_in_user: (state, action) => {
      state.user_data = action.payload;
      state.email = state.user_data[state.user_loggedin_id].email;
      //   state.user_loggedin_id = action.user_loggedin_id;
      //   state.email = action.email;
      //   state.first_name = action.first_name;
      //   state.last_name = action.last_name;
      //   state.role = action.role;
      //   state.user_projects = action.user_projects;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set_user_id, set_logged_in_user } = userSlice.actions;

export default userSlice.reducer;
