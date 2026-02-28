/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AuthUser } from "../actions/type";

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  isSuperAdmin: boolean;
};


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
        } else {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch {
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userData: AuthUser, authToken: string) => {
    setUser(null);
    setToken(null);

    // 🔥 Clear the correct keys
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.clear();

    console.log("i have remove the token", authToken )

    setUser(userData);
    setToken(authToken);

    localStorage.setItem("authToken", authToken);
    localStorage.setItem("authUser", JSON.stringify(userData));

    if (userData.userType === "admin") {
      router.push("/dashboard");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    router.push("/sign-in");
  };

  // const hasPermission = (permission: string) => {
  //   if (!user?.permissions) return false;
  //   return user.permissions.includes(permission);
  // };

  const hasPermission = (permission: string) => {
    const permissions = user?.permissions;
    if (!permissions) return false;
    return permissions.includes(permission);
  };


  // const isSuperAdmin = user?.role?.roleType === "super_admin";

  const isSuperAdmin =
  user?.role?.roleType === "super_admin";


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        hasPermission,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
