import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProjectDetailsCard({ projectData }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div id="project-details-card">
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
      <p>{projectData.description}</p>
      <p>Start: {new Date(projectData["startDate"]).toDateString()}</p>
      <p>End: {new Date(projectData["endDate"]).toDateString()}</p>
      <p>On campus? {projectData.onCampus === true ? "Yes" : "No"}</p>
      <p>Project url? {projectData.projectUrl}</p>
      <p>Vacancies:</p>
      {projectData.collaborators.length === 0 && <p>Not recruiting</p>}
      {projectData.collaborators &&
        projectData.collaborators.map((collaboratorGroup, index) => {
          return (
            <p key={index}>
              {collaboratorGroup.rol} {collaboratorGroup.users.length}/
              {collaboratorGroup.quantity}
              {collaboratorGroup.rol === user.profession &&
                collaboratorGroup.quantity - collaboratorGroup.users.length !==
                  0 && (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {" "}
                    You can enrole!
                  </span>
                )}
            </p>
          );
        })}

      {projectData.status !== "Closed" && (
        <button
          className="btn-style3"
          onClick={() => navigate(`/create-request/${projectData._id}`)}
        >
          JOIN
        </button>
      )}
    </div>
  );
}
