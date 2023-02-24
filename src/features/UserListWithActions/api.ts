import { User } from "app/types";

export const getUsers = (): Promise<{ data: User[] }> =>
  fetch(`https://reqres.in/api/users`).then((res) => res.json());

export const deleteUser = (id: number): Promise<void> =>
  fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
  }).then(() => {});
