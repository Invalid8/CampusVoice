import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "firebase/auth";
import Cookies from "js-cookie";
import { getCurrentUser, signInWithGoogle, logout } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthContextType {
  user: (User & { role: string }) | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  showLogin: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<(User & { role: string }) | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getCurrentUser().then((currentUser) => {
        setUser(currentUser);
      });
    }
    setLoading(false);
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

  const showLogin = () => {
    setOpen(true);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, showLogin, loading }}>
      {children}
      {!loading && !user && (
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(!open);
          }}
        >
          <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-sm text-center">
            <DialogTitle className="text-center text-2xl font-bold">
              Sign In with Google
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg font-bold">
              Sign in to your account using your Google credentials.
            </DialogDescription>

            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={signIn}
            >
              <img src="/google.svg" width={24} />
              Sign In with Google
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
