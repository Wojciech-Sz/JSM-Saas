export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  MY_JOURNEY: "/my-journey",
  SUBSCRIPTION: "/subscription",
  COMPANIONS: "/companions",
  NEW_COMPANION: "/companions/new",
  COMPANION_SESSION: (id: string) => `/companions/${id}`,
};
