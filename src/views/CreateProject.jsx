import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function CreateProject() {
  const [project, setProject] = useState({
    leader: null,
    name: "",
    projectImage: "",
    startDate: "",
    endDate: "",
    description: "",
    projectUrl: "",
    onCampus: "No",
    status: "Open",
  });

  const [webDevelopers, setWebDevelopers] = useState({
    rol: "Web Developer",
    quantity: 0,
    users: [],
  });

  const [uxuiDesigners, setUxUiDesigners] = useState({
    rol: "UX/UI Designer",
    quantity: 0,
    users: [],
  });

  const [dataAnalysts, setDataAnalysts] = useState({
    rol: "Data Analyst",
    quantity: 0,
    users: [],
  });

  const [cyberAnalysts, setCyberAnalysts] = useState({
    rol: "Cybersecurity Analyst",
    quantity: 0,
    users: [],
  });

  const { user } = useContext(AuthContext);
  const [enumValues, setEnumValues] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const date = new Date();
  document.title = `Iron Co-Workers | New Project`;

  const handleChange = (e) => {
    setProject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeWebDevelopers = (e) => {
    const parsed = parseInt(e.target.value);
    setWebDevelopers((prev) => {
      return {
        ...prev,
        [e.target.name]: parsed,
      };
    });
  };

  const handleUxUiDesigners = (e) => {
    const parsed = parseInt(e.target.value);
    setUxUiDesigners((prev) => {
      return {
        ...prev,
        [e.target.name]: parsed,
      };
    });
  };

  const handleDataAnalysts = (e) => {
    const parsed = parseInt(e.target.value);
    setDataAnalysts((prev) => {
      return {
        ...prev,
        [e.target.name]: parsed,
      };
    });
  };

  const handleCyberAnalysts = (e) => {
    const parsed = parseInt(e.target.value);
    setCyberAnalysts((prev) => {
      return {
        ...prev,
        [e.target.name]: parsed,
      };
    });
  };

  const handleFileUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("projectImage", e.target.files[0]);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects/project-image-upload`,
        uploadData,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setProject((prev) => {
        return {
          ...prev,
          projectImage: response.data.fileUrl,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects`,
        {
          collaborators: [
            webDevelopers,
            uxuiDesigners,
            dataAnalysts,
            cyberAnalysts,
          ],
          leader: user._id,
          name: project.name,
          projectImage: project.projectImage,
          startDate: project.startDate,
          endDate: project.endDate,
          description: project.description,
          projectUrl: project.projectUrl,
          onCampus: project.onCampus,
          status: project.status,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      toast.success("Project created successfully", { duration: 2800 });
      navigate(`/project/${response.data.data._id}`);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="backgroundcolor">
      <Navbar />
      <div id="create-project-view">
        <div>
          <h2>Create a project</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              required
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              placeholder="e.g.: Food delivery App"
            />
            <div>
              <div>
                <label>Start date</label>
                <input
                  required
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  min={date.toJSON().slice(0, 10)}
                  max="2025-12-31"
                />
              </div>
              <div>
                <label>End date</label>
                <input
                  required
                  type="date"
                  name="endDate"
                  value={project.endDate}
                  onChange={handleChange}
                  min={date.toJSON().slice(0, 10)}
                  max="2025-12-31"
                />
              </div>
            </div>
            <label>Project picture</label>
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            <label>Project website</label>
            <input
              type="text"
              name="projectUrl"
              value={project.projectUrl}
              onChange={handleChange}
              placeholder="e.g.: http://deliveryfoodapp.net"
            />
            <label>Require on campus?</label>
            <select
              value={project.onCampus}
              name="onCampus"
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Description</label>
            <textarea
              required
              rows="4"
              cols="50"
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="e.g.: This project was born with the idea of developing a social network application for users who..."
            ></textarea>

            <label>- How many collaborators by rol?</label>
            <div className="collaborators-number">
              <div>
                <p>{enumValues && enumValues.profession[0]}</p>
                <input
                  type="number"
                  name="quantity"
                  value={webDevelopers.quantity}
                  min="0"
                  max="3"
                  onChange={handleChangeWebDevelopers}
                ></input>

                <p>{enumValues && enumValues.profession[1]}</p>
                <input
                  type="number"
                  name="quantity"
                  value={uxuiDesigners.quantity}
                  min="0"
                  max="3"
                  onChange={handleUxUiDesigners}
                ></input>
              </div>
              <div>
                <p>{enumValues && enumValues.profession[2]}</p>
                <input
                  type="number"
                  name="quantity"
                  value={dataAnalysts.quantity}
                  min="0"
                  max="3"
                  onChange={handleDataAnalysts}
                ></input>

                <p>{enumValues && enumValues.profession[3]}</p>
                <input
                  type="number"
                  name="quantity"
                  value={cyberAnalysts.quantity}
                  min="0"
                  max="3"
                  onChange={handleCyberAnalysts}
                ></input>
              </div>
            </div>
            <button className="btn-common" type="submit">
              Create
            </button>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
