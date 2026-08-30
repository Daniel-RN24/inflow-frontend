import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getCssColor, verticalGradient } from "./themeColors";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarComparativa = ({ labels, ingresos, egresos }) => {
  const colorIngreso = getCssColor("--chart-2", "#0d9668");
  const colorEgreso = getCssColor("--chart-4", "#c2410c");
  const colorTexto = getCssColor("--foreground", "#161c27");
  const colorMuted = getCssColor("--muted-foreground", "#555b66");

  const data = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: ingresos,
        backgroundColor: verticalGradient(colorIngreso, 1, 0.3),
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.45,
        categoryPercentage: 0.55,
      },
      {
        label: "Egresos",
        data: egresos,
        backgroundColor: verticalGradient(colorEgreso, 1, 0.3),
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.45,
        categoryPercentage: 0.55,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: colorTexto,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: colorTexto,
        titleColor: "#ffffff",
        bodyColor: "rgba(255,255,255,0.85)",
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: $${ctx.raw.toLocaleString("es-CO")}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: colorMuted,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: colorMuted,
          callback: (value) => `$${value.toLocaleString("es-CO")}`,
        },
        grid: {
          color: "rgba(128,128,128,0.12)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarComparativa;