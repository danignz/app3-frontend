import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function ManageRequests() {
  const [myRequests, setMyRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const myForm = useRef();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errorMessage2, setErrorMessage2] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/requests`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const myRequestsFiltered = response.data.data.filter(
          (elem) => elem.user._id === user._id
        );
        setMyRequests(myRequestsFiltered);
        const myIncomingRequestFiltered = response.data.data.filter(
          (elem) =>
            elem.project.leader._id === user._id && elem.status === "Pending"
        );
        setIncomingRequests(myIncomingRequestFiltered);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    let actionChosen;

    myForm.current.buttonId === "1"
      ? (actionChosen = "Accepted")
      : (actionChosen = "Denied");

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/requests/${id}`,
        {
          status: actionChosen,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      toast.success("Action execute successfully");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const handleRequestDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/requests/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("Request deleted successfully");
      window.location.reload();
    } catch (error) {
      setErrorMessage2(error.response.data.error);
    }
  };

  return (
    <div>
      <Navbar />
      <div id="manage-colaborators-requests">
        <h2>Collaborators who want to join to your project</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {incomingRequests.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Project</th>
                <th>Profession</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incomingRequests.map((elem) => {
                return (
                  <tr key={elem._id}>
                    <td>
                      <Link to={`/user/${elem.user._id}`}>
                        <img
                          height={60}
                          src={elem.user.profileImage}
                          className="Picture"
                          alt="Pic of userr"
                        />
                        <p>{elem.user.fullName}</p>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/project/${elem.project._id}`}>
                        {elem.project.name}
                      </Link>
                    </td>
                    <td>{elem.user.profession}</td>
                    <td>{new Date(elem.createdAt).toLocaleString()}</td>
                    <td>
                      <form
                        onSubmit={(e) => handleSubmit(e, elem._id)}
                        ref={myForm}
                      >
                        <button
                          type="submit"
                          id="1"
                          onClick={(e) =>
                            (myForm.current.buttonId = e.target.id)
                          }
                          name="status"
                          value="Accepted"
                        >
                          Accept
                        </button>
                        <button
                          type="submit"
                          id="2"
                          onClick={(e) =>
                            (myForm.current.buttonId = e.target.id)
                          }
                          name="status"
                          value="Denied"
                        >
                          Reject
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {incomingRequests.length === 0 && (
          <p>You don't have incoming requests</p>
        )}
      </div>

      <div id="manage-my-requests">
        <h2>Status of your request to join a project</h2>
        {errorMessage2 && <p style={{ color: "red" }}>{errorMessage2}</p>}
        {myRequests.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>Leader</th>
                <th>Project</th>
                <th>Created</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((elem) => {
                return (
                  <tr key={elem._id}>
                    <td>
                      <Link to={`/user/${elem.project.leader._id}`}>
                        <img
                          height={60}
                          src={elem.project.leader.profileImage}
                          className="Picture"
                          alt="Pic of team leader"
                        />
                        <p>{elem.project.leader.fullName}</p>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/project/${elem.project._id}`}>
                        {elem.project.name}
                      </Link>
                    </td>
                    <td>{new Date(elem.createdAt).toLocaleString()}</td>
                    <td>
                      {elem.status === "Pending" && (
                        <p className={`status-yellow`}>{elem.status}</p>
                      )}
                      {elem.status === "Denied" && (
                        <p className={`status-red`}>{elem.status}</p>
                      )}
                      {elem.status === "Accepted" && (
                        <p className={`status-green`}>{elem.status}</p>
                      )}
                    </td>
                    {elem.status === "Pending" && (
                      <td>
                        <button onClick={() => handleRequestDelete(elem._id)}>
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {myRequests.length === 0 && <p>You don't have created any request</p>}
      </div>
    </div>
  );
}
