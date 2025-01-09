import { createAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("1")
  console.log("request", request);
  try {
    console.log("response", request);
    const body = await request.json();

    const accessToken = body.accessToken;

    console.log("accessToken", accessToken);

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = response.data;

    console.log("userInfo", userInfo);

    const existingUser = await prisma.user.findUnique({
      where: { lineId: userInfo.userId },
    });

    console.log("Current user", existingUser);

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          lineId: userInfo.userId,
          displayName: userInfo.displayName,
          avatar: userInfo.pictureUrl ?? "",
          provider: "line",
          wallet: "",
        },
      });

      console.log("new user ", newUser);

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
