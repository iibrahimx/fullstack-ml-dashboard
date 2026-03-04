export interface PredictionInput {
  monthly_income: number;
  monthly_expense: number;
  age: number;
  has_smartphone: number;
  has_wallet: number;
  avg_wallet_balance: number;
  on_time_payment_ratio: number;
  num_loans_taken: number;
}

export interface PredictionResponse {
  prediction: number;
  probability: {
    class_0: number;
    class_1: number;
  };
  inputs: PredictionInput;
}
