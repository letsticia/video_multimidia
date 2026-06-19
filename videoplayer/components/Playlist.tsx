"use client";

import styles from "./Playlist.module.css";
import type { VideoItem } from "@/types/video";

interface PlaylistProps {
  videos: VideoItem[];
  currentId: string | undefined;
  isPlaying: boolean;
  onSelect: (index: number) => void;
  onRefresh: () => void;
}

export default function Playlist({
  videos,
  currentId,
  isPlaying,
  onSelect,
  onRefresh,
}: PlaylistProps) {
  return (
    <aside className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Playlist</h2>
        <button type="button" className={styles.refreshBtn} onClick={onRefresh}>
          Atualizar
        </button>
      </div>

      {videos.length === 0 ? (
        <p className={styles.empty}>
          Nenhum vídeo encontrado. Adicione arquivos <code>.mp4</code>,{" "}
          <code>.webm</code> ou <code>.ogg</code> na pasta{" "}
          <code>public/videos</code> e clique em &quot;Atualizar&quot;.
        </p>
      ) : (
        <ol className={styles.list}>
          {videos.map((video, index) => {
            const active = video.id === currentId;
            return (
              <li key={video.id}>
                <button
                  type="button"
                  className={`${styles.item} ${active ? styles.active : ""}`}
                  onClick={() => onSelect(index)}
                  aria-current={active}
                >
                  <span className={styles.index}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.itemTitle}>{video.title}</span>
                  {active && (
                    <span
                      className={`${styles.status} ${isPlaying ? styles.playing : ""}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </aside>
  );
}
