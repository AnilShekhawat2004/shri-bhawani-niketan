import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables, ChartDataLabels);

function DataChart({ teacher }) {
  const baseColor = "#6366f1"; // Indigo-500
  const hoverColor = "#4f46e5"; // Indigo-600

  const chartData = {
    labels: teacher.map((teach) => teach.name),
    datasets: [
      {
        label: "Total Faculty",
        data: teacher.map((teach) => Object.keys(teach.Section).length),
        backgroundColor: baseColor,
        borderRadius: 10,
        hoverBackgroundColor: hoverColor,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        anchor: "end",
        align: "start",
        formatter: (value) => value,
        font: { weight: "bold", size: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
        border: { display: true, color: "#000" },
      },
      y: {
        ticks: {
          color: "#000",
          stepSize: 1,
          precision: 0,
        },
        grid: { display: false },
        border: { display: true, color: "#000" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center mt-12 w-full md:w-[85%]  bg-gradient-to-br from-white via-violet-50 to-violet-100 rounded-3xl shadow-xl border border-violet-200 backdrop-blur-sm p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
      {/* Decorative glow effects */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-300 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-40"></div>

      {/* Header */}
      <div className="z-10 mb-10 text-center">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-bhawaniDark to-blue-700 font-m1 font-extrabold text-3xl md:text-4xl mb-2 tracking-wide">
          Faculty by Department
        </h2>
        <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-bhawaniDark to-blue-600"></div>
      </div>

      {/* Chart Box */}
      <div className="z-10 relative bg-white/80 backdrop-blur-md rounded-2xl shadow-inner border border-gray-200 w-full h-[400px] p-6 hover:shadow-lg transition-all duration-500">
        <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
}

export default DataChart;

