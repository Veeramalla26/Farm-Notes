import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent, Typography, Box } from "@mui/material";

const DoughnutChart = ({ number, maxNumber, title }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    // Destroy previous chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const percentage = (number / maxNumber) * 100;

    chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Filled"],
        datasets: [
          {
            data: [percentage, 100 - percentage],
            backgroundColor: ["#4CAF50", "#E5E5E5"], // Green color for filled part and light gray for remaining
            hoverBackgroundColor: ["#4CAF50", "#E5E5E5"], // Hover color for filled part
          },
        ],
      },
      options: {
        cutout: "80%", // Adjust this value to change the size of the doughnut hole
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [number, maxNumber]); // Ensure chart updates when 'number' or 'maxNumber' props change

  return (
    <Card sx={{ maxWidth: 1000, width: 400, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: "#4CAF50", marginBottom: 2 }}>
          {title}
        </Typography>
        <Box sx={{ position: "relative", textAlign: "center" }}>
          <canvas ref={chartRef} />
          <Typography
            variant="h4"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {number}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
