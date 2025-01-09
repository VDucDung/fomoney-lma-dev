import { prisma } from "@/lib/prisma";
import { AuthProvider } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const provider =
    (searchParams.get("provider") as AuthProvider) ?? AuthProvider.sonicx;

  const currentSeason = await prisma.season.findFirst({
    orderBy: {
      endtime: "desc",
    },
  });
  const result = await prisma.point.findMany({
    where: {
      User: {
        provider: provider,
      },
      season: {
        name: currentSeason?.name,
      },
    },
    orderBy: {
      point: "desc",
    },
    take: 50,
    select: {
      point: true,
      User: {
        select: {
          id: true,
          wallet: true,
        },
      },
    },
  });

  return NextResponse.json(
    { rankings: result, season: currentSeason },
    { status: 200 },
  );
}
