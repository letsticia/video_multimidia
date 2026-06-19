import fs from "fs";
import path from "path";
import { formatTitle } from "./formatTitle";
import type { VideoItem } from "@/types/video";

// Extensões de vídeo aceitas. Adicione novas extensões aqui se precisar.
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".mkv"];

/**
 * Lê a pasta /public/videos no servidor e retorna a lista de vídeos
 * já formatada para uso na interface. Só pode ser chamada em código
 * que executa no servidor (Server Components ou Route Handlers).
 */
export function getVideos(): VideoItem[] {
  const videosDir = path.join(process.cwd(), "public", "videos");

  if (!fs.existsSync(videosDir)) {
    return [];
  }

  const files = fs.readdirSync(videosDir);

  return files
    .filter((file) => VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }))
    .map((file) => ({
      id: file,
      title: formatTitle(file),
      src: `/videos/${encodeURIComponent(file)}`,
    }));
}
