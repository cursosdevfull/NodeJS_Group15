import { Pagination } from "../interface/pagination";

export interface BaseRepository<T> {
  list(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  save(el: T): Promise<T>;
  getByPage(page: number, limit: number): Promise<Pagination<T>>;
}
