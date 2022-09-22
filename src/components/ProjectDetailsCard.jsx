import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import teamicon from "../images/teamicon.png";

export default function ProjectDetailsCard({ projectData }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errorMessage2, setErrorMessage2] = useState(undefined);

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("Project deleted successfully", { duration: 2800 });
      navigate("/manage-projects");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const handleCloseProject = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/projects/${id}`,
        {
          status: "Closed",
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      toast.success("Action execute successfully", { duration: 2800 });
      window.location.reload();
    } catch (error) {
      setErrorMessage2(error.response.data.error);
    }
  };

  return (
    <div id="project-details-card">
      <div>
        <div id="project-info">
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
          <p>
            <strong>Website: </strong>
            <Link to={`/${projectData.projectUrl}`}>
              {projectData.projectUrl}
            </Link>
          </p>
          <p>
            <strong>Status </strong>
            {projectData.status}
          </p>
        </div>
        <div id="project-image-container">
          <img
            height={250}
            width={450}
            src={projectData.projectImage}
            alt={`Pic of ${projectData.name}`}
          />
        </div>
      </div>
      <div id="card-project-data">
        {projectData.description.split("\n").map((sentence, index) => (
          <p key={index}>{sentence}</p>
        ))}
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            style={{ display: "inline", height: 35 }}
            src={teamicon}
            alt="Team icon"
          />
          <p>
            {" "}
            <strong>Team members:</strong>{" "}
          </p>
        </div>
        {projectData.collaborators.length === 0 && <p>Not recruiting</p>}
        {projectData.collaborators &&
          projectData.collaborators.map((collaboratorGroup, index) => {
            return (
              <div key={index}>
                <p>
                  - {collaboratorGroup.rol} {collaboratorGroup.users.length}/
                  {collaboratorGroup.quantity}
                  {collaboratorGroup.users.map((member, index, array) => {
                    return (
                      <Link key={index} to={`/user/${member._id}`}>
                        {index === 0 ? " [" + member.fullName : member.fullName}
                        {index === array.length - 1 && "]"}
                        {index < collaboratorGroup.users.length - 1 && (
                          <span>, </span>
                        )}
                      </Link>
                    );
                  })}
                  {collaboratorGroup.rol === user.profession &&
                    collaboratorGroup.quantity -
                      collaboratorGroup.users.length !==
                      0 &&
                    projectData.leader._id !== user._id && (
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {String.fromCharCode(8592)}You can enrole !!!
                      </span>
                    )}
                </p>
              </div>
            );
          })}

        {projectData.status !== "Closed" &&
          projectData.leader._id !== user._id && (
            <button
              id="join-btn"
              className="btn-common"
              onClick={() => navigate(`/create-request/${projectData._id}`)}
            >
              JOIN
            </button>
          )}

        {projectData.leader._id === user._id && (
          <div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {errorMessage2 && <p style={{ color: "red" }}>{errorMessage2}</p>}
            {projectData.status === "Open" && (
              <button
                id="closed-btn"
                className="btn-common"
                onClick={() => handleCloseProject(projectData._id)}
              >
                Close
              </button>
            )}
            <button
              id="edit-btn"
              className="btn-common"
              onClick={() => navigate(`/edit-project/${projectData._id}`)}
            >
              Edit
            </button>
            <button
              id="delete-btn"
              className="btn-common"
              onClick={() => handleDeleteProject(projectData._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
