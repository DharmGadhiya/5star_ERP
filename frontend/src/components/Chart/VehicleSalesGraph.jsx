import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function VehicleSalesGraph({ data = [] }) {
    const chartData = {
        labels: data.map(d => d._id),
        datasets: [
            {
                label: "Vehicle Sales",
                data: data.map(d => d.totalQuantity),
                backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FFC107",
                    "#FF5722",
                    "#9C27B0",
                    "#3F51B5"
                ]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Vehicle Sales Analysis (By Product Volume)" }
        }
    };

    return (
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Bar data={chartData} options={options} />
        </Card>
    );
}
