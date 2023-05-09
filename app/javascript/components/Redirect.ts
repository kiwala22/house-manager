import { useNavigate } from "react-router-dom";

export const Redirect = (path: string) => {
  const navigate = useNavigate();
  navigate(`${path}`);
}