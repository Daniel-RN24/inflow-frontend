import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getCssColor, interpolateHex, radialGradient } from "./themeColors";
ChartJS.register(ArcElement, Tooltip, Legend);

const INICIO = "#3b82f6";
const FIN = "#22d3ee";

const getThemeColors = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const t = count <= 1 ? 0 : i / (count - 1);
    return interpolateHex(INICIO, FIN, t);
  });
};

const DoughnutChart = ({ labels, datasets }) => {
  const colors = getThemeColors(labels.length);
  const colorTexto = getCssColor("--foreground", "#161c27");
  const colorMuted = getCssColor("--muted-foreground", "#555b66");

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: colors.map((color) => radialGradient(color)),
      borderWidth: 2,
      borderColor: getCssColor("--card", "#ffffff"),
      hoverOffset: 8,
      hoverBorderWidth: 0,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: colorMuted,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 14,
        },
      },
      tooltip: {
        backgroundColor: colorTexto,
        titleColor: "#ffffff",
        bodyColor: "rgba(255,255,255,0.85)",
        padding: 12,
        cornerRadius: 10,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;