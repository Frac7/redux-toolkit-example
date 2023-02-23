import { User } from "app/types";

export const getUser = (id: number): Promise<{ data: User }> =>
  fetch(`https://reqres.in/api/users/${id}?delay=1`).then((res) => res.json());
