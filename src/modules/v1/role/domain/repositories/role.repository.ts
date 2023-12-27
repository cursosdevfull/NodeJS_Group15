import { RoleResult } from "../../infrastructure/role.infrastructure";

export interface RoleRepository {
  list(): Promise<RoleResult>;
}
