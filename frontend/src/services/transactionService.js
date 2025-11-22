// src/services/transactionService.js
import { getToken, getUserId } from "./authService";

const API_URL = "http://localhost:8082/transactions";

function authHeader() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  };
}

// pega automaticamente o userId do token
function getCurrentUserId() {
  return getUserId();
}

export async function getBalance() {
  const userId = getCurrentUserId();
  const response = await fetch(`${API_URL}/balance/${userId}`, {
    method: "GET",
    headers: authHeader()
  });

  return await response.json();
}

export async function getTransactions() {
  const userId = getCurrentUserId();
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "GET",
    headers: authHeader()
  });

  return await response.json();
}

export async function deposit(amount) {
  const userId = getCurrentUserId();
  const response = await fetch(`${API_URL}/deposit`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ userId, amount })
  });

  return await response.text();
}

export async function transfer(toUserId, amount, description) {
  const fromUserId = getCurrentUserId();
  const response = await fetch(`${API_URL}/transfer`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ fromUserId, toUserId, amount, description })
  });

  return await response.text();
}
