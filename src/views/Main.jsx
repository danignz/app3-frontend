import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";

export default function Main() {
  const [projects, setprojects] = useState([]);
  const [projectsFiltered, setProjectsFiltered] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getOpenProjects = () => {
    const filteredOpen = projects.filter((elem) => elem.status === "Open");
    setProjectsFiltered(filteredOpen);
  };

  const getClosedProjects = () => {
    const filteredClosed = projects.filter((elem) => elem.status === "Closed");
    setProjectsFiltered(filteredClosed);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setprojects(response.data.data);
        const filteredOpen = response.data.data.filter(
          (elem) => elem.status === "Open"
        );
        setProjectsFiltered(filteredOpen);
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
      <h3>Main</h3>
      <div id="orderBtn">
        <button onClick={getOpenProjects}>Projects Recruiting</button>
        <button onClick={getClosedProjects}>Projects Finished</button>
      </div>
      {projectsFiltered.length === 0 && (
        <p>
          Unfortunately there are no projects that match the search criteria
        </p>
      )}
      {projectsFiltered.length !== 0 &&
        projectsFiltered.map((project) => {
          return <ProjectCard key={project._id} projectData={project} />;
        })}
    </div>
  );
}
