"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";
import type { VideoItem } from "@/types/video";
import { FILTERS, type FilterId } from "@/lib/filters";

interface VideoPlayerProps {
  video: VideoItem;
  filter: FilterId;
  autoPlay?: boolean;
  onEnded?: () => void;
  onPlayingChange?: (isPlaying: boolean) => void;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function VideoPlayer({
  video,
  filter,
  autoPlay = false,
  onEnded,
  onPlayingChange,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  // Autoplay quando o usuário escolhe um novo vídeo na playlist
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        /* o navegador pode bloquear autoplay com som; o usuário pode clicar em play */
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video.id, autoPlay]);

  function setPlaying(value: boolean) {
    setIsPlaying(value);
    onPlayingChange?.(value);
  }

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const el = videoRef.current;
    if (!el) return;
    const time = Number(e.target.value);
    el.currentTime = time;
    setCurrentTime(time);
  }

  function skip(deltaSeconds: number) {
    const el = videoRef.current;
    if (!el) return;
    const max = duration || el.duration || 0;
    el.currentTime = Math.min(Math.max(0, el.currentTime + deltaSeconds), max);
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const el = videoRef.current;
    const value = Number(e.target.value);
    setVolume(value);
    const shouldMute = value === 0;
    setMuted(shouldMute);
    if (el) {
      el.volume = value;
      el.muted = shouldMute;
    }
  }

  function toggleMute() {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  const activeFilter = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];

  return (
    <div className={styles.playerCard}>
      <div className={styles.stage}>
        <video
          key={video.id}
          ref={videoRef}
          src={video.src}
          className={styles.video}
          style={{ filter: activeFilter.cssFilter }}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={onEnded}
          onClick={togglePlay}
        />

        {activeFilter.overlayColor && (
          <div
            className={styles.toneOverlay}
            style={{ backgroundColor: activeFilter.overlayColor }}
          />
        )}

        <div className={styles.titleBadge}>{video.title}</div>
      </div>

      <div className={styles.controls}>
        <div className={styles.progressRow}>
          <span className={styles.timecode}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            className={styles.seekBar}
            aria-label="Posição do vídeo"
          />
          <span className={styles.timecode}>{formatTime(duration)}</span>
        </div>

        <div className={styles.mainRow}>
          <div className={styles.transport}>
            <button
              type="button"
              onClick={() => skip(-10)}
              className={styles.iconBtn}
              aria-label="Retroceder 10 segundos"
            >
              ⏮ 10s
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className={styles.playBtn}
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>

            <button
              type="button"
              onClick={() => skip(10)}
              className={styles.iconBtn}
              aria-label="Avançar 10 segundos"
            >
              10s ⏭
            </button>
          </div>

          <div className={styles.volumeGroup}>
            <button
              type="button"
              onClick={toggleMute}
              className={styles.iconBtn}
              aria-label={muted ? "Reativar som" : "Silenciar"}
            >
              {muted || volume === 0 ? "🔇" : "🔊"}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={handleVolume}
              className={styles.volumeBar}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
