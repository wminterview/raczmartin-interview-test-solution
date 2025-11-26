/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const logout = () => {
    setAccessToken(null);
    // Optionally call your API to clear refresh token server-side
    fetch("/api/logout", { method: "POST", credentials: "include" });
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
