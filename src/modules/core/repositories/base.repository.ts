export interface BaseRepository<Entity, T> {
  list(): Promise<T>;
  get(id: string): Promise<T | null>;
  save(el: Entity): Promise<T>;
  getByPage(page: number, limit: number): Promise<T>;
}
