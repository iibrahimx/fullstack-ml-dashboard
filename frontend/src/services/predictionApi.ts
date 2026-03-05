import type { PredictionInput, PredictionResponse } from "../types/prediction";

// Read API base URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

// Build the final endpoint
const API_URL = `${API_BASE_URL}/api/predict/`;

export async function predictLoanRisk(
  data: PredictionInput,
): Promise<PredictionResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Prediction request failed");
  }

  return response.json();
}
