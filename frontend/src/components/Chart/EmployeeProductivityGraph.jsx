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
            title: {
                display: true,
                text: "Employee Workforce Distribution"
            }
        }
    };

    return (
        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Pie data={chartData} options={options} />
        </Card>
    );
}
