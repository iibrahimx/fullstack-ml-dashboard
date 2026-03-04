import { useState } from "react";
import type { PredictionResponse } from "../types/prediction";
import { PredictionForm } from "../components/PredictionForm";
import { PredictionResult } from "../components/PredictionResult";

export function DashboardPage() {
  const [result, setResult] = useState<PredictionResponse | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictionForm onResult={setResult} />
          {result ? (
            <PredictionResult result={result} />
          ) : (
            <div className="bg-white rounded-2xl shadow p-6 text-gray-700 flex items-center justify-center">
              Submit the form to see prediction results here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
