export interface Pagination<T> {
  total: number;
  page: number;
  data: T[];
}
