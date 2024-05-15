import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

const ProtectedRoute = ({ children, roleId }) => {
    const { user } = useAuth()

    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }

    if (roleId === 3 | roleId === user.roleId) {
        return <>{children}</>
    } else {
        return <Navigate to="*" />;
    }
};

export default ProtectedRoute