import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const createProject = async (req, res) => {
  const { title, description, techStack, githubLink, liveLink } = req.body;

  // Ensure techStack is an array
  const techArray = Array.isArray(techStack) 
    ? techStack 
    : JSON.parse(techStack || '[]');

  let imageUrl = "";
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url;
  }

  const project = await Project.create({
    title,
    description,
    techStack: techArray,
    githubLink,
    liveLink,
    imageUrl,
  });

  res.json(project);
};

export const updateProject = async (req, res) => {
  const { title, description, techStack, githubLink, liveLink } = req.body;

  // Parse techStack JSON string
  let techArray = [];
  if (techStack) {
    try {
      techArray = JSON.parse(techStack);
    } catch {
      techArray = [];
    }
  }

  const updatedData = {
    title,
    description,
    techStack: techArray,
    githubLink,
    liveLink,
  };

  // Handle image upload if provided
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    updatedData.imageUrl = result.secure_url;
  }

  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  res.json(updated);
};


export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
