import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idleTimer, setIdleTimer] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
  }, [idleTimer]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }

    if (user) {
      const timer = setTimeout(() => {
        logout();
        window.location.href = "/";
      }, IDLE_TIMEOUT);
      setIdleTimer(timer);
    }
  }, [user, logout, idleTimer]);

  const login = useCallback(
    (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      resetIdleTimer();
    },
    [resetIdleTimer]
  );

  // Activity listeners
  useEffect(() => {
    if (!user) return;

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      document.addEventListener(event, resetIdleTimer);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [user, resetIdleTimer]);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (storedUser && token) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      resetIdleTimer();
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
    };
  }, [idleTimer]);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
