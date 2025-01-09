import { createAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AuthRequest } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AuthRequest;
    const { credential, provider } = body;

    const existed = await prisma.user.findUnique({
      where: {
        wallet: credential,
      },
    });

    // Create new user if not existed
    if (!existed) {
      await prisma.user.create({
        data: {
          wallet: credential,
          lineId: "",
          displayName: "",
          provider,
        },
      });
    }
    const accessToken = createAccessToken({
      provider,
      userId: credential,
    });

    const latestSeason = await prisma.season.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    const point = await prisma.point.findFirst({
      where: {
        userId: existed?.id,
        seasonId: latestSeason?.id,
      },
    });

    return NextResponse.json(
      {
        accessToken,
        user: {
          point: point?.point ?? 0,
          wallet: existed?.wallet,
          provider: existed?.provider,
          season: latestSeason?.name,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    const errorMessage = err.message || "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
