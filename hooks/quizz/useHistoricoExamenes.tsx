import { useEffect, useState } from "react";
import { API_URL } from "@/constants/env";

export interface IntentoExamen {
  id: string;
  intento: number;
  calificacion: number;
  fechaInicio: string;
  fechaFinalizacion: string;
  estadoUsuario: "finalizado" | "en_progreso" | string;
  estadoEvaluacion: string;
}

export function useHistoricoExamenes(
  usuarioId: string | null,
  evaluacionId: string | null
) {
  const [finalizados, setFinalizados] = useState<IntentoExamen[]>([]);
  const [enProgreso, setEnProgreso] = useState<IntentoExamen[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioId || !evaluacionId) return;

    setLoading(true);
    setError(null);

    fetch(
      `${API_URL}/usuario-evaluaciones/${usuarioId}/evaluacion/${evaluacionId}/intentos`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los intentos");
        return res.json();
      })
      .then((data: IntentoExamen[]) => {
        setFinalizados(data.filter((i) => i.estadoUsuario === "finalizado"));
        setEnProgreso(data.filter((i) => i.estadoUsuario === "en_progreso"));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [usuarioId, evaluacionId]);

  return { finalizados, enProgreso, loading, error };
}
