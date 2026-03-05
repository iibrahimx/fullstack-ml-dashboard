import { useState } from "react";
import type { PredictionResponse } from "../types/prediction";
import { PredictionForm } from "../components/PredictionForm";
import { PredictionResult } from "../components/PredictionResult";
import { RiskCharts } from "../components/RiskCharts";

export function DashboardPage() {
  const [result, setResult] = useState<PredictionResponse | null>(null);

  // Store all predictions
  const [history, setHistory] = useState<PredictionResponse[]>([]);

  function handleNewResult(newResult: PredictionResponse) {
    setResult(newResult);

    // Add newest result to the end of history
    setHistory((prev) => [...prev, newResult]);
  }

  function clearHistory() {
    setResult(null);
    setHistory([]);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">
            ML Loan Risk Dashboard
          </h1>
          <p className="text-gray-700">
            Enter values to get a default risk prediction from the trained
            model.
          </p>
        </header>

        <div className="flex items-center gap-3">
          <button
            onClick={clearHistory}
            className="rounded-lg border px-3 py-2 text-sm bg-white"
          >
            Clear history
          </button>

          <p className="text-sm text-gray-600">
            Predictions saved:{" "}
            <span className="font-semibold">{history.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictionForm onResult={handleNewResult} />

          {result ? (
            <PredictionResult result={result} />
          ) : (
            <div className="bg-white rounded-2xl shadow p-6 text-gray-700 flex items-center justify-center">
              Submit the form to see prediction results here.
            </div>
          )}
        </div>

        {/* charts only show after at least 2 predictions */}
        {history.length >= 2 && <RiskCharts history={history} />}
      </div>
    </div>
  );
}
