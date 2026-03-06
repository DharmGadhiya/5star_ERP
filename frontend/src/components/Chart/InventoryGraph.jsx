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

export default function InventoryGraph({ data = [] }) {
    const chartData = {
        labels: data.map(d => d.material),
        datasets: [
            {
                label: "Stock Quantity",
                data: data.map(d => d.quantity),
                backgroundColor: "#3F51B5"
            }
        ]
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Inventory & Spare Parts Stock (Available Material Quantity)"
            }
        }
    };

    return (
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Bar data={chartData} options={options} />
        </Card>
    );
}
