const restrictedPaths = ["/lists"];

const authMiddleware = async (context, next) => {
  // Get user from cookies
  const user = await context.cookies.get("user");

  if (user) {
    context.user = JSON.parse(user); 
  }


  if (
    !user && restrictedPaths.some((path) =>
      context.request.url.pathname.startsWith(path)
    )
  ) {
    context.response.redirect("/auth/login");
  } else {
    await next();
  }
};

export { authMiddleware };
