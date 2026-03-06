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
  Cell,
} from "recharts";

type Props = {
  history: PredictionResponse[];
};

function toPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function RiskCharts({ history }: Props) {
  if (history.length < 2) return null;

  const chartData = history.map((item, index) => {
    const risk = Number(item.probability.class_1);
    return {
      attempt: index + 1,
      risk,
    };
  });

  const last = history[history.length - 1];
  const pieData = [
    { name: "No default (class 0)", value: Number(last.probability.class_0) },
    { name: "Default (class 1)", value: Number(last.probability.class_1) },
  ];

  const pieColors = ["#10B981", "#F59E0B"];

  return (
    <div className="rounded-2xl bg-slate-900 text-white shadow-2xl p-6 space-y-10">
      <h2 className="text-2xl font-semibold">Risk Charts</h2>
      <p className="text-sm text-slate-300">
        Visual view of prediction history and latest probability split.
      </p>

      {/* Line chart */}
      <div className="space-y-2">
        <p className="text-sm text-slate-300">
          Line chart: default risk (class 1) across submissions
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-130">
            <LineChart
              width={520}
              height={260}
              data={chartData}
              margin={{ top: 10, right: 20, left: 50, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="attempt"
                stroke="#CBD5E1"
                tick={{ fill: "#CBD5E1", fontSize: 12 }}
                label={{
                  value: "Attempt",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#CBD5E1",
                }}
              />
              <YAxis
                domain={[0, 1]}
                stroke="#CBD5E1"
                tick={{ fill: "#CBD5E1", fontSize: 12 }}
                tickFormatter={toPercent}
                label={{
                  value: "Default risk",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12, fill: "#CBD5E1" },
                }}
              />
              <Tooltip
                formatter={(value) => toPercent(Number(value))}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#E2E8F0" }} />
              <Line
                type="monotone"
                dataKey="risk"
                name="Default risk"
                stroke="#60A5FA"
                strokeWidth={3}
                dot={{ r: 4, fill: "#60A5FA" }}
                isAnimationActive={false}
              />
            </LineChart>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-2">
        <p className="text-sm text-slate-300">
          Bar chart: default risk (class 1) for each submission
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-130">
            <BarChart
              width={520}
              height={260}
              data={chartData}
              margin={{ top: 10, right: 20, left: 50, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="attempt"
                stroke="#CBD5E1"
                tick={{ fill: "#CBD5E1", fontSize: 12 }}
                label={{
                  value: "Attempt",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#CBD5E1",
                }}
              />
              <YAxis
                domain={[0, 1]}
                stroke="#CBD5E1"
                tick={{ fill: "#CBD5E1", fontSize: 12 }}
                tickFormatter={toPercent}
                label={{
                  value: "Default risk",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12, fill: "#CBD5E1" },
                }}
              />
              <Tooltip
                formatter={(value) => toPercent(Number(value))}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#E2E8F0" }} />
              <Bar
                dataKey="risk"
                name="Default risk"
                fill="#34D399"
                radius={[6, 6, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Pie chart */}
      <div className="space-y-2">
        <p className="text-sm text-slate-300">
          Pie chart: probability split for the latest prediction
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-130 flex justify-center">
            <PieChart width={520} height={260}>
              <Tooltip
                formatter={(value) => toPercent(Number(value))}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#E2E8F0" }} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={(entry) => `${entry.name}: ${toPercent(entry.value)}`}
                isAnimationActive={false}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
