import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent, Typography, Box } from "@mui/material";

const DoughnutChart = ({ number, maxNumber, title }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
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
            backgroundColor: ["#4CAF50", "#E5E5E5"],
            hoverBackgroundColor: ["#4CAF50", "#E5E5E5"],
          },
        ],
      },
      options: {
        cutout: "80%",
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [number, maxNumber]);

  return (
    <Card sx={{ maxWidth: 1000, width: 200, margin: 2, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h7" sx={{ color: "#4CAF50", marginBottom: 2 }}>
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
