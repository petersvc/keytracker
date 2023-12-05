import { User } from './user';
import { Password } from './password';

export interface UserData {
  user: User;
  passwords: Password[];
}
