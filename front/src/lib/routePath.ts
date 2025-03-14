const routePath = {
  "/login": "/login",
  "/register": "/register",
  "/forgot-password": "/forgot-password",
  "/news": "/news",
  "/favorite-news": "/favorite-news",
  "/account": "/account",
  "/users": "/users",
  "/news/[:id]": (id: number) => `/news/${id}`,
  "/favorite-news/[:id]": (id: number) => `/favorite-news/${id}`,
};

export default routePath;
