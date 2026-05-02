import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";
import { useLearnerAuth } from "../context/LearnerAuthContext";

const LearnerPrivateRoute = ({ children }) => {
  const { loading, isAuthenticated } = useLearnerAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen fullScreen label="Loading your dashboard..." variant="dashboard" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default LearnerPrivateRoute;

