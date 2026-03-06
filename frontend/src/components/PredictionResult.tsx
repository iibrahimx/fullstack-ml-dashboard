import type { PredictionResponse } from "../types/prediction";

type Props = {
  result: PredictionResponse;
};

export function PredictionResult({ result }: Props) {
  const p0 = result.probability.class_0;
  const p1 = result.probability.class_1;

  const label =
    result.prediction === 1 ? "Higher default risk" : "Lower default risk";

  return (
    <div className="bg-slate-100 rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Result</h2>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">Prediction</span>
        <span
          className={`font-semibold ${
            result.prediction === 1 ? "text-amber-600" : "text-emerald-600"
          }`}
        >
          {label}
        </span>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-600">Probability</div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm">
              <span>Class 0 (No default)</span>
              <span>{(p0 * 100).toFixed(2)}%</span>
            </div>
            <div className="h-3 rounded bg-gray-100 overflow-hidden">
              <div
                className="h-3 bg-amber-700"
                style={{ width: `${p0 * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span>Class 1 (Default)</span>
              <span>{(p1 * 100).toFixed(2)}%</span>
            </div>
            <div className="h-3 rounded bg-gray-100 overflow-hidden">
              <div
                className="h-3 bg-amber-700"
                style={{ width: `${p1 * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <details className="text-sm text-gray-700">
        <summary className="cursor-pointer select-none">Inputs used</summary>
        <pre className="mt-2 bg-gray-50 p-3 rounded-lg overflow-auto">
          {JSON.stringify(result.inputs, null, 2)}
        </pre>
      </details>
    </div>
  );
}
