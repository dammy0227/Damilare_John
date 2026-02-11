import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectSlice";
import contactReducer from "../features/contact/contactSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    contact: contactReducer,
    auth: authReducer,
  },
});
