import { API_URL } from "@/constants/env";

export const loginApi = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/auth/login-app`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};

export const validateTokenApi = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token }),
  });

  if (!res.ok) {
    throw new Error("Token inválido");
  }

  return res.json();
};

export const fetchPerfilApi = async (token: string) => {
  const res = await fetch(`${API_URL}/perfil/usuario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener el perfil");
  }

  return res.json();
};

export const fetchEconomiaApi = async (token: string, userId: string) => {
  const res = await fetch(`${API_URL}/economia/usuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error("Error al obtener la economia");
  }

  return res.json();
};
