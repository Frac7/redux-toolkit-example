export interface Paginated<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export type User = {
  id: number;
  score?: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
};
