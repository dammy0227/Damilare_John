import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    techStack: [String],
    imageUrl: String,
    videoUrl: String,
    githubLink: String,
    liveLink: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
