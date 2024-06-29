import React, { useState, useEffect } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { getUserDetails } from "../../serviceApis/loginapi";
import "./user-details.scss";
import DoughnutChart from "../doughtnut-chart";

const ShowAdminItemsActivities = ({ id, key, name }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserDetails();
      setUsers(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Error fetching user details. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Container className="user-details">
      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="error-message">
          {error}
        </Alert>
      ) : users.result && users.result.length === 0 ? (
        <div className="no-records-found">No user details found</div>
      ) : (
        <div className="circle-cards">
          <DoughnutChart
            number={10}
            maxNumber={100}
            title={name ? `Farm Items of ${name}` : "Farm Items"}
          />
          <DoughnutChart
            number={80}
            maxNumber={100}
            title={name ? `Farm Activities of ${name}` : "Farm Activities"}
          />
        </div>
      )}
    </Container>
  );
};

export default ShowAdminItemsActivities;
