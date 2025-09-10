import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  username: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, role?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuthStatus = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');

      if (isAuthenticated === 'true' && username) {
        setUser({ username, role: role || undefined });
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (username: string, role?: string) => {
    const userData: User = { username, role };
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", username);
    if (role) {
      localStorage.setItem("role", role);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
