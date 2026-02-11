import API from "./api";

export const getProjects = async () => {
  const res = await API.get("/projects");
  return res.data;
};

export const createProject = async (formData) => {
  const res = await API.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await API.put(`/projects/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


export const deleteProject = async (id) => {
  const res = await API.delete(`/projects/${id}`);
  return res.data;
};
