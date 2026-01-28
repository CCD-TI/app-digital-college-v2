import { API_URL } from "@/constants/env";
import { useAuthStore } from "@/store/auth/authStore";
import { useEffect, useState } from "react";
import { VersionCurso, Bimestre } from "@/store/auth/cursos_types";

export const useCursoModulos = (id: string | undefined) => {
  const { id: studentId } = useAuthStore();
  const [cursoData, setCursoData] = useState<VersionCurso | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCursoContenido = async (
    version_curso_id: string,
    usuario_id: string
  ) => {
    if (!version_curso_id || !usuario_id) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/version-curso/contenido`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version_curso_id,
          usuario_id,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al obtener el contenido del curso");
      }
      const data: VersionCurso = await response.json();
      setCursoData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && studentId) {
      fetchCursoContenido(id, studentId);
    }
  }, [id, studentId]);

  return {
    cursoData,
    isLoading: loading,
    refetch: () => {
      if (id && studentId) {
        fetchCursoContenido(id, studentId);
      }
    },
  };
};