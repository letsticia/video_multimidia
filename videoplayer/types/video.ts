export interface VideoItem {
  /** Nome original do arquivo, usado como identificador único */
  id: string;
  /** Título formatado para exibição na playlist */
  title: string;
  /** Caminho público para o arquivo (servido a partir de /public/videos) */
  src: string;
}
