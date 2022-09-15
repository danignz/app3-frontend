import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateRequest() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/requests/${id}`,
          {},
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setRequest(response.data.data);
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      {request && (
        <div>
          <h2>Your request have been successfully sended</h2>
          <h3>{`Id new request ${request._id}`}</h3>
          <button
            className="btn-style3"
            onClick={() => navigate(`/requests/${request._id}`)}
          >
            VIEW MY REQUEST
          </button>
        </div>
      )}

      {!request && (
        <div>
          <h2>There was a problem doing the request:</h2>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button className="btn-style3" onClick={() => navigate(`/`)}>
            BACK HOME
          </button>
        </div>
      )}
    </div>
  );
}
