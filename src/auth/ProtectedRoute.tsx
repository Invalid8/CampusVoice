import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { showLogin, user } = useAuth();

  useEffect(() => {
    if (!user) showLogin();
  });

  if (!user) <div></div>;

  return (
    <>
      {user ? (
        children
      ) : (
        <div>
          <h1></h1>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
