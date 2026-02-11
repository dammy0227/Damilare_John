import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects, createProject, updateProject, deleteProject } from "../../services/project";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProjects();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/add",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await createProject(formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const editProject = createAsyncThunk(
  "projects/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProject(id, data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProject(id);      
      return id;                    
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
