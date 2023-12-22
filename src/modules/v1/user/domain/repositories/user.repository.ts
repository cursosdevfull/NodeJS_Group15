import { BaseRepository } from "../../../../core/repositories/base.repository";
import { UserResult } from "../../infrastructure/user.infrastructure";
import { User } from "../roots/user";

export interface UserRepository extends BaseRepository<User, UserResult> {}
