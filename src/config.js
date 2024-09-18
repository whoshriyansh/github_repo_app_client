const isProduction = import.meta.env.MODE === "production";

export const API_URL = isProduction
  ? "http://3.109.2.38:4000"
  : "http://localhost:4000";
