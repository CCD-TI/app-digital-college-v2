import { EconomiaUsuario, PerfilUsuario } from "./perfil_types";

export interface LoginResponse {
  mensaje: string;
  token: string;
  nombres: string;
  apellidos: string;
  id: number;
}

export interface ValidateResponse {
  id: string;
  rol_id: number;
  nombres: string;
}

export interface AuthState {
  id: string | null;
  token: string;
  nombres: string | null;
  apellidos: string | null;
  rol_id: number | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
  perfil: PerfilUsuario | null;
  economia: EconomiaUsuario | null;
}