import {
  COOKIE_NAME,
  getAuthConfig,
  json,
  parseCookies,
  verifySessionToken,
} from "./_session.mjs";

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const { secret } = getAuthConfig();
  if (!secret) {
    return json(503, { ok: false, authenticated: false, error: "Auth not configured." });
  }

  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie || "");
  const session = verifySessionToken(cookies[COOKIE_NAME], secret);
  if (!session) {
    return json(401, { ok: false, authenticated: false });
  }

  return json(200, { ok: true, authenticated: true, email: session.email });
}
