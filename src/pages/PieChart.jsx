import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieChart({ positive, neutral, negative }) {

    const data = {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
            {
                data: [positive, neutral, negative],
                backgroundColor: [
                    "#22c55e",
                    "#facc15",
                    "#ef4444"
                ],
                borderWidth: 2
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (
        <div className="card shadow-lg p-4 mt-4">
            <h4 className="text-center mb-3">
                📊 Feedback Analytics
            </h4>

            <Pie
                data={data}
                options={options}
            />
        </div>
    );
}

export default PieChart;