import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProjectDetailsCard({ projectData }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errorMessage2, setErrorMessage2] = useState(undefined);

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/projects/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("Project deleted successfully", {duration: 2800});
      window.location.reload();
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
      toast.success("Action execute successfully", {duration: 2800});
      window.location.reload();
    } catch (error) {
      setErrorMessage2(error.response.data.error);
    }
  };

  return (
    <div id="project-details-card">
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
      <p>On campus? {projectData.onCampus === true ? "Yes" : "No"}</p>
      <p>Project url? {projectData.projectUrl}</p>
      <p>Status {projectData.status}</p>
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
                  0 &&
                projectData.leader._id !== user._id && (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {" "}
                    You can enrole!
                  </span>
                )}
            </p>
          );
        })}

      {projectData.status !== "Closed" &&
        projectData.leader._id !== user._id && (
          <button
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
            <button onClick={() => handleCloseProject(projectData._id)}>
              Close
            </button>
          )}
          <button onClick={() => navigate(`/edit-project/${projectData._id}`)}>
            Edit
          </button>
          <button onClick={() => handleDeleteProject(projectData._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
