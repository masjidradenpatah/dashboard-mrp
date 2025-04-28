/**
 * An array of routes that are accessible just when development
 * @type {string[]}
 */
export const devRoutes: string[] = ["/test"];

/**
 * If a routes have this prefix than it should be accessible just when development
 * e.g /article/articleId
 * @type {string[]}
 */
export const devRoutesPrefix: string[] = [];

export function checkDevelopmentRoute(route: string): boolean {
  const check1 = devRoutes.includes(route);

  // i want to check if the prefix is match or not, eventough only one is true
  const check2 = devRoutesPrefix.some((routePrefix) => {
    return route.startsWith(routePrefix);
  });

  return check1 || check2;
}

/**
 * An array of routes that are accessible for authenticate or non-authenticate user
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/auth-error",
  "/unauthorized",
  "/not-found",
];

/**
 * If a routes have this prefix than it should be accessible by public
 * e.g /article/articleId
 * @type {string[]}
 */
export const publicRoutesPrefix: string[] = [
];

export function checkPublicRoute(route: string): boolean {
  const check1 = publicRoutes.includes(route);

  // i want to check if the prefix is match or not, eventough only one is true
  const check2 = publicRoutesPrefix.some((routePrefix) => {
    return route.startsWith(routePrefix);
  });

  return check1 || check2;
}

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in user to /
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/signIn",
  "/signUp",
  "/auth-error",
  "/new-password",
];

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * These routes shouldn't be blocked for everyone
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The Default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
