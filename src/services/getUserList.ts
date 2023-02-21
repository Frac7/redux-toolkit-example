export const getUserList = () =>
  fetch("https://reqres.in/api/users?delay=3").then((res) => res.json());
