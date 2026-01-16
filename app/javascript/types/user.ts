export interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AuthErrors {
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
  base?: string;
}
