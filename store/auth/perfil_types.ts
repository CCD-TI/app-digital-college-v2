export interface PerfilUsuario {
  usuarioId: string;
  perfil: {
    datos_usuario: {
      nombres: string;
      apellido_paterno: string;
    };
    datos_academicos: {
      nivel: {
        nombre: string;
      };
    };
    productos_usados: {
      [key: string]: string;
    };
  };
}

export interface EconomiaUsuario {
  progresion_id: number;
  nivel_id: number;
  nivel_progresion: string;
  rango_bimestral_id: number;
  nombre_rango_bimestral: string;
  imagen_rango_bimestral: string;
  color_rango_bimestral: string;
  total_xp: number;
  coins_balance: number;
  diamonds_balance: number;
  achievements: number;
  tournament_points: number;
  season_xp: number;
  streak_days: number;
}
