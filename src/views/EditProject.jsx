import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const [enumValues, setEnumValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const date = new Date();
  const [webDevelopers, setWebDevelopers] = useState({ quantity: 0 });
  const [uxuiDesigners, setUxUiDesigners] = useState({ quantity: 0 });
  const [dataAnalysts, setDataAnalysts] = useState({ quantity: 0 });
  const [cyberAnalysts, setCyberAnalysts] = useState({ quantity: 0 });
  const [project, setProject] = useState({
    name: "",
    projectImage: "",
    startDate: "",
    endDate: "",
    description: "",
    projectUrl: "",
    onCampus: "",
  });
  document.title = `Iron Co-Workers | Edit Project`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/${id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setProject(response.data.data);
        setWebDevelopers(response.data.data.collaborators[0]);
        setUxUiDesigners(response.data.data.collaborators[1]);
        setDataAnalysts(response.data.data.collaborators[2]);
        setCyberAnalysts(response.data.data.collaborators[3]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/projects/${id}`,
        {
          collaborators: [
            webDevelopers,
            uxuiDesigners,
            dataAnalysts,
            cyberAnalysts,
          ],
          name: project.name,
          projectImage: project.projectImage,
          startDate: project.startDate,
          endDate: project.endDate,
          description: project.description,
          projectUrl: project.projectUrl,
          onCampus: project.onCampus,
          status: project.status,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      toast.success("Project edited successfully.", {
        duration: 2800,
      });
      navigate(`/project/${response.data.data._id}`);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="backgroundcolor">
      <Navbar />
      <div id="edit-project-view">
        <div>
          <h2>Edit project</h2>
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
                  value={
                    !project.startDate ? "" : project.startDate.slice(0, 10)
                  }
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
                  value={!project.endDate ? "" : project.endDate.slice(0, 10)}
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

            <button className="btn-common" type="submit">
              Save changes
            </button>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
