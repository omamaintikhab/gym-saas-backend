import { UserType } from "src/user/entities/user.entities";

export interface LoginResponse {
    access_token: string;
    user_email: string;
    user_role: UserType;
  }