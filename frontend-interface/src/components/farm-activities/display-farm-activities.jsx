import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./display-farm-activities.scss";
import { postAddFarmActivity } from "../../serviceApis/loginapi";
import AddActivityModal from "./add-farm-activities";

const FarmActivities = () => {
  const location = useLocation();
  const { item } = location.state;
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);

  const handleAddActivityClick = () => {
    setShowAddActivityModal(true);
  };

  const handleCloseAddActivityModal = () => {
    setShowAddActivityModal(false);
  };
  const handleAddActivity = async (item) => {
    try {
      const response = await postAddFarmActivity(item);
      console.log(response);
      setShowAddActivityModal(false);
      //   fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  return (
    <div className="farm-activities">
      <div className="banner">
        <div className="item-details">
          <div className="item-detail">
            <label>Name:</label>
            <span>{item.name}</span>
          </div>
          <div className="item-detail">
            <label>Category:</label>
            <span>{item.Category?.name}</span>
          </div>
        </div>
        <div className="actions">
          <Button
            className="button-add-activity"
            onClick={handleAddActivityClick}
          >
            Add Activities
          </Button>
        </div>
      </div>

      <AddActivityModal
        show={showAddActivityModal}
        handleClose={handleCloseAddActivityModal}
        item={item}
        handleAddActivity={handleAddActivity}
      />

      {/* Additional content for farm activities */}
    </div>
  );
};

export default FarmActivities;
