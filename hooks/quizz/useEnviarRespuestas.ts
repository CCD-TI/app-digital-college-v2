import { useState } from 'react';
import { API_URL } from "@/constants/env";

export interface Respuesta {
  preguntaId: number;
  respuesta: string[] ; // puede contener ["SIN RESPUESTA"] o ["valor seleccionado"]
}

export interface EnviarRespuestasPayload {
  usuarioEvaluacionId: string;
  respuestas: Respuesta[];
}

export const useEnviarRespuestas = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const enviarRespuestas = async (payload: EnviarRespuestasPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(API_URL+'/usuario-evaluaciones/responder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al enviar respuestas');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { enviarRespuestas, loading, error, success };
};
