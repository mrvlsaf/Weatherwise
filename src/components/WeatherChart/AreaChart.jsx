import React from "react";
import Chart from "react-apexcharts";

const AreaChart = ({ sunrise, sunset }) => {
  return (
    <div className="container-fluid mb-3 mt-3">
      <Chart
        type="area"
        height={200}
        series={[
          {
            name: "Time",
            data: [10, 50, 10],
          },
        ]}
        options={{
          colors: ["#F7CD5D"],
          dataLabels: {
            enabled: false,
          },
          stroke: { width: 0, curve: "smooth" },
          xaxis: {
            categories: [sunrise, "2:00 PM", sunset],
          },
          yaxis: {
            show: false,
          },
        }}
      />
    </div>
  );
};

export default AreaChart;
