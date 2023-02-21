// @ts-nocheck
export const put = user =>
  fetch('https://reqres.in/api/users/1?delay=3', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(res => res.json());
