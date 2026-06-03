import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = true;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
