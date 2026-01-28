import { useState } from 'react';
import { API_URL } from "@/constants/env";

export interface Pregunta {
  id: number;
  tipo: string;
  enunciado: string;
  imagen: string | null;
  opciones: string[] | null;
  pares: { izquierda: string; derecha: string }[] | null;
}

export interface EvaluacionPregunta {
  evaluacionId: number;
  preguntaId: number;
  puntaje: number;
  orden: number;
  pregunta: Pregunta;
}

interface Evaluacion {
  id: string;
  titulo: string;
  descripcion: string;
  puntajeTotal: number;
  duracionMinutos: number;
  estado: string;
  intentos: number;
  fechaInicio: string;
  fechaCierre: string;
  requierePago: boolean;
  precio: number | null;
  grado: string;
  evaluacionPreguntas: EvaluacionPregunta[];
}

export const useObtenerPreguntasEvaluacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Evaluacion | null>(null);

  const obtenerPreguntas = async (evaluacionId: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/evaluaciones/estudiante/${evaluacionId}/preguntas`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const json: Evaluacion = await response.json();
      setData(json);
      return json;
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { obtenerPreguntas, loading, error, data };
};
