import {
  deleteTokens,
  deleteUserData,
  getAccessToken,
  getUserData,
  saveTokens,
  saveUserData,
} from "@/lib/secureStore";
import { LoginService } from "@/services/auth/login";
import { LoginResponse } from "@/types/auth";
import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restaurer la session au démarrage
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await getAccessToken();
        const storedUser = await getUserData<LoginResponse["user"]>();

        if (token && storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Erreur lors de la restauration de la session:", err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const signIn = useCallback(async (phone: string, password: string) => {
    setLoading(true);
    setError(null);

    console.log(" signIn appelé avec:", { phone, password: "***" });

    try {
      const response = await LoginService({ phone, password });
      console.log(" Réponse API:", response);
      // Sauvegarder le token et les données utilisateur dans le storage
      await saveTokens(response.token);
      await saveUserData(response.user);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.log(" Erreur signIn complète:", err);
      console.log(" Status HTTP:", err?.response?.status);
      console.log(" Données erreur:", err?.response?.data);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erreur lors de la connexion";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      // Supprimer les tokens et données utilisateur du storage
      await deleteTokens();
      await deleteUserData();

      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (_phone: string, _password: string) => {
    // TODO: Implémenter l'inscription
  }, []);

  const resetPassword = useCallback(async (_phone: string) => {
    // TODO: Implémenter la réinitialisation du mot de passe
  }, []);

  const changePassword = useCallback(
    async (_phone: string, _password: string) => {
      // TODO: Implémenter le changement de mot de passe
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        resetPassword,
        changePassword,
        isAuthenticated,
        user,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
