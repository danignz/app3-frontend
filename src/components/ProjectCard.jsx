import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ projectData }) {
  const navigate = useNavigate();
  return (
    <div id="project-card">
      <h2>{projectData.name}</h2>
      <h4>
        Leader: {projectData.leader.fullName} {projectData.leader.profession}
      </h4>
      <img
        height={250}
        width={450}
        src={projectData.projectImage}
        alt={`Pic of ${projectData.name}`}
      />
      {/* <p>{projectData.description.substr(0, 200) + "..."}</p> */}
      <p>{projectData.description}</p>
      <p>Start: {new Date(projectData["startDate"]).toDateString()}</p>

      <button
        className="btn-style3"
        onClick={() => navigate(`/project/${projectData._id}`)}
      >
        DETAIL
      </button>
    </div>
  );
}
