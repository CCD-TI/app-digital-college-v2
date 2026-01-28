import { API_URL } from "@/constants/env";
import { ProductoPaginated } from "@/store/auth/tienda_types";
import { useEffect, useState } from "react";

export const useProductos = (
  page: number = 1,
  limit: number = 10,
  tipoId: number | null = null
) => {
  const [productoPaginated, setProductoPaginated] =
    useState<ProductoPaginated | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    setLoading(true);
    let url = `${API_URL}/productos/paginated?page=${page}&limit=${limit}`;
    if (tipoId !== null) {
      url += `&tipoId=${tipoId}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data: ProductoPaginated = await response.json();
      setProductoPaginated(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [page, limit, tipoId]);

  return { productoPaginated, isLoading: loading, refetch: fetchProductos };
};
