import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProjectDetailsCard from "../components/ProjectDetailsCard";
import Navbar from "../components/Navbar";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  document.title = `Iron Co-Workers | Project Details`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/${id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        setProject(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="backgroundcolor">
      <Navbar />
      <div id="project-details-view">
        {project && <ProjectDetailsCard projectData={project} />}
        {!project && <p>Project not found</p>}
      </div>
    </div>
  );
}
