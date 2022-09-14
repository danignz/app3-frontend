import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsRecruiting() {
  const [projects, setProjects] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const filtered = response.data.data.filter(
          (elem) => elem.status === "Open"
        );
        setProjects(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!projects && <p>Loading</p>}
      {projects &&
        projects.map((project) => {
          return <ProjectCard key={project._id} projectData={project} />;
        })}
      <Outlet />
    </div>
  );
}
