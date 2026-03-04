import type { PredictionInput, PredictionResponse } from "../types/prediction";

const API_URL = "http://127.0.0.1:8000/api/predict/";

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
