import { NextResponse } from "next/server";
import { getVideos } from "@/lib/getVideos";

// Garante que a lista nunca fique em cache: sempre relê a pasta public/videos
export const dynamic = "force-dynamic";

export async function GET() {
  const videos = getVideos();
  return NextResponse.json({ videos });
}
