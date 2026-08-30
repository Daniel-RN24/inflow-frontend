import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { getCssColor, verticalGradient } from "./themeColors";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
);

const FinancialChart = ({ labels, ingresos, egresos, balance }) => {
  const colorIngreso = getCssColor("--chart-2", "#0d9668");
  const colorEgreso = getCssColor("--chart-4", "#c2410c");
  const colorPrimario = getCssColor("--chart-1", "#6366f1");
  const colorTexto = getCssColor("--foreground", "#161c27");
  const colorMuted = getCssColor("--muted-foreground", "#555b66");

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Ingresos",
        data: ingresos,
        borderColor: colorIngreso,
        backgroundColor: verticalGradient(colorIngreso, 0.3, 0),
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: colorIngreso,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1.5,
      },

      {
        type: "line",
        label: "Egresos",
        data: egresos,
        borderColor: colorEgreso,
        backgroundColor: verticalGradient(colorEgreso, 0.3, 0),
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: colorEgreso,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1.5,
      },

      {
        type: "bar",
        label: "Balance",
        data: balance,
        backgroundColor: (context) => {
          const value = balance[context.dataIndex];
          return value >= 0
            ? verticalGradient(colorPrimario, 1, 0.35)(context)
            : verticalGradient(colorEgreso, 1, 0.35)(context);
        },
        borderRadius: 6,
        borderSkipped: false,
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
      },
    },
    scales: {
      x: {
        ticks: {
          color: colorMuted,
        },
        grid: {
          color: "rgba(128,128,128,0.12)",
        },
      },
      y: {
        ticks: {
          color: colorMuted,
        },
        grid: {
          color: "rgba(128,128,128,0.12)",
        },
      },
    },
  };

  return <Chart data={data} options={options} />;
};

export default FinancialChart;