import { json, sessionCookieHeader } from "./_session.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }
  return json(
    200,
    { ok: true },
    { "Set-Cookie": sessionCookieHeader("", { clear: true }) },
  );
}
