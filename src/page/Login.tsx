import React from "react";
import { useAuth } from "@/context/AuthContext";

const Login: React.FC = () => {
    const { signIn } = useAuth();

    const handleLogin = async () => {
        await signIn();
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Sign In with Google</button>
        </div>
    );
};

export default Login;
