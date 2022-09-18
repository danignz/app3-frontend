import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const myProjects = response.data.data.filter(
          (project) => project.leader._id === user._id
        );
        setProjects(myProjects);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <div id="manage-projects-view">
        <h2>Become a Team Lead!</h2>
        <p>Lead a team and improve your skills creating amazing projects</p>
        <button onClick={() => navigate(`/create-project`)}>Create</button>
        <hr />
        <h2>Manage your projects</h2>
        <p>
          By checking the <strong>details</strong> of a given project you can:
        </p>
        <ol>
          <li>
            <strong>Close</strong> it and will be published for all team members
            portfolio!
          </li>
          <li>
            <strong>Editing</strong> some aspects of the project
          </li>
          <li>
            <strong>Delete</strong> the project
          </li>
        </ol>
        {projects.length === 0 && <p>You have not created any project.</p>}
        {projects.length !== 0 &&
          projects.map((project) => {
            return <ProjectCard key={project._id} projectData={project} />;
          })}
      </div>
    </div>
  );
}
