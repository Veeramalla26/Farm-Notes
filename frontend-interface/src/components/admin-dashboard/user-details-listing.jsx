import React, { useState, useEffect } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { getUserDetails } from "../../serviceApis/loginapi";
import "./user-details.scss";

const UserDetails = () => {
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
      <h2 className="header">
        User Details {users.result && `(${users.result.length})`}
      </h2>
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
        <div className="card-container">
          {users?.result?.map((user) => (
            <Card className="user-card" key={user.id}>
              <Card.Body>
                <Card.Title className="card-title">
                  {user?.name?.trim()}
                </Card.Title>
                <div className="user-detail">
                  <span className="label">Role:</span>
                  <span className="value">{user.role || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Email:</span>
                  <span className="value">{user.email || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Date of Birth:</span>
                  <span className="value">{user.dob || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Country:</span>
                  <span className="value">{user.country || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Address:</span>
                  <span className="value">{user.address || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Zip Code:</span>
                  <span className="value">{user.pincode || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Phone Number:</span>
                  <span className="value">{user.phoneNumber || "-"}</span>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default UserDetails;
