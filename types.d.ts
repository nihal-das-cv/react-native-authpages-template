// ---------------- FORM TYPES ----------------
export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;

// ---------------- API RESPONSE TYPES ----------------
export interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  token?: string;
  message?: string;
}
