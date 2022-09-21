import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProjectCard({ projectData }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div id="project-card">
      <h2>{projectData.name}</h2>

      {projectData.leader._id !== user._id ? (
        <h4>
          Leader: {projectData.leader.fullName} {projectData.leader.profession}
        </h4>
      ) : (
        <h4 style={{ color: "green", fontWeight: "bold" }}>
          {" "}
          You are the leader
        </h4>
      )}

      <img
        height={250}
        width={450}
        src={projectData.projectImage}
        alt={`Pic of ${projectData.name}`}
      />
      {/* <p>{projectData.description}</p> */}
      {projectData.description.split("\n").map((sentence, index) => (
        <p key={index}>{sentence}</p>
      ))}
      <p>Start: {new Date(projectData["startDate"]).toDateString()}</p>
      <p>End: {new Date(projectData["endDate"]).toDateString()}</p>

      <button onClick={() => navigate(`/project/${projectData._id}`)}>
        Detail
      </button>
    </div>
  );
}
