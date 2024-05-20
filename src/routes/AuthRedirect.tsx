import { FC, ReactNode } from "react"
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

interface AuthRedirectProps {
    children: ReactNode;
}
const AuthRedirect: FC<AuthRedirectProps> = ({ children }) => {
    const { token } = useAuth();

    if(token) {
        return <Navigate to='/dashboard' />;
    }

    return children;
}

export default AuthRedirect;