import { ApplicationRequest, ApplicationResponse, AuthUser, DashboardSummary, LoginRequest, RegisterRequest } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (payload: LoginRequest) =>
    request<AuthUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  register: (payload: RegisterRequest) =>
    request<AuthUser>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getSummary: () => request<DashboardSummary>('/dashboard/summary'),
  getApplications: () => request<ApplicationResponse[]>('/applications'),
  createApplication: (payload: ApplicationRequest) =>
    request<ApplicationResponse>('/applications', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};
