// src/services/authService.js
// import {jwt_decode} from "jwt-decode";

const API_URL = "http://localhost:8080/auth";

export async function register(user) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar");
  }

  return await response.json();
}

export async function login(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  const data = await response.json();
  console.log("Dados recebidos do servidor:", data);

  // salva o token
  localStorage.setItem("token", data.token);

  // decodifica o token e pega o userId
  // const decoded = jwt_decode(data.token);
  // console.log("Token decodificado:", decoded);
  
  const userId = data.userId;
  localStorage.setItem("userId", userId);

  return { token: data.token, userId };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserId() {
  return localStorage.getItem("userId");
}
