import {
  COOKIE_NAME,
  createSessionToken,
  getAuthConfig,
  json,
  parseCookies,
  safeEqualString,
  sessionCookieHeader,
  verifySessionToken,
} from "./_session.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const { email: expectedEmail, password: expectedPassword, secret } = getAuthConfig();
  if (!expectedEmail || !expectedPassword || !secret) {
    return json(503, {
      ok: false,
      error: "Studio auth is not configured. Set STUDIO_EMAIL, STUDIO_PASSWORD, and AUTH_SECRET in Netlify.",
    });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, error: "Invalid JSON body." });
  }

  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return json(400, { ok: false, error: "Email and password are required." });
  }

  const emailOk = safeEqualString(email, expectedEmail);
  const passOk = safeEqualString(password, expectedPassword);
  if (!emailOk || !passOk) {
    return json(401, { ok: false, error: "Incorrect email or password." });
  }

  const token = createSessionToken(email, secret);
  return json(
    200,
    { ok: true, email },
    { "Set-Cookie": sessionCookieHeader(token) },
  );
}
