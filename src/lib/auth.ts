import { createHmac, timingSafeEqual } from "crypto"

export const SESSION_COOKIE_NAME = "dxs-session"
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

type SessionPayload = {
  expiresAt: number
}

function getRequiredEnv(name: "ADMIN_USERNAME" | "ADMIN_PASSWORD" | "SESSION_SECRET") {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not configured`)
  }
  if (name === "SESSION_SECRET" && value.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters")
  }
  return value
}

function sign(value: string) {
  return createHmac("sha256", getRequiredEnv("SESSION_SECRET"))
    .update(value)
    .digest("base64url")
}

function safeEqual(left: string, right: string) {
  const leftDigest = createHmac("sha256", getRequiredEnv("SESSION_SECRET"))
    .update(left)
    .digest()
  const rightDigest = createHmac("sha256", getRequiredEnv("SESSION_SECRET"))
    .update(right)
    .digest()

  return timingSafeEqual(leftDigest, rightDigest)
}

export function hasValidAdminCredentials(username: string, password: string) {
  return (
    safeEqual(username, getRequiredEnv("ADMIN_USERNAME")) &&
    safeEqual(password, getRequiredEnv("ADMIN_PASSWORD"))
  )
}

export function createSessionToken() {
  const payload: SessionPayload = {
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")

  return `${encodedPayload}.${sign(encodedPayload)}`
}

export function isValidSessionToken(token: string | undefined) {
  if (!token) return false

  const [encodedPayload, signature, extra] = token.split(".")
  if (!encodedPayload || !signature || extra) return false

  const expectedSignature = sign(encodedPayload)
  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return false
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload

    return Number.isFinite(payload.expiresAt) && payload.expiresAt > Date.now()
  } catch {
    return false
  }
}
