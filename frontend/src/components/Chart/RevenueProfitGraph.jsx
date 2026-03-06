import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "antd";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function RevenueProfitGraph({ data = [] }) {
    const chartData = {
        labels: data.map(d => d.month),
        datasets: [
            {
                label: "Revenue",
                data: data.map(d => d.revenue),
                borderColor: "#4CAF50",
                backgroundColor: "#4CAF50"
            },
            {
                label: "Profit",
                data: data.map(d => d.profit),
                borderColor: "#FF9800",
                backgroundColor: "#FF9800"
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: "#e0e0e0" }
            },
            title: {
                display: true,
                text: "Revenue vs Profit Analysis (Monthly Trend)",
                color: "#F2B680"
            }
        },
        scales: {
            x: {
                ticks: { color: "#e0e0e0" },
                grid: { color: "#333333" }
            },
            y: {
                ticks: { color: "#e0e0e0" },
                grid: { color: "#333333" }
            }
        }
    };

    return (
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Line data={chartData} options={options} />
        </Card>
    );
}