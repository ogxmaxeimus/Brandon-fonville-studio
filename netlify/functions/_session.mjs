/**
 * Shared HMAC session helpers for Netlify Functions (Node).
 * Cookie: bfcs_session = base64url(payload).base64url(sig)
 * payload = email|expMs
 */

import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "bfcs_session";
export const SESSION_DAYS = 14;

export function getAuthConfig() {
  const email = (process.env.STUDIO_EMAIL || "").trim().toLowerCase();
  const password = process.env.STUDIO_PASSWORD || "";
  const secret = process.env.AUTH_SECRET || "";
  return { email, password, secret };
}

export function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function fromB64url(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(b64, "base64");
}

export function signPayload(payload, secret) {
  return b64url(createHmac("sha256", secret).update(payload).digest());
}

export function createSessionToken(email, secret, days = SESSION_DAYS) {
  const exp = Date.now() + days * 24 * 60 * 60 * 1000;
  const payload = `${email.toLowerCase()}|${exp}`;
  return `${b64url(payload)}.${signPayload(payload, secret)}`;
}

export function verifySessionToken(token, secret) {
  if (!token || !secret) return null;
  const parts = String(token).split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  let payload;
  try {
    payload = fromB64url(payloadB64).toString("utf8");
  } catch {
    return null;
  }
  const expected = signPayload(payload, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [email, expStr] = payload.split("|");
  const exp = Number(expStr);
  if (!email || !Number.isFinite(exp) || Date.now() > exp) return null;
  return { email, exp };
}

export function safeEqualString(a, b) {
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (aa.length !== bb.length) {
    timingSafeEqual(aa, aa);
    return false;
  }
  return timingSafeEqual(aa, bb);
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    out[k] = decodeURIComponent(v);
  }
  return out;
}

export function sessionCookieHeader(token, { clear = false } = {}) {
  if (clear) {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
  }
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}
