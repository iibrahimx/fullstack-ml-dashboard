import { useState } from "react";
import type { PredictionInput, PredictionResponse } from "../types/prediction";
import { predictLoanRisk } from "../services/predictionApi";

type PredictionFormProps = {
  onResult: (result: PredictionResponse) => void;
};

const initialForm: PredictionInput = {
  monthly_income: 0,
  monthly_expense: 0,
  age: 0,
  has_smartphone: 1,
  has_wallet: 1,
  avg_wallet_balance: 0,
  on_time_payment_ratio: 0.8,
  num_loans_taken: 0,
};

export function PredictionForm({ onResult }: PredictionFormProps) {
  const [form, setForm] = useState<PredictionInput>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof PredictionInput>(
    key: K,
    value: PredictionInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await predictLoanRisk(form);
      onResult(result);
    } catch (err) {
      setError("Could not get prediction. Check backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Enter details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Monthly income $</span>
          <input
            type="number"
            value={form.monthly_income}
            onChange={(e) =>
              updateField("monthly_income", Number(e.target.value))
            }
            className="w-full rounded-lg border p-2"
            min={0}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-gray-600">Monthly expense $</span>
          <input
            type="number"
            value={form.monthly_expense}
            onChange={(e) =>
              updateField("monthly_expense", Number(e.target.value))
            }
            className="w-full rounded-lg border p-2"
            min={0}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-gray-600">Age</span>
          <input
            type="number"
            value={form.age}
            onChange={(e) => updateField("age", Number(e.target.value))}
            className="w-full rounded-lg border p-2"
            min={0}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-gray-600">Average wallet balance</span>
          <input
            type="number"
            value={form.avg_wallet_balance}
            onChange={(e) =>
              updateField("avg_wallet_balance", Number(e.target.value))
            }
            className="w-full rounded-lg border p-2"
            min={0}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-gray-600">
            On-time payment ratio (0-1)
          </span>
          <input
            type="number"
            step="0.01"
            value={form.on_time_payment_ratio}
            onChange={(e) =>
              updateField("on_time_payment_ratio", Number(e.target.value))
            }
            className="w-full rounded-lg border p-2"
            min={0}
            max={1}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-gray-600">Number of loans taken</span>
          <input
            type="number"
            value={form.num_loans_taken}
            onChange={(e) =>
              updateField("num_loans_taken", Number(e.target.value))
            }
            className="w-full rounded-lg border p-2"
            min={0}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-gray-600">Has smartphone</span>
          <select
            value={form.has_smartphone}
            onChange={(e) =>
              updateField("has_smartphone", Number(e.target.value))
            }
            className="w-full rounded-lg border p-2"
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-sm text-gray-600">Has wallet</span>
          <select
            value={form.has_wallet}
            onChange={(e) => updateField("has_wallet", Number(e.target.value))}
            className="w-full rounded-lg border p-2"
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-gray-900 text-white py-2 font-medium disabled:opacity-60"
      >
        {loading ? "Predicting..." : "Predict risk"}
      </button>
    </form>
  );
}
