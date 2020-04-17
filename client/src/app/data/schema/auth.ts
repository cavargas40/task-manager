import { User } from './user';

export interface Login {
  user: User;
  token: string;
}

export interface LoginResponse {
  login: Login;
}
