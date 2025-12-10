const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

type AuthTokens = {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
};

function getStoredTokens(): AuthTokens {
  if (typeof window === "undefined") return {};
  return {
    accessToken: localStorage.getItem("accessToken") || undefined,
    idToken: localStorage.getItem("idToken") || undefined,
    refreshToken: localStorage.getItem("refreshToken") || undefined,
  };
}

function persistTokens(tokens: AuthTokens) {
  if (typeof window === "undefined") return;
  if (tokens.accessToken) localStorage.setItem("accessToken", tokens.accessToken);
  if (tokens.idToken) localStorage.setItem("idToken", tokens.idToken);
  if (tokens.refreshToken) localStorage.setItem("refreshToken", tokens.refreshToken);
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const tokens = getStoredTokens();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const bearer = tokens.accessToken || tokens.idToken;
  if (bearer) headers.Authorization = `Bearer ${bearer}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  return res;
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciais invalidas");
  }

  const data = await res.json();
  const authResult = data.AuthenticationResult || {};
  persistTokens({
    accessToken: authResult.AccessToken,
    idToken: authResult.IdToken,
    refreshToken: authResult.RefreshToken,
  });

  return data;
}

export async function registerUser(payload: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao registrar usuario");
  return res.json();
}

// Users CRUD (sem dependencias)
export async function listUsers() {
  const res = await apiFetch("/api/users");
  if (!res.ok) throw new Error("Falha ao carregar usuarios");
  return res.json();
}

export async function createUser(payload: { name: string; email: string; password: string }) {
  const res = await apiFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar usuario");
  return res.json();
}

export async function getUser(id: number | string) {
  const res = await apiFetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Falha ao carregar usuario");
  return res.json();
}

export async function updateUser(id: number | string, payload: { name: string; email: string; password?: string }) {
  const res = await apiFetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao atualizar usuario");
  return res.json();
}

// Person
export async function listPersons(page = 0, size = 20) {
  const res = await apiFetch(`/person?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Falha ao listar pessoas");
  return res.json();
}

export async function createPerson(payload: { name: string }) {
  const res = await apiFetch("/person", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar pessoa");
  return res.json();
}

// Property (associada a personId)
export async function listProperties(personId: string, page = 0, size = 20) {
  const res = await apiFetch(`/property?personId=${personId}&page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Falha ao listar propriedades");
  return res.json();
}

export async function createProperty(personId: string, payload: { name: string }) {
  const res = await apiFetch(`/property/${personId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar propriedade");
  return res.json();
}

// Silo (associado a propertyId)
export async function listSilos(propertyId: string, page = 0, size = 20) {
  const res = await apiFetch(`/silo?propertyId=${propertyId}&page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Falha ao listar silos");
  return res.json();
}

export async function createSilo(propertyId: string, payload: { physicalId: number }) {
  const res = await apiFetch(`/silo/${propertyId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar silo");
  return res.json();
}

// Device (associado a siloId)
export async function listDevices(siloId?: string, page = 0, size = 20) {
  const query = new URLSearchParams({ page: String(page), size: String(size) });
  if (siloId) query.append("siloId", siloId);
  const res = await apiFetch(`/device?${query.toString()}`);
  if (!res.ok) throw new Error("Falha ao listar dispositivos");
  return res.json();
}

export async function createDevice(siloId: string, payload: { mac: string; ip: string }) {
  const res = await apiFetch(`/device/${siloId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar dispositivo");
  return res.json();
}

// Sensor (associado a deviceId)
export async function listSensors(deviceId: string, page = 0, size = 20) {
  const res = await apiFetch(`/sensor?deviceId=${deviceId}&page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Falha ao listar sensores");
  return res.json();
}

export async function createSensor(deviceId: string, payload: { physicalID: string; sensorType: string }) {
  const res = await apiFetch(`/sensor/${deviceId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar sensor");
  return res.json();
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
}
