export const getPosts = () => {
  return fetch("http://localhost:3000/api/posts/", { method: "GET" }).then((response) => {
    return response.json();
  });
};
