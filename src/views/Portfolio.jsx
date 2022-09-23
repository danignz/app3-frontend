import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import teamleadicon from "../images/teamleadicon.png";
import collaboratoricon from "../images/collaboratoricon.png";

export default function Portfolio() {
  const [projectsTL, setProjectsTL] = useState([]);
  const [projectsColaborator, setProjectsColaborator] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const [user, setUser] = useState({ profession: "" });
  const [enumValues, setEnumValues] = useState({ profession: [] });
  const { id } = useParams();
  document.title = `Iron Co-Workers | Portfolio`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/enum-values`
        );
        setEnumValues(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const myProjectsTL = response.data.data.filter(
          (project) => project.leader._id === id && project.status === "Closed"
        );
        setProjectsTL(myProjectsTL);

        const indexCollaborator = enumValues.profession.indexOf(
          user.profession
        );
        const myProjectsColaborator = response.data.data.filter(
          (project) =>
            //first render enumValues is empty amb indexOf return -1, skip first render
            indexCollaborator !== -1 &&
            project.collaborators[indexCollaborator].users.some(
              (user) => user._id === id
            ) &&
            project.status === "Closed"
        );
        setProjectsColaborator(myProjectsColaborator);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [id, enumValues, user]);

  return (
    <div className="backgroundcolor">
      <Navbar />
      <div id="portfolio-view">
        <div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <h2>Projects as a collaborator</h2>
            <img
              style={{ display: "inline", height: 55, width: 55 }}
              src={collaboratoricon}
              alt="Team collaboration icon"
            />
          </div>

          {projectsColaborator.length === 0 && (
            <p style={{ color: "black", fontSize: 20, paddingTop: 25 }}> ⚠️ There is not projects closed as a collaborator.
            </p>
          )}
          {projectsColaborator.length !== 0 &&
            projectsColaborator.map((project) => {
              return <ProjectCard key={project._id} projectData={project} />;
            })}
        </div>
        <div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <h2>Projects as a Team Lead</h2>

            <img
              style={{ display: "inline", height: 55, width: 55 }}
              src={teamleadicon}
              alt="Team Lead icon"
            />
          </div>

          {projectsTL.length === 0 && (
            <p style={{ color: "black", fontSize: 20, paddingTop: 25 }}> ⚠️ There is not projects closed as a team lead.
            </p>
          )}
          {projectsTL.length !== 0 &&
            projectsTL.map((project) => {
              return <ProjectCard key={project._id} projectData={project} />;
            })}
        </div>
      </div>
    </div>
  );
}
