import React, { useState, useEffect } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import "./show-admin-items-activities.scss";
import { getTotalCountDetails } from "../../serviceApis/loginapi";
import DoughnutChart from "../doughtnut-chart";

const ShowAdminItemsActivities = ({ id, name }) => {
  const [items, setItems] = useState({ response: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTotalCountDetails({ categoryId: id });
      setItems(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Error fetching user details. Please try again later.");
      setLoading(false);
    }
  };

  const calculateDoughnutChartWidth = () => {
    return name ? `${name.length * 10}px` : "200px";
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
      {loading && items.response.length === 0 ? (
        <div className="loading-spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="content-wrapper">
          {items?.response?.length > 0 && (
            <div className="circle-cards">
              <div className="chart-wrapper">
                <DoughnutChart
                  number={items?.totalFarmItems || 0}
                  maxNumber={100}
                  title={name ? `Farm Items of ${name}` : "Farm Items"}
                  style={{ width: calculateDoughnutChartWidth() }}
                />
              </div>
              <div className="chart-wrapper">
                <DoughnutChart
                  number={items?.totalfarmItemActivities || 0}
                  maxNumber={100}
                  title={
                    name ? `Farm Activities of ${name}` : "Farm Activities"
                  }
                  style={{ width: calculateDoughnutChartWidth() }}
                />
              </div>
            </div>
          )}
          <div className="table-container">
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            {items?.response?.length === 0 && !error && (
              <div className="no-records-found">
                <p>No records found</p>
              </div>
            )}
            {items?.response?.length > 0 && (
              <div className="table-over">
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="custom-table"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Category</th>
                      <th>Species</th>
                      <th>Date Of Birth</th>
                      <th>Health Status</th>
                      <th>Feeding Schedule</th>
                      <th>Total Cost</th>
                      <th>Item Activities Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.response?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.itemCode}</td>
                        <td>{item.Category?.name}</td>
                        <td>{item.species || "-"}</td>
                        <td>
                          {item.dateOfBirth
                            ? formatDate(item.dateOfBirth)
                            : "-"}
                        </td>
                        <td>{item.healthStatus || "-"}</td>
                        <td>{item.feedingSchedule || "-"}</td>
                        <td>{item.amount || "-"}</td>
                        <td>{item.farmItemActivitiesCount || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShowAdminItemsActivities;
