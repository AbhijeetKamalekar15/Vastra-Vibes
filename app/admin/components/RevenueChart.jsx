"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueChart({ items }) {
  console.log("RevenueChart items:", items); // DEBUG

  const data = {
    labels: items?.map((item) => item?.date) ?? [],
    datasets: [
      {
        label: "Revenue",
        data:
          items?.map((item) =>
            typeof item?.data?.totalRevenue === "number"
              ? item.data.totalRevenue / 100
              : 0
          ) ?? [],
        backgroundColor: "#879fff20",
        borderColor: "#879fff80",
        fill: true, // fill under the line
        tension: 0.3, // smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Line Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section
      style={{ minHeight: "450px" }}
      className="bg-white p-5 rounded-xl shadow w-full"
    >
      <Line data={data} options={options} />
    </section>
  );
}
