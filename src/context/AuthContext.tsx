import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import Cookies from "js-cookie";
import { getCurrentUser, signInWithGoogle, logout } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            getCurrentUser().then((currentUser) => {
                setUser(currentUser);
            });
        }
    }, []);

    const signIn = async () => {
        await signInWithGoogle();
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };

    const signOut = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
