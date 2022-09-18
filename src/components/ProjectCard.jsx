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
      {/* <p>{projectData.description}</p> */}
      {projectData.description.split('\n').map(sentence => <p>{sentence}</p>)}
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
