import { useState } from 'react';
import { API_URL } from "@/constants/env";
import { useObtenerPreguntasEvaluacion } from './useObtenerPreguntasEvaluacion';

interface IniciarExamenRequest {
  usuarioId: string |null;
  evaluacionId: number | null;
}

interface IniciarExamenResponse {
  id: string;
  usuarioId: string;
  evaluacionId: number;
  intento: number;
  fechaInicio: string;
  estadoUsuario: string;
  estadoEvaluacion: string;
}

export const useIniciarExamen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IniciarExamenResponse | null>(null);

  const { obtenerPreguntas } = useObtenerPreguntasEvaluacion(); 

  const iniciarExamen = async ({ usuarioId, evaluacionId }: IniciarExamenRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL+'/usuario-evaluaciones/iniciar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuarioId, evaluacionId }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const responseData: IniciarExamenResponse = await response.json();
      setData(responseData);

      return { examen: responseData };
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { iniciarExamen, loading, error, data };
};
