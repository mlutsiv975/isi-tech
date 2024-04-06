import {UserType} from "../../enum/user/user-type";

export interface User {
  id?: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  repeat_password: string;
  user_type: UserType;
}
