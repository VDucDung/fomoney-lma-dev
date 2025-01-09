import { prisma } from "@/lib/prisma";
import { UpdatePointRequest } from "@/types/season";
import { NextRequest, NextResponse } from "next/server";
import { validateAuthorizationHeader } from "@/lib/auth";

/**
 * Update user points for a specific season
 */
export async function POST(request: NextRequest) {
  try {
    const { decoded } = validateAuthorizationHeader(request);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Validate request body
    const body: UpdatePointRequest = await request.json();
    const { point, season } = body;

    if (!point || !season) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (point < 0) {
      return NextResponse.json({ error: `Invalid point.` }, { status: 400 });
    }

    const seasonExisted = await prisma.season.findUnique({
      where: { name: season },
    });



    if (!seasonExisted) {
      return NextResponse.json(
        { message: "Season not found" },
        { status: 404 },
      );
    }

    // Logic update point for user
    const user = await prisma.user.findUnique({
      where: { wallet: decoded.userId },
    });


    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.point.upsert({
      where: {
        userId_seasonId: {
          userId: user.id,
          seasonId: seasonExisted.id,
        },
      },
      create: {
        point,
        userId: user.id,
        seasonId: seasonExisted.id,
      },
      update: {
        point: {
          increment: point,
        },
      },
      include: {
        season: true,
        User: true,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
