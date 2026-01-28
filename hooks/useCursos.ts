import { API_URL } from "@/constants/env";
import { useAuthStore } from "@/store/auth/authStore";
import { VersionCursoUsuarioResponse } from "@/store/auth/cursos_types";
import { useEffect, useState } from "react";



export function useCursos() {
  const { token } = useAuthStore();
  const [cursos, setCursos] = useState<VersionCursoUsuarioResponse[]>([]);
  const [completados, setCompletados] = useState<
    VersionCursoUsuarioResponse[]
  >([]);
  const [enProgreso, setEnProgreso] = useState<VersionCursoUsuarioResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const fetchCursos = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/versioncurso-usuarios/getByUserId`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los cursos");
      }
      const data: VersionCursoUsuarioResponse[] = await response.json();
      setCursos(data);
      setCompletados(data.filter((curso) => curso.progress === 100));
      setEnProgreso(data.filter((curso) => curso.progress < 100));
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, [token]);

  return {
    cursos,
    completados,
    enProgreso,
    loading,
    refetch: fetchCursos,
  };
}
