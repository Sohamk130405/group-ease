import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth"]);
const isRoot = createRouteMatcher(["/"]);
const isProtectedRoute = createRouteMatcher([
  "/conversations(.*)",
  "/assignments(.*)",
  "/groups(.*)",
]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();

  // Redirect to /conversations if visiting / and authenticated
  if (isRoot(request)) {
    return nextjsMiddlewareRedirect(request, "/conversations");
  }

  // Redirect to /conversations if already authenticated and visiting /auth
  if (isSignInPage(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/conversations");
  }

  // If visiting a protected route and not authenticated
  if (isProtectedRoute(request) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
