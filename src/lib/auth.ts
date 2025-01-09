import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export interface AuthTokenPayload {
  userId: string;
  provider: string;
}

const secret = process.env.AUTH_SECRET!;

export function createAccessToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verifyAccessToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, secret) as AuthTokenPayload;
  if (!decoded.userId) {
    throw new Error("Invalid token payload");
  }
  return decoded;
}

export function validateAuthorizationHeader(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return {
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  try {
    const decoded = verifyAccessToken(token);
    return { decoded };
  } catch {
    return {
      error: NextResponse.json({ message: "Invalid token" }, { status: 401 }),
    };
  }
}
