import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProjectCard({ projectData }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div id="project-card">
      <div>
        <div id="info-project">
          <h2>{projectData.name}</h2>
          <br />
          {projectData.leader._id !== user._id ? (
            <p>
              <strong>Leader: </strong>
              <Link to={`/user/${projectData.leader._id}`}>
                {projectData.leader.fullName}
              </Link>{" "}
              [{projectData.leader.profession}]
            </p>
          ) : (
            <p style={{ color: "green", fontWeight: "bold" }}>
              {" "}
              You are the leader
            </p>
          )}

          <p>
            <strong>Start: </strong>
            {new Date(projectData["startDate"]).toDateString()}
          </p>
          <p>
            <strong>End: </strong>
            {new Date(projectData["endDate"]).toDateString()}
          </p>

          <p>
            <strong>On campus? </strong>
            {projectData.onCampus}
          </p>
        </div>
        <div id="container-project-image">
          <img
            height={200}
            width={400}
            src={projectData.projectImage}
            alt={`Pic of ${projectData.name}`}
          />
        </div>
      </div>
      <div>
        <p style={{ textAlign: "justify" }}>
          {" "}
          {projectData.description.substr(0, 250) + "..."}
        </p>

        <button
          id="detail-btn"
          className="btn-common"
          onClick={() => navigate(`/project/${projectData._id}`)}
        >
          Detail
        </button>
      </div>
    </div>
  );
}
