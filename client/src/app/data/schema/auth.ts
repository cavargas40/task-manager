import { User } from './user';

export interface LoginSignUp {
  user: User;
  token: string;
}

export interface LoginSignUpResponse {
  login: LoginSignUp;
  signup: LoginSignUp;
}
