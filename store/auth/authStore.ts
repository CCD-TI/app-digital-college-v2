import { create } from "zustand";
import { AuthState, LoginResponse, ValidateResponse } from "./types";
import {
  loginApi,
  validateTokenApi,
  fetchPerfilApi,
  fetchEconomiaApi,
} from "./authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EconomiaUsuario, PerfilUsuario } from "./perfil_types";

type AuthStore = AuthState & {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  validateToken: (token: string) => Promise<void>;
  fetchPerfilUsuario: () => Promise<void>;
  fetchEconomiaUsuario: () => Promise<void>;
  setEconomia: (economia: {
    coinsBalance: number;
    diamondsBalance: number;
  }) => void;
  logout: () => void;
};

const tipoProductoMapping: { [key: number]: string } = {
  1: "marco",
  2: "tarjeta",
  3: "banner",
  4: "wallpaper",
  5: "avatar",
  6: "video",
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  id: null,
  token: "",
  nombres: null,
  apellidos: null,
  rol_id: null,
  status: "idle",
  error: null,
  perfil: null,
  economia: null,

  login: async (credentials) => {
    set({ status: "loading", error: null });
    try {
      const response = await loginApi(credentials);
      set({
        status: "authenticated",
        token: response.token,
        nombres: response.nombres,
        apellidos: response.apellidos,
        id: response.id.toString(),
      });
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          id: response.id,
          token: response.token,
          nombres: response.nombres,
          apellidos: response.apellidos,
        })
      );
    } catch (err: any) {
      set({ status: "error", error: err?.error || "Error de autenticación" });
      throw err;
    }
  },

  validateToken: async (token) => {
    try {
      const response = await validateTokenApi(token);
      set({
        status: "authenticated",
        token: token,
        rol_id: response.rol_id,
        nombres: response.nombres,
        id: response.id,
      });
    } catch {
      set({
        status: "idle",
        token: "",
        nombres: null,
        apellidos: null,
        rol_id: null,
      });
    }
  },

  fetchPerfilUsuario: async () => {
    const { token } = get();
    if (!token) {
      return;
    }
    try {
      const perfilData = await fetchPerfilApi(token);
      const productos_usados_transformed =
        perfilData.perfil.productos_usados.reduce(
          (
            acc: { [key: string]: string },
            item: { tipo: number; url: string }
          ) => {
            const key = tipoProductoMapping[item.tipo];
            if (key) {
              acc[key] = item.url;
            }
            return acc;
          },
          {}
        );

      set({
        perfil: {
          ...perfilData,
          perfil: {
            ...perfilData.perfil,
            productos_usados: productos_usados_transformed,
          },
        },
      });
    } catch (err: any) {
      console.error("Error fetching perfil:", err);
    }
  },

  fetchEconomiaUsuario: async () => {
    const { token, id } = get();
    if (!token || !id) {
      return;
    }
    try {
      const economia = await fetchEconomiaApi(token, id);
      set({ economia });
    } catch (err: any) {
      console.error("Error fetching economia:", err);
    }
  },

  setEconomia: (economia) => {
    set({
      economia: {
        coins_balance: economia.coinsBalance,
        diamonds_balance: economia.diamondsBalance,
      },
    });
  },

  logout: () => {
    set({
      id: null,
      token: "",
      nombres: null,
      apellidos: null,
      rol_id: null,
      status: "idle",
      error: null,
      perfil: null,
      economia: null,
    });
    AsyncStorage.removeItem("user");
  },
}));

