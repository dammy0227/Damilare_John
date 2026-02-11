import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-4 rounded shadow-md flex flex-col">
      <img
        src={project.imageUrl || project.videoUrl}
        alt={project.title}
        className="rounded mb-3 object-cover h-48 w-full"
      />
      <h2 className="text-xl font-bold">{project.title}</h2>
      <p className="mt-2 text-sm">{project.description}</p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="bg-primary text-white px-2 py-1 rounded text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-3">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-primary dark:text-white underline"
          >
            GitHub
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="text-primary dark:text-white underline"
          >
            Live
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
