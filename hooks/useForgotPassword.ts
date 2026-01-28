import { useState } from "react";
import { API_URL } from "@/constants/env";

interface ForgotPasswordResponse {
  token: string;
  mensaje: string;
}

interface ValidateTokenResponse {
  nombre: string;
  correo: string;
  token: string;
}

interface ResetPasswordResponse {
  message: string;
}

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const requestPasswordReset = async (correo: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      });

      const data: ForgotPasswordResponse = await response.json();

      if (response.ok) {
        setSuccessMessage(data.mensaje);
        return data;
      } else {
        setError(data.message || "Error desconocido");
        return null;
      }
    } catch (err) {
      setError("Error al hacer la solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data: ValidateTokenResponse = await response.json();

      if (response.ok) {
        return data;
      } else {
        setError(data.message || "Error desconocido");
        return null;
      }
    } catch (err) {
      setError("Error al hacer la solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newpassword: newPassword }),
      });

      const data: ResetPasswordResponse = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        return data;
      } else {
        setError(data.message || "Error desconocido");
        return null;
      }
    } catch (err) {
      setError("Error al hacer la solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    successMessage,
    requestPasswordReset,
    validateToken,
    resetPassword,
  };
};
