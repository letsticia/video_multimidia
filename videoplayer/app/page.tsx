import { getVideos } from "@/lib/getVideos";
import PlayerApp from "@/components/PlayerApp";

// Força renderização dinâmica para sempre refletir o conteúdo atual de public/videos
export const dynamic = "force-dynamic";

export default function Home() {
  const videos = getVideos();
  return <PlayerApp initialVideos={videos} />;
}
