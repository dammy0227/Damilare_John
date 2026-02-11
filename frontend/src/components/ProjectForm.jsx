import React, { useState } from "react";
import Button from "./Button";

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [techStack, setTechStack] = useState(initialData.techStack?.join(", ") || "");
  const [githubLink, setGithubLink] = useState(initialData.githubLink || "");
  const [liveLink, setLiveLink] = useState(initialData.liveLink || "");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("techStack", JSON.stringify(techStack.split(",").map(t => t.trim())));
    formData.append("githubLink", githubLink);
    formData.append("liveLink", liveLink);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white dark:bg-black p-4 rounded shadow-md">
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
        required
      />
      <input
        type="text"
        placeholder="Tech Stack (comma separated)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
      />
      <input
        type="text"
        placeholder="GitHub Link"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
      />
      <input
        type="text"
        placeholder="Live Link"
        value={liveLink}
        onChange={(e) => setLiveLink(e.target.value)}
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="text-sm text-gray-500 dark:text-gray-400"
      />
      <Button type="submit">{initialData.title ? "Update Project" : "Add Project"}</Button>
    </form>
  );
};

export default ProjectForm;
