import { Role } from "../role";

export interface RoleRepository {
  list(): Promise<Role[]>;
}
