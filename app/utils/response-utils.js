export const unauthorized = (reason) => ({
  success: false,
  code: 401,
  reason: reason || "AUTH.ERROR.NOT_LOGGED_IN",
});

export const badRequest = (reason) => ({
  success: false,
  code: 400,
  reason: reason || "BAD_REQUEST",
});

export const notFound = (reason) => ({
  success: false,
  code: 404,
  reason: reason || "NOT_FOUND",
});

export const forbidden = (reason) => ({
  success: false,
  code: 403,
  reason: reason || "FORBIDDEN",
});

export const serverError = (reason) => ({
  success: false,
  code: 500,
  reason: reason || "INTERNAL_SERVER_ERROR",
});

export const tooMany = (reason) => ({
  success: false,
  code: 429,
  reason: reason || "TOO_MANY_REQUESTS",
});

export const success = (data) => ({
  success: true,
  code: 200,
  data,
});
