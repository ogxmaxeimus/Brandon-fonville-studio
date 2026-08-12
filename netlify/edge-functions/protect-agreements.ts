/**
 * Gate /agreements/* behind the bfcs_session cookie.
 * Unauthenticated requests redirect to /ownership (HTML) or 401 (files/API-ish).
 */

const COOKIE_NAME = "bfcs_session";

function b64urlToBytes(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function bytesToB64url(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function hmacSign(payload, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToB64url(new Uint8Array(sig));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function verifyToken(token, secret) {
  if (!token || !secret) return null;
  const parts = String(token).split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  let payload;
  try {
    payload = new TextDecoder().decode(b64urlToBytes(payloadB64));
  } catch {
    return null;
  }
  const expected = await hmacSign(payload, secret);
  if (!timingSafeEqual(sig, expected)) return null;
  const [email, expStr] = payload.split("|");
  const exp = Number(expStr);
  if (!email || !Number.isFinite(exp) || Date.now() > exp) return null;
  return { email, exp };
}

function getCookie(req, name) {
  const raw = req.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    if (k !== name) continue;
    return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return "";
}

export default async (request, context) => {
  const secret = Deno.env.get("AUTH_SECRET") || "";
  const token = getCookie(request, COOKIE_NAME);
  const session = await verifyToken(token, secret);

  if (session) {
    return context.next();
  }

  const accept = request.headers.get("accept") || "";
  const wantsHtml = accept.includes("text/html");
  if (wantsHtml) {
    return Response.redirect(new URL("/ownership", request.url), 302);
  }

  return new Response(JSON.stringify({ ok: false, error: "Authentication required." }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
};
