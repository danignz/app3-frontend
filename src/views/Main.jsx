import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Main() {
  const [projects, setProjects] = useState([]);
  const [projectsAllOpen, setProjectsAllOpen] = useState([]);
  const [projectsAllClosed, setProjectsAllClosed] = useState([]);
  const [projectsFiltered, setProjectsFiltered] = useState([]);
  const [recruitingSelected, setRecruitingSelected] = useState(true);
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  document.title = `Iron Co-Workers | Home`;

  const getOpenProjects = () => {
    const filteredOpen = projects.filter((elem) => elem.status === "Open");
    setProjectsFiltered(filteredOpen);
    setRecruitingSelected(true);
  };

  const getClosedProjects = () => {
    const filteredClosed = projects.filter((elem) => elem.status === "Closed");
    setProjectsFiltered(filteredClosed);
    setRecruitingSelected(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setProjects(response.data.data);
        const filteredOpen = response.data.data.filter(
          (elem) => elem.status === "Open"
        );
        const filteredClosed = response.data.data.filter(
          (elem) => elem.status === "Closed"
        );
        setProjectsFiltered(filteredOpen);
        setProjectsAllOpen(filteredOpen);
        setProjectsAllClosed(filteredClosed);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      recruitingSelected
        ? setProjectsFiltered(projectsAllOpen)
        : setProjectsFiltered(projectsAllClosed);
    } else {
      const filtered = projectsFiltered.filter((elem) =>
        elem.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProjectsFiltered(filtered);
    }
  };

  const handleChangeWorkModality = (e) => {
    if (e.target.value === "ALL") {
      recruitingSelected
        ? setProjectsFiltered(projectsAllOpen)
        : setProjectsFiltered(projectsAllClosed);
    } else {
      let filtered;
      if (recruitingSelected) {
        filtered = projectsAllOpen.filter(
          (elem) => elem.onCampus === e.target.value
        );
      } else {
        filtered = projectsAllClosed.filter(
          (elem) => elem.onCampus === e.target.value
        );
      }
      setProjectsFiltered(filtered);
    }
  };

  const handleSortByName = () => {
    let ordered;
    if (recruitingSelected) {
      ordered = [...projectsAllOpen].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else {
      ordered = [...projectsAllClosed].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    setProjectsFiltered(ordered);
  };

  const handleSortByStartDate = () => {
    let ordered;
    if (recruitingSelected) {
      ordered = [...projectsAllOpen].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
    } else {
      ordered = [...projectsAllClosed].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
    }
    setProjectsFiltered(ordered);
  };

  const handleSortByEndDate = () => {
    let ordered;
    if (recruitingSelected) {
      ordered = [...projectsAllOpen].sort(
        (a, b) => new Date(a.endDate) - new Date(b.endDate)
      );
    } else {
      ordered = [...projectsAllClosed].sort(
        (a, b) => new Date(a.endDate) - new Date(b.endDate)
      );
    }
    setProjectsFiltered(ordered);
  };

  return (
    <div className="backgroundcolor">
      <Navbar />
      <div id="main-view">
        <div>
          <h2>
            Welcome,{" "}
            <span style={{ color: "dimgray" }}>
              {user.fullName.split(" ")[0]}
            </span>
          </h2>
          <aside>
            <h3>Filter projects:</h3>
            <input
              type="text"
              placeholder="🔎 by name"
              onChange={(e) => handleSearch(e)}
            />

            <h3>By work modality:</h3>
            <select name="onCampus" onChange={handleChangeWorkModality}>
              <option value="ALL">ALL</option>
              <option value="No">REMOTE</option>
              <option value="Yes">ON CAMPUS</option>
            </select>
            <h3>Sort projects:</h3>
            <button onClick={handleSortByName}>By name</button>
            <button onClick={handleSortByStartDate}>Start date</button>
            <button onClick={handleSortByEndDate}>End date</button>
          </aside>
        </div>
        <div id="main-container">
          <div>
            <button className="btn-common" onClick={getOpenProjects}>
              Projects Recruiting
            </button>
            <button className="btn-common" onClick={getClosedProjects}>
              Projects Finished
            </button>
          </div>
          {projectsFiltered.length === 0 && (
            <p>
              Unfortunately there are no projects that match the search criteria
            </p>
          )}
          <div id="list-project-container">
            {projectsFiltered.length !== 0 &&
              projectsFiltered.map((project) => {
                return <ProjectCard key={project._id} projectData={project} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
