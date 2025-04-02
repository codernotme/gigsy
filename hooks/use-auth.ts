import { useState } from "react";

// Dummy user type
interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulated login - would be replaced with actual API call
      console.log(`Logging in with ${email}`);
      const dummyUser = {
        id: '1',
        email,
        name: 'Demo User'
      };
      setUser(dummyUser);
      setIsAuthenticated(true);
      return dummyUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}
