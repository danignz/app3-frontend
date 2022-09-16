import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProjectDetailsCard from "../components/ProjectDetailsCard";
import Navbar from "../components/Navbar";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const storedToken = localStorage.getItem("authToken");

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
    <div>
      <Navbar />
      <div id="project-details">
        <h2>Project details</h2>
        {project && <ProjectDetailsCard projectData={project} />}
        {!project && <p>Project not found</p>}
      </div>
    </div>
  );
}
