"use client";

import { useCallback, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Playlist from "./Playlist";
import ColorFilterPicker from "./ColorFilterPicker";
import type { VideoItem } from "@/types/video";
import type { FilterId } from "@/lib/filters";
import styles from "./PlayerApp.module.css";

interface PlayerAppProps {
  initialVideos: VideoItem[];
}

export default function PlayerApp({ initialVideos }: PlayerAppProps) {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<FilterId>("none");
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const currentVideo = videos[currentIndex];

  const selectVideo = useCallback((index: number) => {
    setCurrentIndex(index);
    setAutoPlay(true);
  }, []);

  const playNext = useCallback(() => {
    setCurrentIndex((i) => (videos.length ? (i + 1) % videos.length : 0));
    setAutoPlay(true);
  }, [videos.length]);

  async function refresh() {
    try {
      const res = await fetch("/api/videos", { cache: "no-store" });
      const data: { videos: VideoItem[] } = await res.json();
      setVideos(data.videos ?? []);
      setCurrentIndex(0);
      setAutoPlay(false);
    } catch (err) {
      console.error("Não foi possível atualizar a lista de vídeos.", err);
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span className={styles.brand}>VISOR</span>
        <span className={styles.tagline}>sala de projeção pessoal</span>
      </header>

      <main className={styles.main}>
        <section className={styles.playerColumn}>
          {currentVideo ? (
            <VideoPlayer
              video={currentVideo}
              filter={filter}
              autoPlay={autoPlay}
              onEnded={playNext}
              onPlayingChange={setIsPlaying}
            />
          ) : (
            <div className={styles.emptyStage}>
              Nenhum vídeo carregado. Adicione arquivos em{" "}
              <code>public/videos</code> e clique em &quot;Atualizar&quot;.
            </div>
          )}

          <ColorFilterPicker value={filter} onChange={setFilter} />
        </section>

        <Playlist
          videos={videos}
          currentId={currentVideo?.id}
          isPlaying={isPlaying}
          onSelect={selectVideo}
          onRefresh={refresh}
        />
      </main>
    </div>
  );
}
