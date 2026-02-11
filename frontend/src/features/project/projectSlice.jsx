import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, addProject, editProject, removeProject } from "./projectThunk";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProjects.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchProjects.fulfilled, (state, action) => { 
        state.loading = false; 
        state.projects = action.payload; 
      })
      .addCase(fetchProjects.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })
      // add
      .addCase(addProject.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(addProject.fulfilled, (state, action) => { 
        state.loading = false; 
        state.projects.push(action.payload); 
      })
      .addCase(addProject.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })
      // edit
      .addCase(editProject.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(editProject.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })
      // delete - FIXED: Use the ID returned from thunk (not the object)
      .addCase(removeProject.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.loading = false;
        // Action.payload should be the ID string from the thunk
        state.projects = state.projects.filter(p => p._id !== action.payload);
      })
      .addCase(removeProject.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      });
  },
});

export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;