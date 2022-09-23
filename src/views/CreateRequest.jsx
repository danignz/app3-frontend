import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateRequest() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  document.title = `Iron Co-Workers | New Request`;

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
    <div className="backgroundcolor">
      <Navbar />
      <div id="create-request">
        {request && (
          <div className="result-card-container">
            <h2>Your request have been successfully sended!</h2>
            <p style={{ fontSize: 30, margin: "0 auto" }}>✅</p>
            <button
              className="btn-common view-req-btn"
              onClick={() => navigate(`/manage-requests`)}
            >
              VIEW MY REQUESTS
            </button>
          </div>
        )}

        {!request && (
          <div className="result-card-container">
            <h2>There was a problem doing the request:</h2>
            {errorMessage && (
              <p style={{ color: "red", fontSize: 20 }}>❌ {errorMessage}</p>
            )}
            <button
              className="btn-common back-btn"
              onClick={() => navigate(`/main`)}
            >
              {String.fromCharCode(8592)} Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
