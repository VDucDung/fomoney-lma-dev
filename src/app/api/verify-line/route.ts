import { createAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface LineProfileResponse {
  userId: string;
  displayName: string;
  pictureUrl: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const accessToken = body.accessToken;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response: AxiosResponse<LineProfileResponse> = await axios.get(
      "https://api.line.me/v2/profile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userInfo: LineProfileResponse = response.data;

    const existingUser = await prisma.user.findUnique({
      where: { lineId: userInfo.userId },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          lineId: userInfo.userId,
          displayName: userInfo.displayName,
          avatar: userInfo.pictureUrl ?? "",
          provider: "line",
          wallet: userInfo.userId,
        },
      });

      return NextResponse.json({
        accessToken: createAccessToken({
          userId: newUser.id,
          provider: "line",
        }),
        user: newUser,
        lineUser: userInfo,
      });
    }

    return NextResponse.json(
      {
        accessToken: createAccessToken({
          userId: userInfo.userId,
          provider: "line",
        }),
        user: existingUser,
        lineUser: userInfo,
      },
      { status: 200 },
    );
  } catch (e: unknown) {
    console.error("Error:", e);
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
