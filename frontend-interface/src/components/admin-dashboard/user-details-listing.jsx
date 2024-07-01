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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return `${dateString.substr(8, 2)}/${dateString.substr(
      5,
      2
    )}/${dateString.substr(0, 4)}`;
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
                <div className="user-detail">
                  <span className="label">User Name:</span>
                  <span className="value">{user?.userName?.trim() || "-"}</span>
                </div>

                <div className="user-detail">
                  <span className="label">Email:</span>
                  <span className="value">{user.email || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Date of Birth:</span>
                  <span className="value">
                    {formatDate(user.dateOfBirth) || "-"}
                  </span>
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
                  <span className="value">{user.pinCode || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Phone Number:</span>
                  <span className="value">{user.phoneNumber || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Farm Items:</span>
                  <span className="value">{user.FarmItems || "-"}</span>
                </div>
                <div className="user-detail">
                  <span className="label">Farm Item Activities:</span>
                  <span className="value">
                    {user.FarmItemActivities || "-"}
                  </span>
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
