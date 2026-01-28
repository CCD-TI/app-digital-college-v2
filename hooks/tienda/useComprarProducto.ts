import { useState, useCallback } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import { API_URL } from "@/constants/env";

export const useComprarProducto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { token, id, setEconomia } = useAuthStore();

  const comprarProducto = async (productoId: string) => {
    if (!token || !id) {
      setError("Usuario no autenticado");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(`${API_URL}/usuario-productos/comprar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productoId, usuarioId: id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al realizar la compra");
      }

      if (data.economiaActualizada) {
        setEconomia(data.economiaActualizada);
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  }, []);

  return { comprarProducto, isLoading, error, isSuccess, reset };
};

