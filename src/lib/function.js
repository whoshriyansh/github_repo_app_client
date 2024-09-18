import { API_URL } from "../config";

export const handleLoginWithGithub = () => {
  window.open(`${API_URL}/api/auth/github`, "_self");
};
