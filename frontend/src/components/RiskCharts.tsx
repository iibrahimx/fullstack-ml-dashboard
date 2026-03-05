import type { PredictionResponse } from "../types/prediction";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Legend,
  CartesianGrid,
} from "recharts";

type Props = {
  history: PredictionResponse[];
};

export function RiskCharts({ history }: Props) {
  // If we don't have at least 2 results, don't render charts
  if (history.length < 2) return null;

  // Make simple chart points from history
  const chartData = history.map((item, index) => {
    const risk = Number(item.probability.class_1); // class_1 = default risk
    return {
      attempt: index + 1,
      risk,
    };
  });

  // Latest prediction for pie chart
  const last = history[history.length - 1];
  const pieData = [
    { name: "No default (class 0)", value: Number(last.probability.class_0) },
    { name: "Default (class 1)", value: Number(last.probability.class_1) },
  ];

  function toPercent(value: number) {
    return `${(value * 100).toFixed(1)}%`;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-10">
      <h2 className="text-xl font-semibold text-gray-800">Risk Charts</h2>

      {/* Line chart */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Line chart: default risk (class 1) across submissions
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-130">
            <LineChart width={520} height={260} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="attempt"
                label={{
                  value: "Attempt",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                domain={[0, 1]}
                tickFormatter={toPercent}
                label={{
                  value: "Default risk",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12 },
                }}
              />
              <Tooltip formatter={(value) => toPercent(Number(value))} />
              <Legend />
              <Line
                type="monotone"
                dataKey="risk"
                name="Default risk"
                stroke="#111827"
                strokeWidth={2}
                dot
                isAnimationActive={false}
              />
            </LineChart>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Bar chart: default risk (class 1) for each submission
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-130">
            <BarChart width={520} height={260} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="attempt"
                label={{
                  value: "Attempt",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                domain={[0, 1]}
                tickFormatter={toPercent}
                label={{
                  value: "Default risk",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12 },
                }}
              />
              <Tooltip formatter={(value) => toPercent(Number(value))} />
              <Legend />
              <Bar
                dataKey="risk"
                name="Default risk"
                fill="#111827"
                isAnimationActive={false}
              />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Pie chart */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Pie chart: probability split for the latest prediction
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-130 flex justify-center">
            <PieChart width={520} height={260}>
              <Tooltip formatter={(value) => toPercent(Number(value))} />
              <Legend />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={(entry) => `${entry.name}: ${toPercent(entry.value)}`}
                isAnimationActive={false}
                fill="#111827"
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
