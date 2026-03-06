import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmployeeProductivityGraph({ data = [] }) {
    const chartData = {
        labels: data.map(d => d.employeeType),
        datasets: [
            {
                label: "Employee Distribution",
                data: data.map(d => d.numberOfEmployees),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF"
                ]
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
                text: "Employee Workforce Distribution",
                color: "#F2B680"
            }
        }
    };

    return (
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(68, 67, 67, 0.05)' }}>
            <Pie data={chartData} options={options} />
        </Card>
    );
}