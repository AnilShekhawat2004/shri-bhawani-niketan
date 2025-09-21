import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables, ChartDataLabels);

function DataChart({ teacher }) {
  // Classic single color scheme (blue)
  const baseColor = "#2563eb"; // blue-600
  const hoverColor = "#1d4ed8"; // blue-700

  const chartData = {
    labels: teacher.map((teach) => teach.name),
    datasets: [
      {
        label: "Total Faculty",
        data: teacher.map((teach) => Object.keys(teach.Section).length),
        backgroundColor: baseColor,
        borderRadius: 8,
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
        grid: { display: false, drawBorder: true, color: "#000" },
        border: { display: true, color: "#000" },
      },
      y: {
        ticks: {
          color: "#000",
          stepSize: 1,
          precision: 0,
        },
        grid: { display: false, drawBorder: true, color: "#000" },
        border: { display: true, color: "#000" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-10 bg-white border-gray-300 border-[1px] rounded-2xl shadow-2xl pt-16 pb-10 pl-14 pr-14 w-[80%] h-auto">
      <div className="mb-8 ml-4">
        <p className="text-bhawaniDark font-m1 font-extrabold text-[35px]">
          Faculty by Department
        </p>
      </div>
      <div className="h-[400px] w-full">
        <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
}

export default DataChart;
