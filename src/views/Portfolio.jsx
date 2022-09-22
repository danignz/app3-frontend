import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Portfolio() {
  const [projectsTL, setProjectsTL] = useState([]);
  const [projectsColaborator, setProjectsColaborator] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const [user, setUser] = useState({ profession: "" });
  const [enumValues, setEnumValues] = useState({ profession: [] });
  const { id } = useParams();
  document.title = `Iron Co-Workers | Portfolio`

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
        <h2>Projects as a collaborator</h2>

        {projectsColaborator.length === 0 && (
          <p>There is not projects closed as a collaborator.</p>
        )}
        {projectsColaborator.length !== 0 &&
          projectsColaborator.map((project) => {
            return <ProjectCard key={project._id} projectData={project} />;
          })}

        <h2>Projects as a Team Lead</h2>

        {projectsTL.length === 0 && (
          <p>There is not projects closed as a team lead.</p>
        )}
        {projectsTL.length !== 0 &&
          projectsTL.map((project) => {
            return <ProjectCard key={project._id} projectData={project} />;
          })}
      </div>
    </div>
  );
}
