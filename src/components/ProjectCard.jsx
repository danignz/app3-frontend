import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ projectData }) {
  return (
    <div>
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
      <p>{projectData.description.substr(0, 200) + "..."}</p>
      <p>Start: {new Date(projectData["startDate"]).toDateString()}</p>
      <Link to={`/project/${projectData._id}`}>DETAIL</Link>
    </div>
  );
}
